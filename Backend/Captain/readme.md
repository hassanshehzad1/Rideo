# Captain Service Documentation

The Captain Service is responsible for managing captains in the Rideo application. It handles captain registration, login, location updates, ride acceptance, and profile management.

---

## Overview

### Base URL

`http://localhost:3002/api/v1/captains`

### Responsibilities

- Captain registration and authentication.
- Managing captain profiles.
- Updating captain locations in real-time.
- Accepting ride requests.
- Communicating with other services via RabbitMQ and WebSockets.

---

## API Endpoints

### **1. Register Captain**

- **Method**: `POST`
- **Endpoint**: `/register`
- **Description**: Registers a new captain in the system.
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
- **Response**:
  ```json
  {
    "message": "Captain registered successfully",
    "success": true,
    "token": "your-authentication-token"
  }
  ```

### **2. Login Captain**

- **Method**: `POST`
- **Endpoint**: `/login`
- **Description**: Authenticates a captain and returns a token.
- **Request Body**:
  ```json
  {
    "email": "jane.doe@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Captain logged in successfully",
    "success": true,
    "token": "your-authentication-token",
    "captain": {
      "id": "captain-id",
      "email": "jane.doe@example.com",
      "fullName": {
        "firstName": "Jane",
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

### **3. Update Location**

- **Method**: `POST`
- **Endpoint**: `/update-location`
- **Description**: Updates the location of a captain.
- **Request Body**:
  ```json
  {
    "location": {
      "type": "Point",
      "coordinates": [77.5946, 12.9716]
    }
  }
  ```
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Location updated successfully",
    "success": true
  }
  ```

### **4. Get Captain Profile**

- **Method**: `GET`
- **Endpoint**: `/profile`
- **Description**: Retrieves the profile of the authenticated captain.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Captain profile",
    "captain": {
      "id": "captain-id",
      "email": "jane.doe@example.com",
      "fullName": {
        "firstName": "Jane",
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

### **5. Logout Captain**

- **Method**: `POST`
- **Endpoint**: `/logout`
- **Description**: Logs out the authenticated captain.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logout successfully"
  }
  ```

---

## Project Structure

Captain/
├── .env
├── [app.js](http://_vscodecontentref_/1)
├── [server.js](http://_vscodecontentref_/2)
├── controllers/
│ └── captain.controller.js
├── db/
│ └── conn.js
├── middleware/
│ └── auth.middleware.js
├── models/
│ ├── blacklist.model.js
│ └── captain.model.js
├── routes/
│ └── captain.routes.js
├── services/
│ ├── captain.service.js
│ ├── rabbit.js
│ ├── [server.js](http://_vscodecontentref_/3)
│ └── worker.service.js
