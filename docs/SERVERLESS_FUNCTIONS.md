# Serverless Functions Development Guide

## Overview
This guide covers the development of serverless functions in our system, ensuring consistency and maintainability across all implementations.

## Table of Contents
1. [Basic Python Function Template](#basic-python-function-template)
2. [Implementation Steps](#implementation-steps)
3. [Naming Conventions](#naming-conventions)
4. [Response Format](#response-format)
5. [Error Handling](#error-handling)
6. [Documentation Requirements](#documentation-requirements)


## Basic Python Function Template

```python
def template_function(arguments):
    """
    Description of what the function does.
    
    Args:
    arguments (dict): Contains:
        - input.param1 (type): Description
        - input.param2 (type): Description
    
    Returns:
    dict: Response containing:
        - success (bool): Whether the operation was successful
        - error (str, optional): Error message if operation failed
        - messageKey (str): Translation key for messages
        - [additional_field] (type): Description of additional return fields
    """
    logging.info("########## Template Function ##########")
    logging.debug(f"Arguments: {arguments}")
    try:
        # Your function logic here
        result = do_something(arguments)
        return {
            "success": True,
            "messageKey": "OPERATION_SUCCESS",
            # Additional result fields
        }
    except ValueError as e:
        logging.error(f"Invalid input: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "messageKey": "INVALID_INPUT"
        }
    except Exception as e:
        logging.error(f"Error in template function: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "messageKey": "OPERATION_FAILED"
        }
```


## Implementation Steps

1. **Create Function File**
   - Place in `functions/callPythonFunction/pythonFunctions/`
   - Use snake_case for filename: `your_function_name.py`

2. **Register Function**
   ```python:functions/callPythonFunction/main.py
   from pythonFunctions.your_function_name import your_function_name

   PYTHON_FUNCTIONS: Dict[str, Callable] = {
       # ... existing functions ...
       "your_function_name": your_function_name,
   }
   ```

3. **Define a Trigger or Action in Hasura**
  An action you can define as follows in the Hasura console:
   ```graphql
   type Mutation {
     yourFunctionName(param1: Type!, param2: Type): YourFunctionResult!
   }
   ```
   With the result type defined as follows (under Type Configuration):
   ```graphql
   type YourFunctionResult {
     success: Boolean!
     messageKey: String!
     error: String
     # Additional fields specific to your function
   }
   ```
   The Webhook URL you set to `{CLOUD_FUNCTION_LINK_CALL_PYTHON_FUNCTION}}`, which will be set according to the current environment.

   Set the following mandatory headers:
   - `Hasura-Secret`: choose 'From env var' and set it to `HASURA_CLOUD_FUNCTION_SECRET`
   - `Function-Name`: choose 'Value' and set it to `your_function_name`
   Optional header:
   - `Bucket`: choose 'From env var' and set it to `HASURA_BUCKET`

   ⚠️ **Important**: For functions that return a response (most cases), set the execution mode to `Synchronous`. 
   It is set to `Asynchronous` by default, which will cause errors when trying to access the response fields.

4. **Create Frontend Query**
   ```typescript:frontend-nx/apps/edu-hub/queries/actions.ts
   export const YOUR_FUNCTION = gql`
     mutation yourFunctionName($param1: Type!, $param2: Type) {
       yourFunctionName(param1: $param1, param2: $param2) {
         success
         messageKey
         error
         # Additional fields
       }
     }
   `;
   ```

5. **Add Translation Keys**
   If you use messageKeys in your function, you need to add them in the specific language file of the component calling the function.

## Naming Conventions

1. **Python**
   - Function names: `snake_case`
   - Variables: `snake_case`
   - Classes: `PascalCase`
   - Constants: `UPPER_SNAKE_CASE`

2. **GraphQL**
   - Types: `PascalCase` with `Result` suffix (e.g., `CreateCertificatesResult`)
   - Mutations/Queries: `camelCase`
   - Fields: `camelCase`

3. **TypeScript**
   - Constants: `UPPER_SNAKE_CASE`
   - Components: `PascalCase`
   - Functions/Methods: `camelCase`
   - Files: Match component name if containing a component

4. **Message Keys**
   - Format: `UPPERCASE_WITH_UNDERSCORES`
   - Categories:
     - Success: `OPERATION_SUCCESS`
     - Input Error: `INVALID_INPUT`
     - General Error: `OPERATION_FAILED`

## Response Format

All functions should return a standardized response:
```python
{
  "success": bool, # Required: Operation success status
  "messageKey": str, # Required: Translation key for UI messages
  "error": str, # Optional: Error message if success is False
  # Additional fields specific to the function
}
```
Do not use a nested data object to return the result of the function but rather return the fields directly in the response.

## Error Handling

1. **Standard Error Types**
   - `ValueError` for invalid inputs
   - `Exception` as fallback for unexpected errors
   - Custom exceptions for specific business logic

2. **Error Response Format**
   ```python
   {
       "success": False,
       "error": str(e),  # Human-readable error message
       "messageKey": "ERROR_TYPE"  # Translation key for frontend
   }
   ```

3. **Common Message Keys**
   - `INVALID_INPUT`: Input validation failures
   - `UNAUTHORIZED`: Permission issues
   - `OPERATION_FAILED`: General operation failures
   - `NOT_FOUND`: Resource not found
   - `INTERNAL_ERROR`: Unexpected system errors

4. **Logging**
   - Always log errors with stack traces
   - Include relevant context but no sensitive data
   - Use appropriate log levels (ERROR for errors, INFO for operations)

## Documentation Requirements

1. **Function Docstring**
   ```python
   """Short description of function purpose.
   
   Args:
       arguments (dict): Contains:
           - input.param1 (type): Description
           - input.param2 (type): Description
           
   Returns:
       dict: Response containing:
           - success (bool): Operation status
           - messageKey (str): Translation key
           - error (str, optional): Error message
   """
   ```

2. **Code Comments**
   - Explain complex business logic
   - Document assumptions
   - Note any side effects
