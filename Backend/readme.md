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

## Endpoint: `/api/v1/users/login`

### Description

This endpoint is used to authenticate a user and provide a JWT token upon successful login.

### Method

`POST`

### Request Body

The request body must be in JSON format and include the following fields:

| Field      | Type   | Required | Description                                 |
| ---------- | ------ | -------- | ------------------------------------------- |
| `email`    | String | Yes      | The user's email address (must be valid).   |
| `password` | String | Yes      | The user's password (minimum 8 characters). |

### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### Responses

#### Success

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Login Successfully",
    "success": true,
    "token": "your-authentication-token",
    "user": {
      "id": "user-id",
      "email": "john.doe@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  }
  ```

#### Validation Error

- **Status Code:** `400 Bad Request`
- **Response Body:**
  ```json
  {
    "success": false,
    "message": "Validation Failed",
    "errors": [
      {
        "msg": "Please provide a valid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "success": false,
    "message": "Invalid credentials, email and password is incorrect"
  }
  ```

### Notes

- Ensure that the `JWT_SECRET` environment variable is set in the `.env` file for token generation.
- Passwords are securely compared using hashing.

## Endpoint: `/api/v1/users/profile`

### Description

This endpoint is used to retrieve the profile information of the authenticated user.

### Method

`GET`

### Headers

| Header          | Value            | Required | Description                              |
| --------------- | ---------------- | -------- | ---------------------------------------- |
| `Authorization` | Bearer `<token>` | Yes      | The JWT token of the authenticated user. |

### Responses

#### Success

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "success": true,
    "message": "User profile",
    "user": {
      "id": "user-id",
      "email": "john.doe@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  }
  ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "success": false,
    "message": "Not authorized, no token founded"
  }
  ```

### Notes

- This endpoint requires the `protect` middleware to verify the JWT token.

---

## Endpoint: `/api/v1/users/logout`

### Description

This endpoint is used to log out the authenticated user by blacklisting their JWT token.

### Method

`GET`

### Headers

| Header          | Value            | Required | Description                              |
| --------------- | ---------------- | -------- | ---------------------------------------- |
| `Authorization` | Bearer `<token>` | Yes      | The JWT token of the authenticated user. |

### Responses

#### Success

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "success": true,
    "message": "Logout successfully"
  }
  ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "success": false,
    "message": "Not authorized, no token founded"
  }
  ```

### Notes

- This endpoint clears the user's authentication cookie and blacklists the token to prevent reuse.
- The `protect` middleware ensures that only authenticated users can access this endpoint.

# Middleware Documentation

## Middleware: `protect`

### Description

The `protect` middleware is used to secure routes by verifying the JWT token provided by the user. It ensures that only authenticated users can access protected endpoints.

### Usage

This middleware should be applied to any route that requires authentication.

### Functionality

1. Checks for the presence of a token in the `Authorization` header or cookies.
2. Verifies the token using the `JWT_SECRET` environment variable.
3. Checks if the token is blacklisted (e.g., after logout).
4. Fetches the user associated with the token and attaches it to the `req` object.

### Example

```javascript
import { protect } from "../middleware/auth.middleware.js";

router.get("/profile", protect, profile);
```

### Errors

#### No Token Found

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Not authorized, no token founded"
  }
  ```

#### Token Blacklisted

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Not authorized, Token is blacklisted"
  }
  ```

#### Token Validation Failed

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Not authorized, Token validation failed"
  }
  ```

#### User Not Found

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Not authorized, User not found"
  }
  ```

### Notes

- Ensure the `JWT_SECRET` environment variable is set in the `.env` file.
- Tokens are blacklisted upon logout to prevent reuse.
