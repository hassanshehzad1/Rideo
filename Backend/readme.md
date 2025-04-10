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

# Captain API Documentation

## Endpoint: `/api/v1/captains/register`

### Description

This endpoint is used to register a new captain in the system. It validates the input data and creates a new captain if the data is valid and the email is not already registered.

### Method

`POST`

### Request Body

The request body must be in JSON format and include the following fields:

| Field                  | Type   | Required | Description                                                        |
| ---------------------- | ------ | -------- | ------------------------------------------------------------------ |
| `fullName`             | Object | Yes      | Contains the captain's first and last name.                        |
| `fullName.firstName`   | String | Yes      | The first name of the captain (minimum 3 characters).              |
| `fullName.lastName`    | String | Yes      | The last name of the captain (minimum 3 characters).               |
| `email`                | String | Yes      | The captain's email address (must be valid).                       |
| `password`             | String | Yes      | The captain's password (minimum 8 characters).                     |
| `vehicle`              | Object | Yes      | Contains the captain's vehicle details.                            |
| `vehicle.type`         | String | Yes      | The type of the vehicle (must be one of `car`, `bike`, or `auto`). |
| `vehicle.licensePlate` | String | Yes      | The license plate number of the vehicle.                           |
| `vehicle.model`        | String | Yes      | The model of the vehicle.                                          |
| `vehicle.color`        | String | Yes      | The color of the vehicle.                                          |
| `vehicle.capacity`     | Number | Yes      | The capacity of the vehicle (minimum 1).                           |

