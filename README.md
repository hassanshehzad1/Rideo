Rideo is a ride-sharing app where users can book rides by selecting their pickup, destination, and vehicle type, while captains can accept and manage ride requests. The app uses a microservices setup to handle different functionalities, ensuring scalability. Real-time features like ride notifications and location updates are powered by WebSockets, and RabbitMQ handles asynchronous events like ride creation.

Frontend: Built with React + Vite, styled with Tailwind CSS, and animated with GSAP.
Backend: Node.js with Express, MongoDB for data storage, and JWT for authentication.
Communication: REST APIs, RabbitMQ for events, and Socket.IO for real-time updates.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Rideo Frontend Documentation

## Overview

Rideo is a MERN stack application that provides a platform for users and captains to register, log in, and manage their accounts. This documentation provides a detailed overview of the frontend components, their functionality, and usage.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [User Components](#user-components)
   - [User Registration](#user-registration)
   - [User Login](#user-login)
   - [User Home](#user-home)
   - [User Logout](#user-logout)
3. [Captain Components](#captain-components)
   - [Captain Registration](#captain-registration)
   - [Captain Login](#captain-login)
   - [Captain Home](#captain-home)
   - [Captain Logout](#captain-logout)
4. [Protect Wrappers](#protect-wrappers)
5. [Context Management](#context-management)
6. [Development](#development)
7. [Form Examples and API Responses](#form-examples-and-api-responses)
8. [Additional Components and Pages](#additional-components-and-pages)

---

## Project Structure

- **Entry Point**: `src/main.jsx`
- **Routing**: Handled using `react-router-dom`.
- **Context**: `UserContext` and `CaptainContext` are used for managing user and captain-related states.

---

## User Components

### User Registration

- **File**: `src/pages/UserSign.jsx`
- **Description**: Allows users to register by providing their first name, last name, email, and password.
- **Validation**:
  - First Name: Required, minimum 2 characters.
  - Last Name: Required, minimum 2 characters.
  - Email: Required, must be a valid email format.
  - Password: Required, minimum 8 characters.
- **API Endpoint**: `POST /api/v1/users/register`
- **Post-Action**:
  - Stores user data and token in local storage.
  - Redirects to the user home page.

### User Login

- **File**: `src/pages/UserLogin.jsx`
- **Description**: Allows users to log in using their email and password.
- **Validation**:
  - Email: Required, must be a valid email format.
  - Password: Required, minimum 8 characters.
- **API Endpoint**: `POST /api/v1/users/login`
- **Post-Action**:
  - Stores user data and token in local storage.
  - Redirects to the user home page.

### User Home

- **File**: `src/pages/Home.jsx`
- **Description**: Displays the user dashboard after successful login.

### User Logout

- **File**: `src/pages/UserLogout.jsx`
- **Description**: Logs out the user by clearing local storage and context data.
- **API Endpoint**: `GET /api/v1/users/logout`
- **Post-Action**:
  - Clears user data and token from local storage.
  - Redirects to the user login page.

---

### User Home Page

The User Home page is the main interface for users to find and book rides. It integrates multiple components to provide a seamless experience.

#### Components Overview

1. **LocationSearchPanel**:

   - **File**: `src/components/LocationSearchPanel.jsx`
   - **Description**: Allows users to select a pickup location and destination.
   - **Example Usage**:
     ```jsx
     <LocationSearchPanel
       setPanelOpen={setPanelOpen}
       setVehiclePanel={setVehiclePanel}
     />
     ```

2. **VehicleSuggest**:

   - **File**: `src/components/VehicleSuggest.jsx`
   - **Description**: Displays a list of available vehicles with details like type, capacity, and estimated fare.
   - **Example Usage**:
     ```jsx
     <VehicleSuggest
       setConfirmPanel={setConfirmPanel}
       setVehiclePanel={setVehiclePanel}
     />
     ```

3. **ConfirmPanel**:

   - **File**: `src/components/ConfirmPanel.jsx`
   - **Description**: Allows users to confirm their ride selection.
   - **Example Usage**:
     ```jsx
     <ConfirmPanel
       setConfirmPanel={setConfirmPanel}
       setVehicleFound={setVehicleFound}
     />
     ```

4. **DriverLook**:

   - **File**: `src/components/DriverLook.jsx`
   - **Description**: Displays driver and vehicle details after a ride is confirmed.
   - **Example Usage**:
     ```jsx
     <DriverLook setVehicleFound={setVehicleFound} />
     ```

5. **WaitDriver**:
   - **File**: `src/components/WaitDriver.jsx`
   - **Description**: Indicates the waiting status for the driver to arrive.
   - **Example Usage**:
     ```jsx
     <WaitDriver setWaitDriver={setWaitDriver} />
     ```

#### Example Integration in `Home.jsx`

The following example demonstrates how these components are integrated into the `Home` page:

```jsx
// filepath: src/pages/Home.jsx
import React, { useState, useRef } from "react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehicleSuggest from "../components/VehicleSuggest";
import ConfirmPanel from "../components/ConfirmPanel";
import DriverLook from "../components/DriverLook";
import WaitDriver from "../components/WaitDriver";

const Home = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmPanel, setConfirmPanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitDriver, setWaitDriver] = useState(false);

  return (
    <div className="h-screen relative">
      <LocationSearchPanel
        setPanelOpen={setPanelOpen}
        setVehiclePanel={setVehiclePanel}
      />
      <VehicleSuggest
        setConfirmPanel={setConfirmPanel}
        setVehiclePanel={setVehiclePanel}
      />
      <ConfirmPanel
        setConfirmPanel={setConfirmPanel}
        setVehicleFound={setVehicleFound}
      />
      <DriverLook setVehicleFound={setVehicleFound} />
      <WaitDriver setWaitDriver={setWaitDriver} />
    </div>
  );
};

export default Home;
```

#### Notes

- **GSAP Animations**: The `Home` page uses GSAP animations to handle smooth transitions between panels.
- **Form Handling**: The `react-hook-form` library is used for managing form inputs for pickup location and destination.
- **Styling**: Tailwind CSS is used for styling all components.

---

## Captain Components

### Captain Registration

- **File**: `src/pages/CaptainSign.jsx`
- **Description**: Allows captains to register by providing personal and vehicle details.
- **Validation**:
  - First Name: Required, minimum 2 characters.
  - Last Name: Required, minimum 2 characters.
  - Email: Required, must be a valid email format.
  - Password: Required, minimum 8 characters.
  - Vehicle Details: Required fields include type, license plate, model, color, and capacity.
- **API Endpoint**: `POST /api/v1/captains/register`
- **Post-Action**:
  - Stores captain data and token in local storage.
  - Redirects to the captain home page.

### Captain Login

- **File**: `src/pages/CaptainLogin.jsx`
- **Description**: Allows captains to log in using their email and password.
- **Validation**:
  - Email: Required, must be a valid email format.
  - Password: Required, minimum 8 characters.
- **API Endpoint**: `POST /api/v1/captains/login`
- **Post-Action**:
  - Stores captain data and token in local storage.
  - Redirects to the captain home page.

### Captain Home

- **File**: `src/pages/CaptainsHome.jsx`
- **Description**: Displays the captain dashboard after successful login.

### Captain Logout

- **File**: `src/pages/CaptainLogout.jsx`
- **Description**: Logs out the captain by clearing local storage and context data.
- **API Endpoint**: `GET /api/v1/captains/logout`
- **Post-Action**:
  - Clears captain data and token from local storage.
  - Redirects to the captain login page.

---

## Protect Wrappers

### UserProtectWrapper

- **File**: `src/protect/UserProtectWrapper.jsx`
- **Description**: Ensures that only authenticated users can access protected routes.
- **Redirect**: Redirects unauthenticated users to the login page.

### CaptainProtectWrapper

- **File**: `src/protect/CaptainProtectWrapper.jsx`
- **Description**: Ensures that only authenticated captains can access protected routes.
- **Redirect**: Redirects unauthenticated captains to the login page.

---

## Context Management

### UserContext

- **File**: `src/context/UserContext.jsx`
- **Description**: Manages user-related state, including user data and authentication status.

### CaptainContext

- **File**: `src/context/CaptainContext.jsx`
- **Description**: Manages captain-related state, including captain data and authentication status.

---

## Development

### Start Development Server

```bash
npm start
```

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

---

## Form Examples and API Responses

### User Registration Form Example

**Request:**

```json
POST /api/v1/users/register
Content-Type: application/json

{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "12345",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "jwt-token-here"
}
```

---

### User Login Form Example

**Request:**

```json
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "12345",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "jwt-token-here"
}
```

---

### Captain Registration Form Example

**Request:**

```json
POST /api/v1/captains/register
Content-Type: application/json

{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securepassword",
  "vehicle": {
    "type": "car",
    "licensePlate": "ABC123",
    "model": "Toyota Corolla",
    "color": "Blue",
    "capacity": 4
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "Captain registered successfully",
  "captain": {
    "id": "67890",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "type": "car",
      "licensePlate": "ABC123",
      "model": "Toyota Corolla",
      "color": "Blue",
      "capacity": 4
    }
  },
  "token": "jwt-token-here"
}
```

---

### Captain Login Form Example

**Request:**

```json
POST /api/v1/captains/login
Content-Type: application/json

{
  "email": "jane.smith@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "captain": {
    "id": "67890",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "type": "car",
      "licensePlate": "ABC123",
      "model": "Toyota Corolla",
      "color": "Blue",
      "capacity": 4
    }
  },
  "token": "jwt-token-here"
}
```

---

### Notes on API Responses

- **Success Field**: Indicates whether the operation was successful.
- **Message Field**: Provides a human-readable message about the operation.
- **Token Field**: Contains the JWT token for authentication.
- **User/Captain Object**: Contains details about the authenticated or registered user/captain.

---

## Notes

- Ensure that the backend API endpoints are correctly configured in the `.env` file.
- Use `localStorage` for token and user/captain data management.
- Tailwind CSS is used for styling components.

---

## Additional Components and Pages

### Components

#### ConfirmPanel

- **File**: `src/components/ConfirmPanel.jsx`
- **Description**: Allows users to confirm their ride by displaying details such as pickup location, destination, and fare.
- **Props**:
  - `routes`: Object containing `pickupLocation` and `destination`.
  - `vehicleType`: Selected vehicle type.
  - `fare`: Fare details for the selected vehicle type.
  - `createRide`: Function to create a ride.
- **Example Usage**:
  ```jsx
  <ConfirmPanel
    routes={{ pickupLocation: "Location A", destination: "Location B" }}
    vehicleType="car"
    fare={{ car: 500 }}
    createRide={createRide}
  />
  ```

---

#### ConfirmPopup

- **File**: `src/components/ConfirmPopup.jsx`
- **Description**: Displays a popup for captains to confirm a ride by entering an OTP.
- **Props**:
  - `ride`: Ride details.
  - `setConfirmPopupPanel`: Function to toggle the popup visibility.
- **Example Usage**:
  ```jsx
  <ConfirmPopup ride={ride} setConfirmPopupPanel={setConfirmPopupPanel} />
  ```

---

#### DriverLook

- **File**: `src/components/DriverLook.jsx`
- **Description**: Displays driver and ride details after a ride is confirmed.
- **Props**:
  - `ride`: Ride details.
  - `setVehicleFound`: Function to toggle the visibility of the driver details panel.
- **Example Usage**:
  ```jsx
  <DriverLook ride={ride} setVehicleFound={setVehicleFound} />
  ```

---

#### LocationSearchPanel

- **File**: `src/components/LocationSearchPanel.jsx`
- **Description**: Provides a list of location suggestions for pickup and destination.
- **Props**:
  - `suggestions`: Array of location suggestions.
  - `onSuggestionSelect`: Callback for selecting a suggestion.
- **Example Usage**:
  ```jsx
  <LocationSearchPanel
    suggestions={suggestions}
    onSuggestionSelect={handleSuggestionSelect}
  />
  ```

---

#### RidePopup

- **File**: `src/components/RidePopup.jsx`
- **Description**: Displays a popup with new ride requests for captains to accept or decline.
- **Props**:
  - `ride`: Ride details.
  - `confirmRide`: Function to confirm the ride.
  - `setPopupPanel`: Function to toggle the popup visibility.
- **Example Usage**:
  ```jsx
  <RidePopup
    ride={ride}
    confirmRide={confirmRide}
    setPopupPanel={setPopupPanel}
  />
  ```

---

#### VehicleSuggest

- **File**: `src/components/VehicleSuggest.jsx`
- **Description**: Displays a list of available vehicles with their fares and details.
- **Props**:
  - `fare`: Object containing fare details for different vehicle types.
  - `setVehicleType`: Function to set the selected vehicle type.
  - `setConfirmPanel`: Function to toggle the confirm panel visibility.
- **Example Usage**:
  ```jsx
  <VehicleSuggest
    fare={{ car: 500, bike: 200, auto: 300 }}
    setVehicleType={setVehicleType}
    setConfirmPanel={setConfirmPanel}
  />
  ```

---

#### WaitDriver

- **File**: `src/components/WaitDriver.jsx`
- **Description**: Displays the waiting status for the driver to arrive.
- **Props**:
  - `ride`: Ride details.
  - `setWaitDriver`: Function to toggle the visibility of the waiting panel.
- **Example Usage**:
  ```jsx
  <WaitDriver ride={ride} setWaitDriver={setWaitDriver} />
  ```

---

### Pages

#### CaptainRiding

- **File**: `src/pages/CaptainRiding.jsx`
- **Description**: Displays ongoing ride details for captains, including distance and a button to complete the ride.
- **Components**:
  - **FinishPanel**: Allows captains to mark the ride as completed.
- **Example Usage**:
  ```jsx
  <CaptainRiding />
  ```

---

#### CaptainsDetails

- **File**: `src/pages/CaptainsDetails.jsx`
- **Description**: Displays captain details such as name, earnings, vehicle type, and status.
- **Example Usage**:
  ```jsx
  <CaptainsDetails />
  ```

---

#### CaptainsHome

- **File**: `src/pages/CaptainsHome.jsx`
- **Description**: Displays the captain dashboard with ride requests and earnings.
- **Components**:
  - **CaptainsDetails**: Displays captain's details and earnings.
  - **RidePopup**: Displays new ride requests.
  - **ConfirmPopup**: Confirms the ride after acceptance.
- **Example Usage**:
  ```jsx
  <CaptainsHome />
  ```

---

#### FinishPanel

- **File**: `src/pages/FinishPanel.jsx`
- **Description**: Allows captains to mark a ride as completed.
- **Props**:
  - `ride`: Ride details.
  - `setFinishPanel`: Function to toggle the finish panel visibility.
- **Example Usage**:
  ```jsx
  <FinishPanel ride={ride} setFinishPanel={setFinishPanel} />
  ```

---

#### Home

- **File**: `src/pages/Home.jsx`
- **Description**: Displays the user dashboard for finding and booking rides.
- **Components**:
  - **LocationSearchPanel**: Handles location suggestions and selection.
  - **VehicleSuggest**: Displays available vehicles and their fares.
  - **ConfirmPanel**: Allows users to confirm their ride.
  - **DriverLook**: Displays driver and vehicle details after ride confirmation.
  - **WaitDriver**: Shows the waiting status for the driver.
- **Example Usage**:
  ```jsx
  <Home />
  ```

---

#### Riding

- **File**: `src/pages/Riding.jsx`
- **Description**: Displays ongoing ride details for users, including driver information and fare.
- **Example Usage**:
  ```jsx
  <Riding />
  ```

---

#### UserLogin

- **File**: `src/pages/UserLogin.jsx`
- **Description**: Allows users to log in using their email and password.
- **Validation**:
  - Email: Required, must be a valid email format.
  - Password: Required, minimum 8 characters.
- **Example Usage**:
  ```jsx
  <UserLogin />
  ```

---

### Contexts

#### CaptainContext

- **File**: `src/context/CaptainContext.jsx`
- **Description**: Manages captain-related state, including captain data and authentication status.
- **Example Usage**:
  ```jsx
  <CaptainContext>
    <App />
  </CaptainContext>
  ```

---

#### SocketContext

- **File**: `src/context/SocketContext.jsx`
- **Description**: Manages socket connections for real-time updates.
- **Example Usage**:
  ```jsx
  <SocketProvider>
    <App />
  </SocketProvider>
  ```

---

#### UserContext

- **File**: `src/context/UserContext.jsx`
- **Description**: Manages user-related state, including user data and authentication status.
- **Example Usage**:
  ```jsx
  <UserContext>
    <App />
  </UserContext>
  ```
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
Instant notifications for ride requests, confirmations, and status changes.
Microservices:
Separate services for User, Captain, Ride, and Map functionalities.
Event-driven communication with RabbitMQ.
📂 Project Structure
Here’s how the project is organized:



 



 
Rideo/
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components (e.g., LocationSearchPanel.jsx)
│   │   ├── pages/             # Page components (e.g., Home.jsx, CaptainsHome.jsx)
│   │   ├── con/           # State management (UserCon, CaptainCon)
│   │   ├── protect/           # Route protection (UserProtectper.jsx)
│   │   └── main.jsx           # Entry point
├── backend/
│   ├── User/                  # User Service (port: 3001)
│   ├── Captain/               # Captain Service (port: 3002)
│   ├── Ride/                  # Ride Service (port: 3003)
│   ├── Maps/                  # Map Service (port: 3004)
│   ├── Socket/                # WebSocket server (port: 3000)
├── .env                       # Environment variables
└── README.md                  # You're reading this!
🏗️ Microservices Architecture
Rideo uses a microservices setup to handle different parts of the app independently. Here’s a quick look:

Services
User Service (http://localhost:3001): Manages user registration, login, and profiles.
Captain Service (http://localhost:3002): Handles captain registration, location updates, and ride acceptance.
Ride Service (http://localhost:3003): Manages ride creation, fare calculation, and status updates.
Map Service (http://localhost:3004): Provides geolocation, distance, and route suggestions.
Socket Server (http://localhost:3000): Powers real-time communication with WebSockets.
Communication
REST APIs: For direct service-to-service calls (e.g., fetching user profile).
RabbitMQ: For async events (e.g., notifying captains of new rides).
WebSockets: For real-time updates (e.g., ride confirmation notifications).
🖥️ Frontend Overview
The frontend is built with React and Vite, offering a fast development experience with Hot Module Replacement (HMR). We use Tailwind CSS for styling, GSAP for animations, and React Hook Form for form handling.

Key Pages
User Home (Home.jsx): Where users book rides.
Captain Home (CaptainsHome.jsx): Where captains manage ride requests.
Riding (Riding.jsx): Shows ongoing ride details for users.
Key Components
Below are the main components used in the user flow, with examples for each.

Example: Using LocationSearchPanel Component
This component lets users select their pickup and destination locations.

jsx

 



 
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home  () > {
  const [panelOpen, setPanelOpen]  useState(false);
  const [vehiclePanel, setVehiclePanel]  useState(false);

  return (
    <div>
      <LocationSearchPanel
        setPanelOpen{setPanelOpen}
        setVehiclePanel{setVehiclePanel}
      />
    </div>
  );
};
Output: A panel where users can type "123 Main St" as pickup and "456 Park Ave" as destination.

Example: Using VehicleSuggest Component
This component shows available vehicles with fares and lets users select one.

jsx

 



 
import VehicleSuggest from "../components/VehicleSuggest";

const Home  () > {
  const [confirmPanel, setConfirmPanel]  useState(false);
  const [vehiclePanel, setVehiclePanel]  useState(false);

  return (
    <div>
      <VehicleSuggest
        setConfirmPanel{setConfirmPanel}
        setVehiclePanel{setVehiclePanel}
      />
    </div>
  );
};
Output: A list showing "UberGo (4 seats, PKR 463)", "Moto (1 seat, PKR 233)", and "Auto (3 seats, PKR 303)".

Example: Using ConfirmPanel Component
This component lets users confirm their ride after selecting a vehicle.

jsx

 



 
import ConfirmPanel from "../components/ConfirmPanel";

const Home  () > {
  const [confirmPanel, setConfirmPanel]  useState(false);
  const [vehicleFound, setVehicleFound]  useState(false);

  const createRide  async () > {
    // Logic to create a ride
  };

  return (
    <div>
      <ConfirmPanel
        routes{{ pickupLocation: "123 Main St", destination: "456 Park Ave" }}
        vehicleType"car"
        fare{{ car: 463 }}
        createRide{createRide}
        setConfirmPanel{setConfirmPanel}
        setVehicleFound{setVehicleFound}
      />
    </div>
  );
};
Output: A panel showing ride details (pickup, destination, fare) with a "Confirm Ride" button.

Example: Using DriverLook Component
This component shows driver details after the ride is confirmed.

jsx

 



 
import DriverLook from "../components/DriverLook";

const Home  () > {
  const [vehicleFound, setVehicleFound]  useState(true);
  const ride  {
    captain: { fullName: { firstName: "Jane", lastName: "Doe" } },
    vehicleType: "car",
  };

  return (
    <div>
      <DriverLook ride{ride} setVehicleFound{setVehicleFound} />
    </div>
  );
};
Output: A panel showing "Driver: Jane Doe, Vehicle: Car".

Example: Using WaitDriver Component
This component shows a waiting status while the driver arrives.

jsx

 



 
import WaitDriver from "../components/WaitDriver";

const Home  () > {
  const [waitDriver, setWaitDriver]  useState(true);
  const ride  { id: "64f1a2b3c4d5e6f7g8h9i0j2" };

  return (
    <div>
      <WaitDriver ride{ride} setWaitDriver{setWaitDriver} />
    </div>
  );
};
Output: A message like "Waiting for your driver to arrive...".

⚙️ Backend Overview
The backend is split into microservices, each running on a different port. We use Node.js with Express for APIs, MongoDB for data storage, and Mongoose for schema modeling. Authentication is handled with JWT, and real-time updates use Socket.IO.

Key Endpoints and Events
Below are examples for each key API, RabbitMQ event, and WebSocket event.

Example: User Registration API
This endpoint registers a new user.

bash

 



 
curl -X POST http://localhost:3001/api/v1/users/register \
-H "Content-Type: application/json" \
-d '{"fullName": {"firstName": "John", "lastName": "Doe"}, "email": "john@example.com", "password": "securepassword123"}'
Response:

json

 



 
{
  "message": "User created successfully",
  "success": true,
  "token": "your_jwt_token"
}
Example: Captain Registration API
This endpoint registers a new captain with vehicle details.

bash

 



 
curl -X POST http://localhost:3002/api/v1/captains/register \
-H "Content-Type: application/json" \
-d '{"fullName": {"firstName": "Jane", "lastName": "Doe"}, "email": "jane@example.com", "password": "securepassword123", "vehicle": {"type": "car", "licensePlate": "ABC123", "model": "Toyota Corolla", "color": "Blue", "capacity": 4}}'
Response:

json

 



 
{
  "message": "Captain registered successfully",
  "success": true,
  "token": "your_jwt_token"
}
Example: Create Ride API
This endpoint creates a new ride request.

bash

 



 
curl -X POST http://localhost:3003/api/v1/rides/create \
-H "Authorization: Bearer your_jwt_token" \
-H "Content-Type: application/json" \
-d '{"pickup": "123 Main St", "destination": "456 Park Ave", "vehicleType": "car"}'
Response:

json

 



 
{
  "user": "64f1a2b3c4d5e6f7g8h9i0j1",
  "pickup": "123 Main St",
  "destination": "456 Park Ave",
  "fare": 150.75,
  "otp": "123456",
  "status": "pending",
  "_id": "64f1a2b3c4d5e6f7g8h9i0j2"
}
Example: Confirm Ride API
This endpoint lets a captain confirm a ride.

bash

 



 
curl -X POST http://localhost:3003/api/v1/rides/confirm-ride \
-H "Authorization: Bearer captain_jwt_token" \
-H "Content-Type: application/json" \
-d '{"rideId": "64f1a2b3c4d5e6f7g8h9i0j2"}'
Response:

json

 



 
{
  "id": "64f1a2b3c4d5e6f7g8h9i0j2",
  "captain": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "fullName": { "firstName": "Jane", "lastName": "Doe" }
  },
  "status": "accepted"
}
Example: Get Coordinates API
This endpoint fetches coordinates for an address.

bash

 



 
curl -X GET "http://localhost:3004/api/v1/maps/get-coordinate?address123+Main+St" \
-H "Authorization: Bearer your_jwt_token"
Response:

json

 



 
{
  "success": true,
  "message": "Coordinates fetched successfully",
  "data": {
    "lat": 37.422,
    "lng": -122.084
  }
}
Example: RabbitMQ Event (rideCreated)
This event is published when a new ride is created.

json

 



 
{
  "rideId": "64f1a2b3c4d5e6f7g8h9i0j2",
  "pickup": "123 Main St",
  "destination": "456 Park Ave",
  "vehicleType": "car",
  "fare": 150.75
}
Usage: The Captain Service subscribes to this event and notifies nearby captains.

Example: WebSocket Event (newRideRequest)
This event notifies captains of a new ride request.

json

 



 
{
  "event": "newRideRequest",
  "ride": {
    "rideId": "64f1a2b3c4d5e6f7g8h9i0j2",
    "pickup": "123 Main St",
    "destination": "456 Park Ave",
    "fare": 150.75
  }
}
Usage: Captains see this in the RidePopup component and can accept the ride.

🛠️ Setup Instructions
Let’s get Rideo running on your machine!

Prerequisites
Node.js (v16 or higher)
MongoDB (local or Atlas)
RabbitMQ (local or CloudAMQP)
JazzCash API keys (for payments in Pakistan)
1. Clone the Repository
bash

 



 
git clone <repository-url>
cd Rideo
2. Setup Environment Variables
Create .env files in each directory:

Frontend (frontend/.env):


 



 
VITE_BACKEND_URLhttp://localhost:3001
User Service (backend/User/.env):


 



 
PORT3001
MONGO_URImongodb://localhost:27017/user_db
JWT_SECRETyour_jwt_secret
Captain Service (backend/Captain/.env):


 



 
PORT3002
MONGO_URImongodb://localhost:27017/captain_db
JWT_SECRETyour_jwt_secret
Ride Service (backend/Ride/.env):


 



 
PORT3003
MONGO_URImongodb://localhost:27017/ride_db
RABBIT_URLamqp://localhost
JWT_SECRETyour_jwt_secret
Map Service (backend/Maps/.env):


 



 
PORT3004
GOOGLE_MAPS_API_KEYyour_google_maps_api_key
3. Install Dependencies
For the frontend:
bash

 



 
cd frontend
npm install
For each backend service:
bash

 



 
cd backend/User
npm install
cd ../Captain
npm install
cd ../Ride
npm install
cd ../Maps
npm install
cd ../Socket
npm install
4. Start the Services
Ensure MongoDB and RabbitMQ are running.
Start each service in a separate terminal:
bash

 



 
# Frontend
cd frontend
npm run dev

# User Service
cd backend/User
npm start

# Captain Service
cd backend/Captain
npm start

# Ride Service
cd backend/Ride
npm start

# Map Service
cd backend/Maps
npm start

# Socket Server
cd backend/Socket
npm start
5. Access the App
Frontend: http://localhost:5173
User Service: http://localhost:3001
Captain Service: http://localhost:3002
Ride Service: http://localhost:3003
Map Service: http://localhost:3004
💡 Development Tips
Frontend:
Start the dev server:
bash

 



cd frontend
npm run dev
Build for production:
bash






npm run build
Add TypeScript for better type safety (use the Vite TS template).
Backend:
Start each service:
bash

 



cd backend/<Service>
npm start
Test APIs with Postman or curl.
Payments:
Use JazzCash for Pakistan. For testing, you can integrate Stripe (requires a US-based company setup).
Debugging:
Check logs in each service for errors.
Ensure RabbitMQ and MongoDB are running.
