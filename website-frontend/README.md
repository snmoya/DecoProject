# Website Frontend

This folder contains the source code for the website frontend of our project. The website serves as the main interface for users to interact with the platform and is currently hosted at [this link](https://deco3801-machineleads.uqcloud.net/).

## Overview

The website frontend is built using **ReactJS** and provides an intuitive user interface for accessing various features of the platform. It communicates with the backend via RESTful API calls to manage user authentication, data interactions, and more.

### Key Features

- **User Authentication**: Supports login, registration, and session management using JWT tokens.
- **Responsive Design**: Designed to work across a wide range of devices and screen sizes, ensuring a seamless user experience.
- **API Integration**: Interacts with the backend API to fetch and display dynamic data in real-time.
- **Modular Components**: Built using reusable React components to maintain scalability and ease of development.

## Project Structure

```
website-frontend/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
├── package.json
└── README.md
```

- **`public/`**: Static files like `index.html` and assets (images, icons).
- **`src/`**: Contains the main source code for the frontend.
  - **`components/`**: Reusable React components such as buttons, forms, headers, and more.
  - **`contexts/`**: Handles authentication for all the web pages.
  - **`pages/`**: Different pages of the website (e.g., Home, Login, Map).

## Backend Integration

- This website will run with the hosted backend at `https://deco3801-machineleads.uqcloud.net/`. You don't need to set up the backend on your local to run this front end.
- If you prefer to run it with the **local backend**:
  - See the [backend README](../backend/README.md) for setup instructions.
  - Change the proxy in the `package.json` or `.env` file to `http://localhost:8081` to connect to the local backend.
  - Make sure running the **MySQL server** and your **local backend** before running the frontend.

## Environment Variables

Make sure to add the following environment variables in your `.env` file to integrate with the backend:

```
REACT_APP_API_KEY=put-your-API-key-here
```

If you faced DevServer related error while starting the web, add this to your `.env` file:

```
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

## Setup Instructions

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installing Dependencies

You only need to do this at the first time, or after anything changes in `package.json` and `package-lock.json`

```shell
cd website-frontend/
npm install
```

### Running the web app 

```shell
cd website-frontend/
npm start
```

It'll auto open our website on your browser. If not, visit [this link](localhost:3000) to see it.