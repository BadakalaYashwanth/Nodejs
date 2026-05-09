# Node.js Authentication System

A robust, basic user authentication system built with Node.js, Express, MongoDB, and EJS. This project demonstrates how to securely handle user registration and login, including password hashing using `bcrypt`.

## Features

- **User Signup**: Register new users with first name, last name, email, and password.
- **User Login**: Authenticate existing users by comparing plain-text input against securely hashed passwords.
- **Password Security**: Uses `bcrypt` to hash passwords with a salt round of 10 before saving them to the database.
- **Server-Side Rendering**: Uses EJS templates to render frontend HTML views (`signup.ejs`, `login.ejs`, `home.ejs`).
- **Database**: MongoDB integration via Mongoose.

## Tech Stack

- **Backend Framework**: Node.js & Express.js
- **Database**: MongoDB & Mongoose
- **View Engine**: EJS (Embedded JavaScript templates)
- **Security**: bcrypt (Password hashing)
- **Development Tool**: nodemon (Auto-restarts server during development)

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd Authentication
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Database Setup**:
   Ensure you have MongoDB installed and running locally on your machine on port `27017`. The app will automatically connect to `mongodb://localhost:27017/Authentication`.

## Running the Application

To start the server in development mode (with auto-reloading):
```bash
npm run dev
```

To start the server normally:
```bash
npm start
```

The server will start on port `8000`.

## Routes

- `GET /signup` - Renders the user registration form.
- `GET /login` - Renders the user login form.
- `POST /user/signup` - Handles registration logic, hashes the password, and creates a new user in MongoDB.
- `POST /user/login` - Handles login logic, retrieves the user by email, and compares the provided password with the hashed password in the database.

## Project Structure

```
Authentication/
├── controllers/
│   └── user.js         # Contains logic for Signup & Login
├── models/
│   └── User.js         # Mongoose schema for the User
├── routes/
│   ├── staticRouter.js # Handles rendering EJS pages (GET requests)
│   └── user.js         # Handles API endpoints (POST requests)
├── views/
│   ├── home.ejs        # Success page rendered after login/signup
│   ├── login.ejs       # Login form template
│   └── singup.ejs      # Signup form template
├── index.js            # Entry point for the Express server
├── package.json        # Project metadata and scripts
└── package-lock.json   # Exact dependency versions
```