### Example Request

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "vehicle": {
    "type": "car",
    "licensePlate": "ABC123",
    "model": "Toyota Corolla",
    "color": "Blue",
    "capacity": 4
  }
}
```

### Responses

#### Success

- **Status Code:** `201 Created`
- **Response Body:**
  ```json
  {
    "message": "Captain registered successfully",
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

#### Captain Already Exists

- **Status Code:** `400 Bad Request`
- **Response Body:**
  ```json
  {
    "success": false,
    "message": "Captain already registered with this email"
  }
  ```

### Notes

- Ensure that the `JWT_SECRET` environment variable is set in the `.env` file for token generation.
- Passwords are hashed before being stored in the database.

## Endpoint: `/api/v1/captains/login`

### Description

This endpoint is used to authenticate a captain and provide a JWT token upon successful login.

### Method

`POST`

### Request Body

The request body must be in JSON format and include the following fields:

| Field      | Type   | Required | Description                                    |
| ---------- | ------ | -------- | ---------------------------------------------- |
| `email`    | String | Yes      | The captain's email address (must be valid).   |
| `password` | String | Yes      | The captain's password (minimum 8 characters). |

### Example Request

```json
{
  "email": "captain.doe@example.com",
  "password": "securepassword123"
}
```

### Responses

#### Success

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "message": "Captain logged in successfully",
    "success": true,
    "token": "your-authentication-token",
    "captain": {
      "id": "captain-id",
      "email": "captain.doe@example.com",
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

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "success": false,
    "message": "Invalid credentials, email and password is incorrect"
  }
  ```

---

## Endpoint: `/api/v1/captains/logout`

### Description

This endpoint is used to log out the authenticated captain by blacklisting their JWT token.

### Method

`GET`

### Headers

| Header          | Value            | Required | Description                                 |
| --------------- | ---------------- | -------- | ------------------------------------------- |
| `Authorization` | Bearer `<token>` | Yes      | The JWT token of the authenticated captain. |

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

---

## Endpoint: `/api/v1/captains/profile`

### Description

This endpoint is used to retrieve the profile information of the authenticated captain.

### Method

`GET`

### Headers

| Header          | Value            | Required | Description                                 |
| --------------- | ---------------- | -------- | ------------------------------------------- |
| `Authorization` | Bearer `<token>` | Yes      | The JWT token of the authenticated captain. |

### Responses

#### Success

- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "success": true,
    "message": "Captain profile",
    "captain": {
      "id": "captain-id",
      "email": "captain.doe@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "vehicle": {
        "type": "car",
        "licensePlate": "ABC123",
        "model": "Toyota Corolla",
        "color": "Blue",
        "capacity": 4
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

---

## Middleware: `captainProtect`

### Description

The `captainProtect` middleware is used to secure captain-specific routes by verifying the JWT token provided by the captain. It ensures that only authenticated captains can access protected endpoints.

### Usage

This middleware should be applied to any route that requires captain authentication.

### Functionality

1. Checks for the presence of a token in the `Authorization` header or cookies.
2. Verifies the token using the `JWT_SECRET` environment variable.
3. Checks if the token is blacklisted (e.g., after logout).
4. Fetches the captain associated with the token and attaches it to the `req` object.

### Example

```javascript
import { captainProtect } from "../middleware/auth.middleware.js";

router.get("/profile", captainProtect, profile);
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
    "message": "Unauthorized"
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

#### Captain Not Found

- **Status Code:** `401 Unauthorized`
- **Response Body:**
  ```json
  {
    "message": "Not authorized, token not found"
  }
  ```

### Notes

- Ensure the `JWT_SECRET` environment variable is set in the `.env` file.
- Tokens are blacklisted upon logout to prevent reuse.

# Maps Endpoints

## Endpoint: `/api/v1/maps/get-coordinate`

### Description

Fetches the geographical coordinates (latitude and longitude) for a given address.

### Method

`GET`

### Query Parameters

| Parameter | Type   | Required | Description                           |
| --------- | ------ | -------- | ------------------------------------- |
| `address` | String | Yes      | The address to fetch coordinates for. |

### Example Request

```http
GET /api/v1/maps/get-coordinate?address=1600+Amphitheatre+Parkway HTTP/1.1
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "message": "Coordinates fetched successfully",
  "data": {
    "lat": 37.422,
    "lng": -122.084
  }
}
```

---

## Endpoint: `/api/v1/maps/get-distance-time`

### Description

Calculates the distance and estimated travel time between two locations.

### Method

`GET`

### Query Parameters

| Parameter     | Type   | Required | Description                       |
| ------------- | ------ | -------- | --------------------------------- |
| `origin`      | String | Yes      | The starting location address.    |
| `destination` | String | Yes      | The destination location address. |

### Example Request

```http
GET /api/v1/maps/get-distance-time?origin=New+York&destination=Boston HTTP/1.1
Authorization: Bearer <token>
```

### Example Response

```json
{
  "success": true,
  "message": "Distance and time calculated successfully",
  "data": {
    "distance": {
      "text": "305.5 km",
      "value": 305500
    },
    "duration": {
      "text": "3 hours 45 mins",
      "value": 13500
    },
    "status": "OK"
  }
}
```

---

## Endpoint: `/api/v1/maps/get-suggestion`

### Description

Provides autocomplete suggestions for a given input string.

### Method

`GET`

### Query Parameters

| Parameter | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `input`   | String | Yes      | The input string for suggestions. |

### Example Request

```http
GET /api/v1/maps/get-suggestion?input=1600 HTTP/1.1
Authorization: Bearer <token>
```

### Example Response

```json
[
  {
    "description": "1600 Amphitheatre Parkway, Mountain View, CA, USA",
    "place_id": "12345",
    "structured_formatting": {
      "main_text": "1600 Amphitheatre Parkway",
      "secondary_text": "Mountain View, CA, USA"
    },
    "terms": [
      { "offset": 0, "value": "1600 Amphitheatre Parkway" },
      { "offset": 27, "value": "Mountain View" },
      { "offset": 42, "value": "CA" },
      { "offset": 46, "value": "USA" }
    ]
  }
]
```

---

# Rides Endpoints

## Endpoint: `/api/v1/rides/create`

### Description

Creates a new ride request.

### Method

`POST`

### Request Body

| Field         | Type   | Required | Description                                  |
| ------------- | ------ | -------- | -------------------------------------------- |
| `pickup`      | String | Yes      | The pickup location address.                 |
| `destination` | String | Yes      | The destination location address.            |
| `vehicleType` | String | Yes      | The type of vehicle (`auto`, `car`, `bike`). |

### Example Request

```http
POST /api/v1/rides/create HTTP/1.1
Authorization: Bearer <token>
Content-Type: application/json

{
  "pickup": "1600 Amphitheatre Parkway",
  "destination": "1 Infinite Loop",
  "vehicleType": "car"
}
```

### Example Response

```json
{
  "user": "64f1a2b3c4d5e6f7g8h9i0j1",
  "pickup": "1600 Amphitheatre Parkway",
  "destination": "1 Infinite Loop",
  "fare": 150.75,
  "otp": "123456",
  "status": "pending",
  "duration": 3600,
  "distance": 50000,
  "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
```

## Ride Model Example

The following is an example of the `Ride` model:

```json
{
  "user": "64f1a2b3c4d5e6f7g8h9i0j1",
  "captain": "64f1a2b3c4d5e6f7g8h9i0j2",
  "pickup": "1600 Amphitheatre Parkway",
  "destination": "1 Infinite Loop",
  "fare": 150.75,
  "status": "pending",
  "duration": 3600,
  "distance": 50000,
  "paymentId": "pay_123456789",
  "orderId": "order_987654321",
  "signature": "signature_abcdef",
  "otp": "123456",
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
```

---

## Socket Events Documentation

### Event: `join`

#### Description

This event is used to associate a user or captain with their socket ID.

#### Payload

| Field      | Type   | Required | Description                             |
| ---------- | ------ | -------- | --------------------------------------- |
| `userId`   | String | Yes      | The ID of the user or captain.          |
| `userType` | String | Yes      | The type of user (`user` or `captain`). |

#### Example

```json
{
  "userId": "64f1a2b3c4d5e6f7g8h9i0j1",
  "userType": "user"
}
```

---

### Event: `updateLocation`

#### Description

This event is used by captains to update their current location.

#### Payload

| Field      | Type   | Required | Description                                 |
| ---------- | ------ | -------- | ------------------------------------------- |
| `userId`   | String | Yes      | The ID of the captain.                      |
| `location` | Object | Yes      | The location object containing coordinates. |

#### Example

```json
{
  "userId": "64f1a2b3c4d5e6f7g8h9i0j2",
  "location": {
    "type": "Point",
    "coordinates": [77.5946, 12.9716]
  }
}
```

---

### Event: `newRideRequest`

#### Description

This event is emitted to captains within a 5 km radius when a new ride request is created.

#### Example Payload

```json
{
  "event": "newRideRequest",
  "ride": {
    "user": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "email": "john.doe@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      }
    },
    "pickup": "1600 Amphitheatre Parkway",
    "destination": "1 Infinite Loop",
    "fare": 150.75,
    "status": "pending"
  }
}
```

---

### Event: `rideConfirmed`

#### Description

This event is emitted to the user when a captain confirms their ride.

#### Example Payload

```json
{
  "event": "rideConfirmed",
  "ride": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "captain": {
      "id": "64f1a2b3c4d5e6f7g8h9i0j3",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      }
    },
    "status": "accepted"
  }
}
```

---

### Event: `rideStarted`

#### Description

This event is emitted to the user when the ride starts.

#### Example Payload

```json
{
  "event": "rideStarted",
  "ride": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "status": "ongoing"
  }
}
```

---

### Event: `rideEnd`

#### Description

This event is emitted to the user when the ride ends.

#### Example Payload

```json
{
  "event": "rideEnd",
  "ride": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "status": "completed"
  }
}
```

---

## Ride Services Documentation

### Service: `createRide`

#### Description

Creates a new ride request.

#### Endpoint

`POST /api/v1/rides/create`

#### Request Body

| Field         | Type   | Required | Description                                  |
| ------------- | ------ | -------- | -------------------------------------------- |
| `pickup`      | String | Yes      | The pickup location address.                 |
| `destination` | String | Yes      | The destination location address.            |
| `vehicleType` | String | Yes      | The type of vehicle (`auto`, `car`, `bike`). |

#### Example Request

```json
{
  "pickup": "1600 Amphitheatre Parkway",
  "destination": "1 Infinite Loop",
  "vehicleType": "car"
}
```

#### Example Response

```json
{
  "user": "64f1a2b3c4d5e6f7g8h9i0j1",
  "pickup": "1600 Amphitheatre Parkway",
  "destination": "1 Infinite Loop",
  "fare": 150.75,
  "otp": "123456",
  "status": "pending",
  "duration": 3600,
  "distance": 50000,
  "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
  "createdAt": "2023-10-01T12:00:00.000Z",
  "updatedAt": "2023-10-01T12:00:00.000Z"
}
```

---

### Service: `confirmRide`

#### Description

Confirms a ride request by a captain.

#### Endpoint

`POST /api/v1/rides/confirm-ride`

#### Request Body

| Field    | Type   | Required | Description         |
| -------- | ------ | -------- | ------------------- |
| `rideId` | String | Yes      | The ID of the ride. |

#### Example Request

```json
{
  "rideId": "64f1a2b3c4d5e6f7g8h9i0j2"
}
```

#### Example Response

```json
{
  "id": "64f1a2b3c4d5e6f7g8h9i0j2",
  "captain": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    }
  },
  "status": "accepted"
}
```

---

### Service: `startRide`

#### Description

Starts a ride after OTP verification.

#### Endpoint

`PUT /api/v1/rides/start-ride`

#### Request Body

| Field    | Type   | Required | Description           |
| -------- | ------ | -------- | --------------------- |
| `rideId` | String | Yes      | The ID of the ride.   |
| `otp`    | String | Yes      | The OTP for the ride. |

#### Example Request

```json
{
  "rideId": "64f1a2b3c4d5e6f7g8h9i0j2",
  "otp": "123456"
}
```

#### Example Response

```json
{
  "id": "64f1a2b3c4d5e6f7g8h9i0j2",
  "status": "ongoing"
}
```

---

### Service: `endRide`

#### Description

Ends an ongoing ride.

#### Endpoint

`PUT /api/v1/rides/end-ride`

#### Request Body

| Field    | Type   | Required | Description         |
| -------- | ------ | -------- | ------------------- |
| `rideId` | String | Yes      | The ID of the ride. |

#### Example Request

```json
{
  "rideId": "64f1a2b3c4d5e6f7g8h9i0j2"
}
```

#### Example Response

```json
{
  "id": "64f1a2b3c4d5e6f7g8h9i0j2",
  "status": "completed"
}
```

---

# Microservices Architecture Documentation

## Overview

The Rideo backend has been refactored into a **microservices architecture** to improve scalability, maintainability, and modularity. Each service is responsible for a specific domain and communicates with other services using **REST APIs**, **RabbitMQ** (for asynchronous communication), and **WebSockets** (for real-time updates).

---

## Architecture Diagram

```
+-------------------+       +-------------------+       +-------------------+       +-------------------+
|   User Service    |       | Captain Service   |       |   Ride Service    |       |    Map Service    |
|-------------------|       |-------------------|       |-------------------|       |-------------------|
| - User APIs       |       | - Captain APIs    |       | - Ride APIs       |       | - Map APIs        |
| - Auth Middleware |       | - Location Update|       | - Ride Matching   |       | - Geolocation     |
| - JWT Auth        |       | - Socket Updates |       | - Fare Calculation|       | - Distance Matrix |
+-------------------+       +-------------------+       +-------------------+       +-------------------+
        |                           |                           |                           |
        |                           |                           |                           |
        +---------------------------+---------------------------+---------------------------+
                                    | RabbitMQ (Event Bus) |
                                    +-----------------------+
                                            |
                                    +-----------------------+
                                    |       WebSocket       |
                                    +-----------------------+
```

---

## Microservices Overview

### Services

1. **User Service** (`http://localhost:3001`)
   - Handles user registration, login, and profile management.
2. **Captain Service** (`http://localhost:3002`)
   - Manages captain registration, login, location updates, and ride acceptance.
3. **Ride Service** (`http://localhost:3003`)
   - Handles ride creation, ride status updates, and fare calculations.
4. **Map Service** (`http://localhost:3004`)
   - Provides geolocation, distance, and route suggestions.

### Communication

- **Synchronous Communication**: REST APIs between services.
- **Asynchronous Communication**: RabbitMQ for event-driven communication.
- **Real-Time Communication**: WebSockets for live updates (e.g., location tracking, chat).

---

## RabbitMQ Events

### **1. Event: `rideCreated`**

- **Publisher**: Ride Service
- **Subscribers**: Captain Service
- **Payload**:
  ```json
  {
    "rideId": "ride-id",
    "pickup": "1600 Amphitheatre Parkway",
    "destination": "1 Infinite Loop",
    "vehicleType": "car",
    "fare": 150.75
  }
  ```

### **2. Event: `captainAcceptedRide`**

- **Publisher**: Captain Service
- **Subscribers**: Ride Service
- **Payload**:
  ```json
  {
    "rideId": "ride-id",
    "captainId": "captain-id",
    "status": "accepted"
  }
  ```

---

## WebSocket Events

### **1. Event: `join`**

- **Description**: Associates a user or captain with their socket ID.
- **Payload**:
  ```json
  {
    "userId": "user-id",
    "userType": "user"
  }
  ```

### **2. Event: `updateLocation`**

- **Description**: Updates the captain's location in real-time.
- **Payload**:
  ```json
  {
    "userId": "captain-id",
    "location": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716]
    }
  }
  ```

### **3. Event: `newRideRequest`**

- **Description**: Notifies captains of a new ride request.
- **Payload**:
  ```json
  {
    "rideId": "ride-id",
    "pickup": "1600 Amphitheatre Parkway",
    "destination": "1 Infinite Loop",
    "fare": 150.75
  }
  ```

---

## API Documentation for Microservices

### **User Service**

#### **1. Register User**

- **Method**: `POST`
- **Endpoint**: `/api/v1/users/register`
- **Description**: Registers a new user.
- **Request Body**:
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
- **Response**:
  ```json
  {
    "message": "User created successfully",
    "success": true,
    "token": "your-authentication-token"
  }
  ```

#### **2. Login User**

- **Method**: `POST`
- **Endpoint**: `/api/v1/users/login`
- **Description**: Authenticates a user and returns a JWT token.

---

### **Captain Service**

#### **1. Register Captain**

- **Method**: `POST`
- **Endpoint**: `/api/v1/captains/register`
- **Description**: Registers a new captain.
- **Request Body**:
  ```json
  {
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "securepassword123",
    "vehicle": {
      "type": "car",
      "licensePlate": "ABC123",
      "model": "Toyota Corolla",
      "color": "Blue",
      "capacity": 4
    }
  }
  ```

#### **2. Update Location**

- **Method**: `PUT`
- **Endpoint**: `/update-location/:userId`
- **Description**: Updates the captain's current location.

---

### **Ride Service**

#### **1. Create Ride**

- **Method**: `POST`
- **Endpoint**: `/api/v1/rides/create`
- **Description**: Creates a new ride request.
- **Request Body**:
  ```json
  {
    "pickup": "1600 Amphitheatre Parkway",
    "destination": "1 Infinite Loop",
    "vehicleType": "car"
  }
  ```

#### **2. Confirm Ride**

- **Method**: `POST`
- **Endpoint**: `/confirm-ride`
- **Description**: Confirms a ride request by a captain.

---

### **Map Service**

#### **1. Get Coordinates**

- **Method**: `GET`
- **Endpoint**: `/get-coordinate`
- **Description**: Fetches geographical coordinates for a given address.
- **Query Parameters**:
  - `address`: The address to fetch coordinates for.
- **Example Request**:
  ```
  GET /get-coordinate?address=1600+Amphitheatre+Parkway
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Coordinates fetched successfully",
    "data": {
      "lat": 37.422,
      "lng": -122.084
    }
  }
  ```

---

## Folder Structure for Microservices

### **User Service**

```
User/
├── .env
├── app.js
├── server.js
├── controllers/
│   └── user.controller.js
├── db/
│   └── conn.js
├── middleware/
├── models/
├── routes/
├── services/
```

### **Captain Service**

```
Captain/
├── .env
├── app.js
├── server.js
├── controllers/
│   └── captain.controller.js
├── db/
│   └── conn.js
├── middleware/
├── models/
├── routes/
├── services/
```

### **Ride Service**

```
Ride/
├── .env
├── app.js
├── server.js
├── controllers/
│   └── ride.controller.js
├── db/
│   └── conn.js
├── middleware/
├── models/
├── routes/
├── services/
```

### **Map Service**

```
Maps/
├── .env
├── app.js
├── server.js
├── controllers/
│   └── map.controller.js
├── middleware/
│   └── auth.middleware.js
├── routes/
├── services/
```

---

This documentation provides a **complete overview of the microservices architecture**, including APIs, RabbitMQ events, WebSocket events, and folder structure. Let me know if you need further details or examples!
