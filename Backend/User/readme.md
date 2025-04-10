# User Service Documentation

The User Service is responsible for managing users in the Rideo application. It handles user registration, login, profile management, and authentication.

---

## Overview

### Base URL

`http://localhost:3001/api/v1/users`

### Responsibilities

- User registration and authentication.
- Managing user profiles.
- JWT-based authentication for secure access.
- Communicating with other services via RabbitMQ.

---

## API Endpoints

### **1. Register User**

- **Method**: `POST`
- **Endpoint**: `/register`
- **Description**: Registers a new user in the system.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Body**:
  ```json
  {
    "message": "User created successfully",
    "success": true,
    "token": "your-authentication-token"
  }
  ```

### **2. Login User**

- **Method**: `POST`
- **Endpoint**: `/login`
- **Description**: Authenticates a user and returns a token.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }
  ```
- **Response Body**:
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
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

### **3. Get User Profile**

- **Method**: `GET`
- **Endpoint**: `/profile`
- **Description**: Retrieves the profile of the authenticated user.
- **Response Body**:
  ```json
  {
    "success": true,
    "message": "User profile",
    "user": {
      "userId": "user-id",
      "email": "john.doe@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  }
  ```
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

### **4. Logout User**

- **Method**: `POST`
- **Endpoint**: `/logout`
- **Description**: Logs out the authenticated user.
- **Response Body**:
  ```json
  {
    "success": true,
    "message": "Logout successfully"
  }
  ```
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

import { protect } from "../middleware/auth.middleware.js";

router.get("/profile", protect, profile);

User/
├── .env
├── [app.js](http://_vscodecontentref_/1)
├── [server.js](http://_vscodecontentref_/2)
├── controllers/
│ └── user.controller.js
├── db/
│ └── conn.js
├── middleware/
│ └── auth.middleware.js
├── models/
│ ├── blacklist.model.js
│ └── user.model.js
├── routes/
│ └── user.routes.js
├── services/
│ ├── rabbit.js
│ ├── user.service.js
│ └── worker.service.js
