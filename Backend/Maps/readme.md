# Maps Service Documentation

The Maps Service is responsible for handling geolocation-related functionalities in the Rideo application. It provides APIs for fetching coordinates, calculating distances and travel times, and offering address suggestions.

---

## Overview

### Base URL

`http://localhost:3004/api/v1/maps`

### Responsibilities

- Fetching geographical coordinates for a given address.
- Calculating distances and estimated travel times between two locations.
- Providing autocomplete suggestions for addresses.
- Communicating with other services via RabbitMQ.

---

## API Endpoints

### **1. Get Coordinates**

- **Method**: `GET`
- **Endpoint**: `/get-coordinate`
- **Description**: Fetches geographical coordinates (latitude and longitude) for a given address.
- **Query Parameters**:
  - `address` (String, Required): The address to fetch coordinates for.
- **Example Request**:
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

### **2. Get Distance and Time**

- **Method**: `GET`
- **Endpoint**: `/get-distance-time`
- **Description**: Calculates the distance and estimated travel time between two locations.
- **Query Parameters**:
  - `origin` (String, Required): The starting location.
  - `destination` (String, Required): The destination location.
- **Example Request**:
  - `GET /api/v1/maps/get-distance-time?origin=New+York&destination=Boston`
- **Response**:

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

### **3. Get Address Suggestion**

- **Method**: `GET`
- **Endpoint**: `/get-suggestion`
- **Description**: Provides address suggestions based on the input.
- **Query Parameters**:
  - `input` (String, Required): The input text to get address suggestions for.
- **Example Request**:
  - `GET /api/v1/maps/get-suggestion?input=1600`
- **Response**:

```json
{
  "success": true,
  "message": "Suggestions fetched successfully",
  "data": [
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
}
```

### **4. Log User Location**

- **Method**: `POST`
- **Endpoint**: `/log-location`
- **Description**: Logs the user's location with a timestamp.
- **Request Body**:
  - `userId` (String, Required): The ID of the user.
  - `location` (Object, Required): The geographical coordinates of the user.
    - `lat` (Number, Required): The latitude of the location.
    - `lng` (Number, Required): The longitude of the location.
  - `timestamp` (String, Required): The timestamp of the location log.
- **Example Request**:
  - `POST /api/v1/maps/log-location`
- **Request Body**:

```json
{
  "userId": "user-id",
  "location": {
    "lat": 37.422,
    "lng": -122.084
  },
  "timestamp": "2023-10-01T12:00:00.000Z"
}
```

## Project Structure

Maps/
├── .env
├── [app.js](http://_vscodecontentref_/1)
├── [server.js](http://_vscodecontentref_/2)
├── controllers/
│ └── map.controller.js
├── middleware/
│ └── auth.middleware.js
├── routes/
│ └── map.routes.js
├── services/
│ ├── map.service.js
│ ├── rabbit.js
