# Form Submission App - Frontend

This is the **frontend** for the Form Submission App. It is built with **React (TypeScript)**, **Vite**, **TailwindCSS**, **Zustand** for state management, and **React Router** for navigation.

---

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Notes](#notes)

---

## Installation

1. Clone the repository

--- 

2. Navigate into the frontend folder

```
cd form-submission-frontend
```

--- 

3. Install dependencies

```
npm install
```

## Running the App

Start the development server:

```
npm run dev
```

This will start the app on http://localhost:5173 by default.

## Available Scripts

```
npm run dev - Start development server (hot reload)
```

```
npm run build - Build production-ready files in dist/
```

```
npm run preview - Preview production build locally
```

## Environment Variables

Create a .env file in the root:

```
VITE_API_URL=http://localhost:4000/api
```


Make sure VITE_API_URL points to your backend API.

## Notes

Email is read-only in the form since it's stored from registration/login.

The app uses TailwindCSS for styling.

Route guards ensure protected pages cannot be accessed without authentication.

The backend must be running to interact with this frontend.