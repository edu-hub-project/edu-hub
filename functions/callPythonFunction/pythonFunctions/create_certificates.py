from urllib.request import urlopen
import logging
import requests
from api_clients import EduHubClient, StorageClient
import requests
from io import BytesIO
from jinja2 import Environment, DictLoader
from xhtml2pdf import pisa 

class CertificateCreator:
    """
    The `CertificateCreator` class generates certificates for course enrollments by retrieving the necessary template images and html-texts, preparing the content for each certificate based on the enrollment data and then converting HTML templates into PDF certificates. These PDFs are then uploaded to Google Cloud Storage (GCS) and the URLs of the created certificates are updated in the course enrollment records. The class handles both attendance and achievement certificates.
    """
    def __init__(self, arguments):
        """
        Initializes the CertificateCreator with necessary arguments.

        Args:
            arguments (dict): A dictionary containing input data for certificate creation. 
                              It must have keys 'input', 'certificateType', 'userIds', and 'courseId'.

        This constructor sets up the initial state by initializing the storage and EduHub clients,
        validating the certificate type, and fetching enrollments for the given user IDs and course ID.                                            
        """
        self.storage_client = StorageClient()
        self.eduhub_client = EduHubClient()
        self.certificate_type = arguments["input"]["certificateType"]
        self.user_ids = arguments["input"]["userIds"]
        self.course_id = arguments["input"]["courseId"] 

        if self.certificate_type not in ["achievement", "attendance"]:
            logging.error("Certificate type is incorrect or missing!")
            raise ValueError("Invalid certificate type")

        self.enrollments = self.eduhub_client.fetch_enrollments(self.user_ids, self.course_id)
        logging.info(f"Fetched enrollments for certificate creation: {self.enrollments}")

    def create_certificates(self):
        """
        Creates certificates for all enrollments and updates the course enrollment records.
        
        Returns:
            int: Count of successfully generated certificates
            
        Raises:
            RuntimeError: If there's an error in the certificate creation process
        """
        template_image_url = self.fetch_template_image()
        template_text = self.fetch_template_text()
        successful_count = 0

        for i, enrollment in enumerate(self.enrollments, 1):
            try:
                pdf_url = self.generate_and_save_certificate_to_gcs(template_image_url, template_text, enrollment)
                self.eduhub_client.update_course_enrollment_record(enrollment["User"]["id"], enrollment["Course"]["id"], pdf_url, self.certificate_type)
                successful_count += 1
            except Exception as e:
                logging.error(f"Error in processing enrollment {i}: {e}")
        
        logging.info(f"{successful_count}/{len(self.enrollments)} {self.certificate_type} certificate(s) successfully generated.")
        
        if successful_count == 0:
            raise RuntimeError("Failed to generate any certificates")
        
        return successful_count

    def generate_and_save_certificate_to_gcs(self, template_image_url, template_text, enrollment):
        """
        Generates a certificate and saves it to Google Cloud Storage (GCS).

        Args:
            template_image_url (str): The URL of the template image.
            template_text (str): The HTML template text for the certificate.
            enrollment (dict): The enrollment data for the user.

        Returns:
            str: The file name of the generated PDF certificate
        
        Raises:
            RuntimeError: If PDF creation fails
            Exception: For other errors during the process
        """
        try:
            # Vorbereitung des Textinhalts
            image = self.storage_client.download_image_from_gcs(template_image_url)
            text_content = self.prepare_text_content(enrollment, image)

            # Erstellen der Jinja2-Umgebung und Rendern von HTML
            env = Environment(loader=DictLoader({'template': template_text}))
            template = env.get_template('template')
            rendered_html = template.render(text_content)

            # Konvertierung von HTML zu PDF mit XHTML2PDF
            pdf_bytes_io = BytesIO()
            pisa_status = pisa.CreatePDF(rendered_html, dest=pdf_bytes_io)

            if not pisa_status.err:
                pdf_bytes_io.seek(0)
                pdf_file_name = self.generate_pdf_file_name(enrollment)
                url = self.storage_client.upload_file(
                    path="", 
                    blob_name=pdf_file_name, 
                    buffer=pdf_bytes_io, 
                    content_type='application/pdf'
                )
                logging.info(f'PDF available at: {url}')
                return pdf_file_name
            else:
                error_msg = "Failed to create PDF with XHTML2PDF"
                logging.error(error_msg)
                raise RuntimeError(error_msg)
            
        except RuntimeError as e:
            logging.error(f"PDF creation failed: {str(e)}")
            raise
        except Exception as e:
            error_msg = f"Error in certificate generation process: {str(e)}"
            logging.error(error_msg)
            raise RuntimeError(error_msg)

    def fetch_template_image(self):
        """
        Fetches the template image URL based on the certificate type.

        Returns:
            str: The URL of the template image.

        Raises:
            ValueError: If certificate type is invalid
            KeyError: If template URL is missing in the enrollment data
            Exception: For other unexpected errors
        """
        try:
            if not self.enrollments:
                raise ValueError("No enrollments found")
            
            program = self.enrollments[0]['Course']['Program']
            
            if self.certificate_type == "achievement":
                if not program.get('achievementCertificateTemplateURL'):
                    raise KeyError("Achievement certificate template URL not found")
                return program['achievementCertificateTemplateURL']
            
            elif self.certificate_type == "attendance":
                if not program.get('attendanceCertificateTemplateURL'):
                    raise KeyError("Attendance certificate template URL not found")
                return program['attendanceCertificateTemplateURL']
            
            else:
                raise ValueError(f"Invalid certificate type: {self.certificate_type}")
            
        except (KeyError, ValueError) as e:
            logging.error(f"Error fetching template image: {str(e)}")
            raise
        except Exception as e:
            error_msg = f"Unexpected error fetching template image: {str(e)}"
            logging.error(error_msg)
            raise RuntimeError(error_msg)

    def fetch_template_text(self):
        """
        Fetches the HTML template text for the certificate.

        Returns:
            str: The HTML template text.

        Raises:
            ValueError: If no matching template is found
            RequestException: If GraphQL request fails
            Exception: For other unexpected errors
        """
        try:
            if not self.enrollments:
                raise ValueError("No enrollments found")
            
            program_id = self.enrollments[0]['Course']['Program']['id']
            
            logging.info(f"Certificate Type: {self.certificate_type}")
            # Only get record_type for achievement certificates
            if self.certificate_type == "achievement":
                if not self.enrollments[0].get('User', {}).get('AchievementRecordAuthors'):
                    raise ValueError("No achievement record found for user")
                record_type = self.enrollments[0]['User']['AchievementRecordAuthors'][0]['AchievementRecord']['AchievementOption']['recordType']
            else:  # attendance certificate
                record_type = "DOCUMENTATION"  # or whatever the correct record type is for attendance
            
            logging.info(f"Fetching template for record type: {record_type}")

            query = """
            query getTemplateHtml($programId: Int!, $certificateType: CertificateType_enum!, $recordType: AchievementRecordType_enum!) {
                CertificateTemplateProgram(where: {programId: {_eq: $programId}, CertificateTemplateText: {certificateType: {_eq: $certificateType}, recordType: {_eq: $recordType}}}) {
                    CertificateTemplateText {
                        html
                        recordType
                        certificateType 
                    }
                }
            }
            """
            variables = {"programId": program_id, "certificateType": self.certificate_type.upper(), "recordType": record_type}
            headers = {
                "Content-Type": "application/json",
                "x-hasura-admin-secret": self.eduhub_client.hasura_admin_secret
            }

            response = requests.post(
                self.eduhub_client.url,
                json={'query': query, 'variables': variables},
                headers=headers
            )
            response.raise_for_status()
            data = response.json()

            if 'errors' in data:
                raise requests.exceptions.RequestException(f"GraphQL Error: {data['errors']}")

            # check if the template is empty or more than one template is found
            if not data['data']['CertificateTemplateProgram'] or len(data['data']['CertificateTemplateProgram']) > 1:
                raise ValueError(f"No matching template found for recordType: {record_type} and certificateType: {self.certificate_type.upper()}")
            
            # Get the first template from the list of templates
            return data['data']['CertificateTemplateProgram'][0]['CertificateTemplateText']['html']

        except requests.exceptions.RequestException as e:
            logging.error(f"GraphQL request failed: {str(e)}")
            raise
        except ValueError as e:
            logging.error(f"Template not found: {str(e)}")
            raise
        except Exception as e:
            error_msg = f"Unexpected error fetching template text: {str(e)}"
            logging.error(error_msg)
            raise RuntimeError(error_msg)

    def prepare_text_content(self, enrollment, image):
        """
        Prepares the text content for the certificate template.

        Args:
            enrollment (dict): The enrollment data for the user
            image (str): The template image

        Returns:
            dict: The prepared text content for the certificate

        Raises:
            ValueError: If certificate type is invalid or required data is missing
            KeyError: If required enrollment data is missing
            Exception: For other unexpected errors
        """
        try:
            if self.certificate_type == "attendance":
                if not enrollment.get('User') or not enrollment.get('Course'):
                    raise KeyError("Missing required enrollment data")
                
                session_titles = self.get_attended_sessions(enrollment, enrollment["Course"]["Sessions"])
                return {
                    "full_name": f"{enrollment['User']['firstName']} {enrollment['User']['lastName']}",
                    "course_name": enrollment["Course"]["title"],
                    "semester": enrollment["Course"]["Program"]["title"],
                    "event_entries": session_titles,
                    "template": image,
                    "ECTS": enrollment["Course"]["ects"]
                }
            
            elif self.certificate_type == "achievement":
                if not enrollment.get('Course') or not enrollment.get('Course', {}).get('learningGoals'):
                    raise KeyError("Missing required course or learning goals data")
                
                learning_goals = [goal.strip() for goal in enrollment["Course"]["learningGoals"].split(". ") if goal.strip()]
                return {
                    "full_name": f"{enrollment['User']['firstName']} {enrollment['User']['lastName']}",
                    "course_name": enrollment["Course"]["title"],
                    "semester": enrollment["Course"]["Program"]["title"],
                    "template": image,
                    "ECTS": str(int(enrollment["Course"]["ects"]) * 30),
                    "learningGoalsList": learning_goals,
                    "praxisprojekt": enrollment["User"]["AchievementRecordAuthors"][0]["AchievementRecord"]["AchievementOption"]["title"]
                }
            
            else:
                raise ValueError(f"Invalid certificate type: {self.certificate_type}")
            
        except (KeyError, ValueError) as e:
            logging.error(f"Error preparing text content: {str(e)}")
            raise
        except Exception as e:
            error_msg = f"Unexpected error preparing text content: {str(e)}"
            logging.error(error_msg)
            raise RuntimeError(error_msg)

    def generate_pdf_file_name(self, enrollment):
        """
        Generates the file name for the PDF certificate.

        Args:
            enrollment (dict): The enrollment data for the user.

        Returns:
            str: The generated file name for the PDF certificate.

        This method constructs a file name based on the user ID, course ID, and certificate type.
        """
        return f"{enrollment['User']['id']}/{enrollment['Course']['id']}/{self.certificate_type}_certificate.pdf"

    
    
    def get_attended_sessions(self, enrollment, sessions):
        """
        Gets the titles of attended sessions for a given enrollment, MISSED Sessions are ignored.

        Args:
            enrollment (dict): The enrollment data for the user.
            sessions (list): The list of sessions for the course.

        Returns:
            list: The titles of the attended sessions.

        This method filters and sorts the sessions based on attendance records and returns the titles
        of the sessions that the user attended.
        """
        attended_sessions = []

        for session in sessions:
            # Get every attendance record for one session
            attendances_for_session = [
                attendance
                for attendance in enrollment.get("User", {}).get("Attendances", [])
                if attendance.get("Session", {}).get("id") == session.get("id")
            ]

            # Choosing the newest attendance record by highest ID
            if attendances_for_session:
                attendances_for_session.sort(key=lambda x: x.get("id"), reverse=True)
                last_attendance = attendances_for_session[0]

                # Add attendance if Status attended
                if last_attendance.get("status") == "ATTENDED":
                    attended_sessions.append(
                        {
                            "sessionTitle": session.get("title"),
                            "date": session.get("startDateTime"),  # Optional, fals Date is needed
                            "status": last_attendance.get("status", "NO_INFO"),  # Optional, if state is needed
                        }
                    )
        # Sorting the Sessions by start Date 
        # Attention: Date must have the correct format!
        attended_sessions.sort(key=lambda x: x.get("date"))

        # get the title of the attended Session 
        attended_session_titles = [
            session["sessionTitle"]
            for session in attended_sessions
            if session["sessionTitle"] is not None
        ]

        return attended_session_titles



