# User Management API

A simple RESTful API for managing users with JWT-based authentication and basic CRUD operations. This API is built using Node.js, Express, MongoDB, and Mongoose.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
- [Testing Instructions](#testing-instructions)
- [Usage](#usage)

## Features

- **User Authentication (JWT-Based)**
  - Signup (`POST /api/auth/signup`)
  - Login (`POST /api/auth/login`)
- **User CRUD Operations (Protected Routes)**
  - Create User (`POST /api/user`)
  - Get All Users (`GET /api/user`)
  - Get Single User (`GET /api/user/:id`)
  - Update User (`PUT /api/user/:id`)
  - Delete User (`DELETE /api/user/:id`)
- **Middleware & Security**
  - JWT middleware for protecting routes
  - Centralized error handling using Express middleware
- **Validation**
  - Input validation using express-validator
- **Role-Based Access Control**
  - Only admins can delete users

## Project Structure

```
user-management-api/
├── __tests__/
│   ├── auth.test.js
│   └── user.test.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middlewares/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
├── validators/
│   ├── authValidator.js
│   ├── userValidator.js
│   └── validate.js
├── .env
├── .env.example
├── app.js
├── server.js
├── package.json
├── .gitignore
└── package-lock.json
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/user-management-api.git
   cd user-management-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Setup Instructions

1. **Configure Environment Variables:**

   Create a `.env` file at the root of your project and add the following variables:

   ```env
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/user-management
   JWT_SECRET=your_jwt_secret
   ```

2. **Start the Server:**

   For development (with nodemon):

   ```bash
   npm run dev
   ```

   Or start normally:

   ```bash
   npm start
   ```

   The server will run on the port specified in the `.env` file (default: 3000).

## API Documentation

This project includes interactive API documentation using Swagger UI.

- **Local Documentation:**
  Once the server is running, you can access the API documentation at:
  ```
  http://localhost:3000/api-docs
  ```

- **Online Documentation:**
  The API documentation is also available on GitHub Pages:
  ```
  https://ramya-shah.github.io/user-management-api/
  ```

The Swagger UI provides a visual interface to explore the API endpoints, send test requests, and view responses.

## API Endpoints

### Authentication

- **Signup**
  - **Endpoint:** `POST /api/auth/signup`
  - **Description:** Creates a new user account.
  - **Payload:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "secret123",
      "role":"user"
    }
    ```
  - **Response:** Returns a JWT token on successful signup.

- **Login**
  - **Endpoint:** `POST /api/auth/login`
  - **Description:** Authenticates a user and returns a JWT token.
  - **Payload:**
    ```json
    {
      "email": "john@example.com",
      "password": "secret123"
    }
    ```
  - **Response:** Returns a JWT token on successful authentication.

### User CRUD (Protected Routes)

*Note: All user routes require a valid JWT token in the `Authorization` header (e.g., `Bearer <token>`).*

- **Create User**
  - **Endpoint:** `POST /api/user`
  - **Description:** Creates a new user (for demonstration purposes, a default password is assigned).
  - **Payload:**
    ```json
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "user"
    }
    ```
  - **Response:** Returns the created user object.

- **Get All Users**
  - **Endpoint:** `GET /api/user`
  - **Description:** Retrieves all users (passwords are excluded).
  - **Response:** Returns an array of user objects.

- **Get Single User**
  - **Endpoint:** `GET /api/user/:id`
  - **Description:** Retrieves a single user by their ID.
  - **Response:** Returns the user object.

- **Update User**
  - **Endpoint:** `PUT /api/user/:id`
  - **Description:** Updates user details.
  - **Payload:**
    ```json
    {
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "role": "admin"
    }
    ```
  - **Response:** Returns the updated user object.

- **Delete User**
  - **Endpoint:** `DELETE /api/user/:id`
  - **Description:** Deletes a user. Only admin users are allowed to delete users.
  - **Response:** Returns a success message upon deletion.

## Testing Instructions

This project uses **Jest** and **Supertest** for testing API endpoints.

**Run Tests:**

   Ensure your test database is configured if necessary, then run:

   ```bash
   npm test
   ```

## Usage

After starting the server, you can use tools like **Postman** or **cURL** to interact with the API endpoints. For protected routes, include the JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## Deploying the Documentation

To manually build and deploy the API documentation:

```bash
# Build the documentation
npm run build:docs

# The documentation will be generated in the /docs folder
# You can then deploy this to GitHub Pages
```

The GitHub Actions workflow will automatically deploy the documentation when you push to the main branch.
