# Authentication and JWT Refresh Token Example

This project demonstrates how to implement authentication and refresh token functionality using Node.js, Express, MongoDB, and JSON Web Tokens (JWT). It is designed as a learning project to help you understand the basics of authentication and token management, which you can use in your future projects.

## Features

- User authentication using JSON Web Tokens (JWT).
- Refresh token mechanism to keep users logged in without requiring them to log in repeatedly.
- Secure password storage using hashing.
- MongoDB integration for storing user data.
- Middleware for protecting routes and verifying user authentication.

## Project Structure

```
1-auth-jwt-refresh/
├── .env                # Environment variables
├── env.example         # Example environment variables file
├── package.json        # Project dependencies and scripts
├── pnpm-lock.yaml      # Lock file for dependencies
├── readme.md           # Project documentation
├── tsconfig.json       # TypeScript configuration
├── src/                # Source code folder
│   ├── server.ts       # Main server file
│   ├── controllers/    # Contains route controllers
│   │   └── user.controller.ts
│   ├── middlewares/    # Middleware functions
│   │   └── auth.middleware.ts
│   ├── models/         # Database models
│   │   └── user.model.ts
│   ├── routes/         # API route definitions
│   │   └── user.routes.ts
│   ├── types/          # TypeScript type definitions
│   │   ├── express.d.ts
│   │   └── user.types.ts
│   └── utils/          # Utility functions
│       ├── dbConnect.ts  # MongoDB connection logic
│       └── tokens.ts     # Token generation and verification
```

## Getting Started

### Prerequisites

- Node.js installed on your system.
- MongoDB connection string (you can use MongoDB Atlas or a local MongoDB instance).
- pnpm package manager (or npm/yarn if preferred).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd 1-auth-jwt-refresh
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=7000
   JWT_SECRET="your_jwt_secret"
   MONGO_USERNAME="your_mongo_username"
   MONGO_PASSWORD="your_mongo_password"
   MONGODB_URI="your_mongodb_connection_string"
   REFRESH_TOKEN_SECRET=""
   REFRESH_TOKEN_EXPIRY=10d
   ```

4. Start the server:
   ```bash
   pnpm start
   ```

5. The server will start on `http://localhost:7000`.

## How It Works

1. **User Authentication**:
   - Users can register by providing their details (e.g., username, email, password).
   - Passwords are securely hashed before being stored in the database.
   - Users can log in with their credentials to receive an access token and a refresh token.

2. **Access and Refresh Tokens**:
   - The access token is used to authenticate API requests.
   - The refresh token is used to generate a new access token when the old one expires.

3. **Protected Routes**:
   - Certain routes are protected using middleware that verifies the access token.
   - If the access token is valid, the user is allowed to access the route.

4. **Error Handling**:
   - Errors are handled gracefully, and appropriate error messages are returned to the client.

## Learning Objectives

- Understand how to set up a basic Node.js and Express server.
- Learn how to use MongoDB for storing user data.
- Implement secure authentication using JWT.
- Create and verify access and refresh tokens.
- Use middleware to protect routes and handle authentication.

## Future Use

You can use this project as a reference for implementing authentication and token management in your own projects. Simply adapt the code to your specific requirements and extend it as needed.

## Contributing

Feel free to fork this repository and submit pull requests to improve the project or add new features.

## License

This project is licensed under the MIT License.

## API Endpoints

Here is a simple explanation of the API endpoints available in this project:

1. **POST /login**
   - This endpoint allows users to log in by providing their credentials (e.g., email and password).
   - On successful login, the server responds with an access token and a refresh token.

2. **POST /register**
   - This endpoint allows new users to register by providing their details (e.g., username, email, and password).
   - The password is securely hashed before being stored in the database.

3. **POST /logout**
   - This is a secured endpoint that allows users to log out.
   - The user must provide a valid access token to access this endpoint.

4. **POST /refresh-token**
   - This endpoint allows users to get a new access token using their refresh token.
   - This is useful when the access token has expired, so the user does not need to log in again.

Each endpoint is designed to demonstrate how authentication and token management can be implemented in a Node.js application.
