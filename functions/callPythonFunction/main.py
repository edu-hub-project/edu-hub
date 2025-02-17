import logging
import os
from flask import request, jsonify
from typing import Dict, Any, Callable

# Import functions explicitly
from pythonFunctions.add_confirmed_user_to_mm import add_confirmed_user_to_mm
from pythonFunctions.check_attendance import check_attendance
from pythonFunctions.create_certificates import create_certificates
from pythonFunctions.load_participation_data import load_participation_data

# Initialize the logger level
if os.environ.get("ENVIRONMENT") == "production":
    logging.basicConfig(level=logging.INFO)
else:
    logging.basicConfig(level=logging.DEBUG)

# Create an explicit function map
PYTHON_FUNCTIONS: Dict[str, Callable] = {
    "add_confirmed_user_to_mm": add_confirmed_user_to_mm,
    "check_attendance": check_attendance,
    "create_certificates": create_certificates,
    "load_participation_data": load_participation_data,
}

def call_python_function(request):
    """Call the Python function indicated in the request and return the result.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        dict: A standardized response containing success status and result/error
    """
    try:
        arguments = request.get_json()
        logging.info("########## Calling Python Function ##########")
        logging.debug(f"Request: {arguments}")

        hasura_secret = request.headers.get("Hasura-Secret")

        if hasura_secret is None:
            logging.error("No Hasura secret provided")
            return jsonify({
                "success": False,
                "error": "Missing Hasura secret",
                "messageKey": "MISSING_SECRET"
            }), 200

        if not hasura_secret == os.environ.get("HASURA_CLOUD_FUNCTION_SECRET"):
            logging.error("Invalid Hasura secret provided")
            return jsonify({
                "success": False,
                "error": "Invalid secret",
                "messageKey": "INVALID_SECRET"
            }), 200

        function_name = request.headers.get("Function-Name")
        if function_name is None and arguments.get('action', {}).get('name'):
            function_name = arguments['action']['name']
            logging.info(f"Using action name as function name: {function_name}")
        else:
            logging.info(f"Function name: {function_name}")

        if function_name not in PYTHON_FUNCTIONS:
            return jsonify({
                "success": False,
                "error": "Function not found",
                "messageKey": "FUNCTION_NOT_FOUND"
            }), 200

        result = PYTHON_FUNCTIONS[function_name](arguments)
        
        # If result is already a dict with success/error info, return it directly
        if isinstance(result, dict) and ("success" in result or "error" in result):
            return jsonify(result), 200
            
        # Otherwise, wrap the result in a success response
        return jsonify({
            "success": True,
            "result": result
        }), 200

    except Exception as error:
        logging.error(f"Error in {function_name}: {str(error)}")
        return jsonify({
            "success": False,
            "error": str(error),
            "messageKey": "INTERNAL_SERVER_ERROR",
        }), 200
