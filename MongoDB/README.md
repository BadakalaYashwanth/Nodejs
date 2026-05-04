# Mock User Directory API

## Overview
This is a **RESTful API** built with **Node.js** and **Express.js**. It serves as a backend server designed to handle user data requests and demonstrates proficiency in server configuration, routing, dynamic parameter handling, and both JSON and HTML data serving capabilities.

## Features
- **Express Server**: Configured and initialized a lightweight HTTP server on port 8000.
- **RESTful Endpoints**: Provides core API networking following REST API standards.
- **Dual Content Delivery**:
  - Serves **JSON** tailored for application/API clients frontend frameworks.
  - Serves Server-Side Rendered (**SSR**) **HTML** tailored for direct browser viewing.
- **Dynamic Routing**: Uses wildcard parameterized routes (e.g., `:id`) to look up and serve specific data records.
- **Mock Database Layer**: Utilizes an in-memory JSON array (`MOCK_DATA.json`) allowing for rapid lookups and development without complex external database overhead.
- **Hot-Reloading**: Integrated `nodemon` for automated server restarting during development.

## Endpoints

| HTTP Method | API Endpoint | Description | Status |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/users` | Retrieve all users in JSON format. | ✅ Active |
| **GET** | `/users` | Returns an HTML view containing a list of first names. | ✅ Active |
| **GET** | `/api/users/:id` | Lookup a single user object by their exact `id`. | ✅ Active |
| **POST** | `/api/users` | Add a brand new user to the directory. | ⏳ Pending |
| **PATCH** | `/api/users/:id` | Update specific fields of a single user. | ⏳ Pending |
| **PUT** | `/api/users/:id` | Completely overwrite a single user's data. | ⏳ Pending |
| **DELETE** | `/api/users/:id` | Remove a user from the directory. | ⏳ Pending |

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en) installed on your machine.

### Installation
1. Verify you are inside the `Project` directory.
2. Install the necessary dependencies (Express, Nodemon):
   ```bash
   npm install
   ```

### Running the Server
To start the application in development mode (this watches for code changes and restarts the server automatically):
```bash
npm run dev
```

To start the application in standard mode:
```bash
npm start
```
Upon a successful boot, the console will output: `Server Online 8000`.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Local Dev Tool**: Nodemon
