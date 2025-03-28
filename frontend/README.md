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
