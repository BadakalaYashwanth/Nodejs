# Node.js Learning Project

Welcome to my Node.js learning project! This repository contains simple code examples to help understand the core concepts of Node.js.

## What is in this project?
This project is divided into several folders, each focusing on a specific Node.js topic:

- **FileHandling**: Explains how to read and write files in Node.js.
  - **Blocking**: Examples of Synchronous operations (the code waits until the file is completely read/written).
  - **NonBlocking**: Examples of Asynchronous operations (the code does not wait, it keeps running other tasks).
  
- **HttpServer**: Contains examples to show how to build basic web servers using Node.js without any external frameworks.
  
- **HttpMethod**: Shows examples related to the different types of HTTP requests (like GET, POST, PUT, DELETE).
  
- **URL**: Shows how to work with web addresses (URLs) and routes in Node.js.

## What do you need to run it?
You just need Node.js installed on your computer.
- You can download it for free from [nodejs.org](https://nodejs.org/).

## How to run the examples?
1. Open your terminal or command prompt.
2. Navigate to the project folder.
3. Type `node` followed by the path of the file you want to run. 

For example, to run the sync file handling example, you would type:
```bash
node FileHandling/Blocking/Sync.js
```

## Extra Packages
- **dotenv**: This project uses `dotenv` to practice managing environment variables (like secret keys) safely.

---
*This is a beginner-friendly project created to practice and understand Node.js basics.*
