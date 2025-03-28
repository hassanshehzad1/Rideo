# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Rideo Frontend

## Form Documentation

### User Registration Form

- **File**: `src/pages/UserSign.jsx`
- **Fields**:
  - First Name: Required, minimum 2 characters.
  - Last Name: Required, minimum 2 characters.
  - Email: Required, must be a valid email format.
  - Password: Required, minimum 8 characters.
- **Submit Action**: Logs form data to the console.

### User Login Form

- **File**: `src/pages/UserLogin.jsx`
- **Fields**:
  - Email: Required, must be a valid email format.
  - Password: Required, minimum 8 characters.
- **Submit Action**: Logs form data to the console.

### Captain Registration Form

- **File**: `src/pages/CaptainSign.jsx`
- **Fields**:
  - First Name: Required, minimum 2 characters.
  - Last Name: Required, minimum 2 characters.
  - Email: Required, must be a valid email format.
  - Password: Required, minimum 8 characters.
- **Submit Action**: Logs form data to the console.

### Captain Login Form

- **File**: `src/pages/CaptainLogin.jsx`
- **Fields**:
  - Email: Required, must be a valid email format.
  - Password: Required, minimum 8 characters.
- **Submit Action**: Logs form data to the console.

### Example Form

Below is an example of how a form is structured in this project:

```jsx
// ExampleForm.jsx
import React, { useState } from "react";

const ExampleForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ExampleForm;
```

This example demonstrates a basic form with two fields (Name and Email) and a submit button. The form uses Tailwind CSS for styling and logs the form data to the console upon submission.

## Frontend Documentation

### Project Structure

- **Entry Point**: `src/main.jsx`
- **Routing**: Handled using `react-router-dom`.
- **Context**: `UserContext` is used for managing user-related state.

### Pages

1. **Home Page** (`src/pages/Home.jsx`):

   - Displays a welcome message and navigation links for users and captains.
   - Background image and logo are dynamically styled.

2. **User Pages**:

   - **UserSign.jsx**: User registration form.
   - **UserLogin.jsx**: User login form.

3. **Captain Pages**:
   - **CaptainSign.jsx**: Captain registration form.
   - **CaptainLogin.jsx**: Captain login form.

### Assets

- **Logo**: Located in `src/assets/Images/logo.png`.
- **Background Image**: Located in `src/assets/Images/backImage.png`.

### Styling

- Tailwind CSS is used for styling components.
- Forms include responsive and interactive styles with hover and focus effects.

### Development

- **Start Development Server**:
  ```bash
  npm start
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
