import base64
import json
import logging
import time
import requests
from typing import Optional, Dict, Union, Any
from authlib.jose import jwt
import os
import pandas as pd


class ZoomClient:
    def __init__(self):
        self.api_key = os.getenv("ZOOM_API_KEY")
        self.api_secret = os.getenv("ZOOM_API_SECRET")
        self.account_id = os.getenv("ZOOM_ACCOUNT_ID")
        self.base_url = "https://api.zoom.us/v2"
        self.reports_url = f"{self.base_url}/report/meetings"
        self.access_token, self.token_expiration = self.fetch_access_token()

    def set_api_key(self, api_key: str):
        self.api_key = api_key

    def set_api_secret(self, api_secret: str):
        self.api_secret = api_secret

    def to_datetime(self, date_time):
        zoom_format = "%Y-%m-%dT%H:%M:%SZ"
        zoom_timezone = "UTC"
        reference_timezone = "Europe/Berlin"
        return (
            pd.to_datetime(date_time, format=zoom_format)
            .dt.tz_localize(zoom_timezone)
            .dt.tz_convert(reference_timezone)
        )

    def fetch_access_token(self):
        url = "https://zoom.us/oauth/token"
        auth_header = {
            "Authorization": f"Basic {base64.b64encode(f'{self.api_key}:{self.api_secret}'.encode()).decode()}"
        }
        body = {"grant_type": "account_credentials", "account_id": self.account_id}
        response = requests.post(url, headers=auth_header, data=body)

        if response.status_code == 200:
            response_data = json.loads(response.text)
            access_token = response_data.get("access_token")
            expires_in = response_data.get("expires_in")  # usually in seconds

            if not access_token or not expires_in:
                raise Exception("Invalid OAuth token response")

            self.token_expiration = time.time() + expires_in
            return access_token, expires_in
        else:
            raise Exception(f"Failed to fetch OAuth token: {response.text}")

    def validate_token(self):
        buffer_time = 10  # 10 seconds buffer
        if (
            not self.access_token
            or not self.token_expiration
            or time.time() > (self.token_expiration - buffer_time)
        ):
            self.access_token, self.token_expiration = self.fetch_access_token()

    def get_last_meeting_session(
        self, meeting_id: str, next_page_token: Optional[str] = None
    ) -> requests.Response:
        self.validate_token()
        url: str = f"{self.reports_url}/{meeting_id}/participants"
        query_params: Dict[str, Union[int, str]] = {"page_size": 3000}
        if next_page_token:
            query_params.update({"next_page_token": next_page_token})

        r: requests.Response = requests.get(
            url,
            headers={"Authorization": f"Bearer {self.access_token}"},
            params=query_params,
        )

        return r

    def zoom_get_meeting_report(self, meeting_id: str) -> requests.Response:
        self.validate_token()
        url: str = f"{self.reports_url}/{meeting_id}"
        r: requests.Response = requests.get(
            url, headers={"Authorization": f"Bearer {self.access_token}"}
        )
        return r

    def format_zoom_attendances(self, session_participants):
        attendances = pd.DataFrame(
            session_participants,
            columns=["name", "email", "join_time", "leave_time", "duration"],
        )
        attendances.rename(
            columns={"join_time": "joinDateTime", "leave_time": "leaveDateTime"},
            inplace=True,
        )
        attendances["duration"] = attendances.groupby(["name"]).transform("sum")[
            "duration"
        ]
        attendances["interruptionCount"] = attendances.groupby(["name"]).transform(
            "count"
        )["duration"]
        attendances = attendances.drop_duplicates("name")
        return attendances

    def get_meeting_id(self, meeting_url):
        """It removes the http part at the beginning and password or addon part in the end of the meeting_id"""
        if meeting_url[:4] == "http" or meeting_url.find("/j/") > 0:
            meeting_url = meeting_url.split("/j/")[1]
        if meeting_url.find("?") > 0:
            meeting_url = meeting_url[: meeting_url.index("?")]
        return meeting_url

    def get_session_attendance(self, meeting_url):
        logging.info(f"Getting online attendances from Zoom")
        meeting_id = self.get_meeting_id(meeting_url)
        # gets the particpations for the last occuring meeting under the given url
        zoom_session = self.get_last_meeting_session(meeting_id)
        if zoom_session.status_code != 200:
            return f"Error: Zoom API answered with {zoom_session} \n\nFull Text: {zoom_session.text}"
        logging.debug(f"Zoom API response: {zoom_session}")
        logging.debug(f"Zoom API response text: {zoom_session.text}")
        zoom_session = json.loads(zoom_session.text)
        if zoom_session.get("participants") is None:
            raise Exception(
                f"Report has no participants. Are you sure the meeting id is correct?\nReport:\n{zoom_session.text}"
            )
        zoom_attendances = self.format_zoom_attendances(zoom_session["participants"])
        return zoom_attendances