def create_certificates(arguments):
    """Creates certificates for specified users in a course.
    
    Args:
        hasura_secret (str): Secret for authentication with Hasura
        arguments (dict): Contains:
            - input.userIds (list): List of user IDs to generate certificates for
            - input.courseId (int): Course ID
            - input.certificateType (str): Type of certificate ('achievement' or 'attendance')
            
    Returns:
        dict: Response containing:
            - success (bool): Whether the operation was successful
            - count (int): Number of certificates generated
            - certificateType (str): Type of certificates generated
            - error (str, optional): Error message if operation failed
            - messageKey (str, optional): Translation key for the error message
    """
    try:
        # if list of userIds is empty set count to 0
        if not arguments["input"]["userIds"]:
            count = 0
        else:
            certificate_creator = CertificateCreator(arguments)
            count = certificate_creator.create_certificates()
        
        logging.info(f"Successfully generated {count} certificates")
        return {
            "success": True,
            "count": count,
            "certificateType": arguments["input"]["certificateType"],
            "messageKey": "CERTIFICATES_GENERATED_SUCCESS"
        }
        
    except ValueError as e:
        logging.error(f"Invalid input for certificate generation: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "messageKey": "INVALID_INPUT"
        }
    except Exception as e:
        logging.error(f"Error creating certificates: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "messageKey": "CERTIFICATE_GENERATION_FAILED"
        }
