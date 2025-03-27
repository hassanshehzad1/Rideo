# API Documentation

## Endpoint: `/api/v1/users/register`

### Description

This endpoint is used to register a new user in the system. It validates the input data and creates a new user if the data is valid and the email is not already registered.

### Method

`POST`

### Request Body

The request body must be in JSON format and include the following fields:

| Field                | Type   | Required | Description                                        |
| -------------------- | ------ | -------- | -------------------------------------------------- |
| `fullName`           | Object | Yes      | Contains the user's first and last name.           |
| `fullName.firstName` | String | Yes      | The first name of the user (minimum 3 characters). |
| `fullName.lastName`  | String | Yes      | The last name of the user (minimum 3 characters).  |
| `email`              | String | Yes      | The user's email address (must be valid).          |
| `password`           | String | Yes      | The user's password (minimum 8 characters).        |

### Example Request

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### Responses

#### Success

- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "message": "User created successfully",
    "success": true,
    "token": "your-authentication-token"
  }
  ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Response Body:**
  ```json
  {
    "success": false,
    "message": "Validation failed",
    "errors": [
      {
        "msg": "Please provide a valid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

#### User Already Exists

- **Status Code:** `400 Bad Request`
- **Response Body:**
  ```json
  {
    "success": false,
    "message": "User with this email is already registered"
  }
  ```

### Notes

- Ensure that the `JWT_SECRET` environment variable is set in the `.env` file for token generation.
- Passwords are hashed before being stored in the database.
