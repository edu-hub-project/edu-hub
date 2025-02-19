import os
from flask import jsonify
import logging
from api_clients.eduhub_client import EduHubClient
import uuid

HASURA_ENDPOINT = os.getenv('HASURA_ENDPOINT')
HASURA_ADMIN_SECRET = os.getenv('HASURA_GRAPHQL_ADMIN_KEY')

def get_cors_headers():
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '3600'
    }

def generate_uuid_from_id(id_str):
    """Generate a consistent UUID from a string ID by using it as a namespace."""
    # Use a fixed namespace UUID (version 5, SHA-1)
    # This is a randomly generated UUID that we'll use as our namespace
    NAMESPACE_UUID = uuid.UUID('fb7eec39-2d36-4c2f-a6b7-87568c8976b2')
    # Generate a UUID using the course ID string
    return str(uuid.uuid5(NAMESPACE_UUID, str(id_str)))

def handle_moochub_data():
    try:
        # Use the existing EduHubClient
        eduhub_client = EduHubClient()
        
        query = """query {
            Course(where: {_and: {published: {_eq: true}, Program: {published: {_eq: true}}}}) {
                id
                title
                tagline
                coverImage
                language
                ects
                weekDay
                startTime
                endTime
                applicationEnd
                learningGoals
                headingDescriptionField1
                contentDescriptionField1
                headingDescriptionField2
                contentDescriptionField2
                Program {
                    id
                    shortTitle
                }
                CourseLocations {
                    id
                    locationOption
                }
            }
        }"""

        # Query using existing client
        courses = eduhub_client.send_query(query, variables=None)
        
        if not isinstance(courses, dict) or "data" not in courses:
            return {'error': 'Failed to fetch data from EduHub'}, 500

        # Filter courses
        courses["data"]["Course"] = [
            course for course in courses["data"]["Course"]
            if course["Program"]["shortTitle"] not in ["EVENTS", "DEGREES"]
        ]

        # Transform to MOOCHub schema
        transformed_data = []
        for course in courses["data"]["Course"]:
            # Determine courseMode - "online" if ONLINE exists, otherwise "onsite"
            course_mode = ["online"] if any(
                loc["locationOption"] == "ONLINE" 
                for loc in course["CourseLocations"]
            ) else ["onsite"]
            
            attributes = {
                "name": course["title"],
                "courseCode": str(course["id"]),
                "learningResourceType": {
                    "identifier": "https://w3id.org/kim/hcrt/course",
                    "type": "Concept",
                    "inScheme": "https://w3id.org/kim/hcrt/scheme"
                },
                "courseMode": course_mode,
                "inLanguage": [course["language"].lower()],
                "startDate": [f"{course['applicationEnd']}T00:00:00Z"] if course["applicationEnd"] else None,
                "url": f"https://edu.opencampus.sh/course/{course['id']}",
                "description": "\n".join(filter(None, [
                    course["headingDescriptionField1"],
                    course["contentDescriptionField1"],
                    course["headingDescriptionField2"],
                    course["contentDescriptionField2"]
                ])),
                "publisher": {
                    "name": "opencampus.sh",
                    "type": "Organization",
                    "url": "https://edu.opencampus.sh"
                },
                "license": [{
                    "identifier": "CC-BY-NC-4.0",
                    "url": "https://creativecommons.org/licenses/by-nc/4.0/legalcode.en",
                    "contentUrl": None
                }],
                "creator": [{
                    "name": "opencampus.sh",
                    "type": "Organization",
                    "url": "https://edu.opencampus.sh"
                }]
            }
            
            if course["coverImage"]:
                attributes["image"] = {
                    "description": "© Jan Konitzki / opencampus.sh",
                    "type": "ImageObject",
                    "contentUrl": course["coverImage"],
                    "license": [{
                        "identifier": "proprietary",
                        "url": None,
                        "contentUrl": None
                    }]
                }
            
            transformed_course = {
                "id": generate_uuid_from_id(course["id"]),
                "type": "Course",
                "attributes": attributes
            }
            
            # Convert learning goals to teaches array
            if course["learningGoals"]:
                goals = [goal.strip() for goal in course["learningGoals"].split('\n') if goal.strip()]
                transformed_course["attributes"]["teaches"] = [{
                    "name": [{
                        "inLanguage": course["language"].lower(),
                        "name": goal
                    }],
                    "educationalFramework": "GRETA",
                    "educationalFrameworkVersion": "1.0"
                } for goal in goals]
            
            transformed_data.append(transformed_course)

        moochub_response = {
            "links": {
                "self": "https://edu.opencampus.sh",
                "first": "https://edu.opencampus.sh",
                "last": "https://edu.opencampus.sh"
            },
            "data": transformed_data
        }
            
        return moochub_response
            
    except Exception as e:
        logging.error(f"Error in handle_moochub_data: {str(e)}")
        return {'error': str(e)}, 500

def handle_request(request):
    # Handle CORS preflight requests
    if request.method == 'OPTIONS':
        return ('', 204, get_cors_headers())

    # Get the path from the request
    path = request.path.strip('/').split('/')[0]

    # Route to appropriate handler based on path
    handlers = {
        'moochub': handle_moochub_data,
        # Add more endpoints here as needed
    }

    if path in handlers:
        result = handlers[path]()
        # Check if result includes an error status
        if isinstance(result, tuple):
            data, status = result
            return (jsonify(data), status, get_cors_headers())
        return (jsonify(result), 200, get_cors_headers())
    
    return (jsonify({'error': 'Not found'}), 404, get_cors_headers())
