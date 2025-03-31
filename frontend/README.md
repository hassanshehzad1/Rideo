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

# Captain Frontend Documentation

This section provides a comprehensive guide to the Captain's frontend in the Rideo application. It includes examples, API responses, and a detailed explanation of how each component and page works.

---

## Overview

The Captain's frontend is designed to allow captains to register, log in, manage rides, and view their earnings. It integrates multiple components and uses `react-router-dom` for navigation, `react-hook-form` for form handling, and `GSAP` for animations.

---

## Table of Contents

1. [Captain Components](#captain-components)
   - [ConfirmPanel](#confirmpanel)
   - [ConfirmPopup](#confirmpopup)
   - [RidePopup](#ridepopup)
   - [FinishPanel](#finishpanel)
2. [Captain Pages](#captain-pages)
   - [Captain Registration](#captain-registration)
   - [Captain Login](#captain-login)
   - [Captain Home](#captain-home)
   - [Captain Riding](#captain-riding)
   - [Captain Logout](#captain-logout)
3. [API Examples and Responses](#api-examples-and-responses)
4. [How It Works](#how-it-works)
5. [Screenshots and UI Examples](#screenshots-and-ui-examples)

---

## Captain Components

### ConfirmPanel

- **File**: `src/components/ConfirmPanel.jsx`
- **Description**: Allows users to confirm their ride selection.
- **Props**:
  - `setConfirmPanel`: Function to toggle the panel visibility.
  - `setVehicleFound`: Function to indicate that a vehicle has been found.
- **Example Usage**:
  ```jsx
  <ConfirmPanel
    setConfirmPanel={setConfirmPanel}
    setVehicleFound={setVehicleFound}
  />
  ```

---

### ConfirmPopup

- **File**: `src/components/ConfirmPopup.jsx`
- **Description**: Displays a popup for captains to confirm a ride.
- **Props**:
  - `setConfirmPopupPanel`: Function to toggle the popup visibility.
- **Example Usage**:
  ```jsx
  <ConfirmPopup setConfirmPopupPanel={setConfirmPopupPanel} />
  ```

---

### RidePopup

- **File**: `src/components/RidePopup.jsx`
- **Description**: Displays a popup with new ride requests for captains to accept or decline.
- **Props**:
  - `setPopupPanel`: Function to toggle the popup visibility.
  - `setConfirmPopupPanel`: Function to toggle the confirm popup visibility.
- **Example Usage**:
  ```jsx
  <RidePopup
    setPopupPanel={setPopupPanel}
    setConfirmPopupPanel={setConfirmPopupPanel}
  />
  ```

---

### FinishPanel

- **File**: `src/pages/FinishPanel.jsx`
- **Description**: Allows captains to mark a ride as completed.
- **Props**:
  - `setFinishPanel`: Function to toggle the finish panel visibility.
- **Example Usage**:
  ```jsx
  <FinishPanel setFinishPanel={setFinishPanel} />
  ```

---

## Captain Pages

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

---

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

---

### Captain Home

- **File**: `src/pages/CaptainsHome.jsx`
- **Description**: Displays the captain dashboard with details like earnings, hours online, and ride requests.
- **Components**:
  - **CaptainsDetails**: Displays captain's earnings and hours online.
  - **RidePopup**: Shows new ride requests with options to accept or decline.
  - **ConfirmPopup**: Confirms the ride after acceptance.
- **Animations**: Uses GSAP for smooth transitions between panels.

---

### Captain Riding

- **File**: `src/pages/CaptainRiding.jsx`
- **Description**: Displays the ongoing ride details, including distance and a button to complete the ride.
- **Components**:
  - **FinishPanel**: Allows the captain to mark the ride as completed.
- **Animations**: Uses GSAP for panel transitions.

---

### Captain Logout

- **File**: `src/pages/CaptainLogout.jsx`
- **Description**: Logs out the captain by clearing local storage and context data.
- **API Endpoint**: `GET /api/v1/captains/logout`
- **Post-Action**:
  - Clears captain data and token from local storage.
  - Redirects to the captain login page.

---

## API Examples and Responses

### Captain Registration Example

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

### Captain Login Example

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

### Ride Completion Example

**Request:**

```json
POST /api/v1/rides/complete
Content-Type: application/json

{
  "rideId": "12345",
  "status": "completed"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Ride completed successfully",
  "ride": {
    "id": "12345",
    "status": "completed",
    "distance": "10.5 KM",
    "fare": "$25.00"
  }
}
```

---

## How It Works

1. **Registration**:

   - Captains register by providing personal and vehicle details.
   - The backend validates the data and returns a token upon success.

2. **Login**:

   - Captains log in using their email and password.
   - The backend authenticates the credentials and returns a token.

3. **Dashboard**:

   - Captains view their earnings, hours online, and ride requests.
   - Ride requests are displayed in a popup with options to accept or decline.

4. **Ride Management**:

   - After accepting a ride, captains can view ride details and mark the ride as completed.

5. **Logout**:
   - Captains log out, clearing their session and redirecting to the login page.

---

## Screenshots and UI Examples

### Captain Registration Page

- **Description**: A form for captains to register with personal and vehicle details.
- **Example**:
  ![Captain Registration](https://via.placeholder.com/600x400)

---

### Captain Login Page

- **Description**: A form for captains to log in using their email and password.
- **Example**:
  ![Captain Login](https://via.placeholder.com/600x400)

---

### Captain Dashboard

- **Description**: Displays earnings, hours online, and ride requests.
- **Example**:
  ![Captain Dashboard](https://via.placeholder.com/600x400)

---

### Ride Popup

- **Description**: Shows new ride requests with options to accept or decline.
- **Example**:
  ![Ride Popup](https://via.placeholder.com/600x400)

---

### Ride Completion

- **Description**: Allows captains to mark a ride as completed.
- **Example**:
  ![Ride Completion](https://via.placeholder.com/600x400)

---

## Notes

- Ensure the backend API endpoints are correctly configured in the `.env` file.
- Use `localStorage` for token and captain data management.
- Tailwind CSS is used for styling all components.
