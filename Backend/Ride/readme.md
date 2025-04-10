# Ride Service Documentation

The Ride Service is responsible for managing ride-related functionalities in the Rideo application. It handles ride creation, ride status updates, fare calculations, and communication with other services.

---

## Overview

### Base URL

`http://localhost:3003/api/v1/rides`

### Responsibilities

- Creating new ride requests.
- Managing ride statuses (e.g., pending, accepted, ongoing, completed).
- Calculating fares and distances.
- Communicating with other services via RabbitMQ and WebSockets.

---

## API Endpoints

### **1. Create Ride**

- **Method**: `POST`
- **Endpoint**: `/create`
- **Description**: Creates a new ride request.
- **Request Body**:
  ```json
  {
    "rideId": "ride-id",
    "pickup": "1600 Amphitheatre Parkway",
    "destination": "1 Infinite Loop",
    "fare": 150.75
  }
  ```

### **2. Update Ride Status**

- **Method**: `PATCH`
- **Endpoint**: `/update-status`
- **Description**: Updates the status of an existing ride.
- **Request Body**:
  ```json
  {
    "rideId": "ride-id",
    "captain": {
      "id": "captain-id",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Doe"
      }
    },
    "status": "accepted"
  }
  ```
  ```json
  {
    "rideId": "ride-id",
    "status": "ongoing"
  }
  ```
  ```json
  {
    "rideId": "ride-id",
    "status": "completed"
  }
  ```

## Project Structure

Ride/
├── .env
├── [app.js](http://_vscodecontentref_/1)
├── [server.js](http://_vscodecontentref_/2)
├── controllers/
│   └── ride.controller.js
├── db/
│   └── conn.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   └── ride.model.js
├── routes/
│   └── ride.routes.js
├── services/
│   ├── rabbit.js
│   ├── ride.service.js
