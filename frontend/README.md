# Task Manager — Frontend

A clean, modern task management app built with React and Tailwind CSS, backed by a Spring Boot REST API with JWT authentication.

## Features

- **Authentication** — Register and login with JWT-based auth
- **Task CRUD** — Create, view, edit, and delete tasks
- **Status Badges** — Visual indicators for Pending, In Progress, and Completed tasks
- **Toast Notifications** — Success/error feedback via react-hot-toast
- **Responsive UI** — Mobile-friendly layout with Tailwind CSS

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | React 19                            |
| Routing     | React Router v7                     |
| Styling     | Tailwind CSS v4                     |
| HTTP Client | Axios                               |
| Toasts      | react-hot-toast                     |
| Build Tool  | Vite 7                              |

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running at `http://localhost:8080/api/v1`

### Install & Run

```bash
npm install
npm run dev
```

The app starts at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/
│   └── axios.js          # Axios instance with auth & response interceptors
├── components/
│   └── PrivateRoute.jsx  # Auth guard for protected routes
├── context/
│   └── AuthContext.jsx   # JWT token state management
├── pages/
│   ├── Login.jsx         # Login page
│   ├── Register.jsx      # Registration page
│   └── Dashboard.jsx     # Task management dashboard
├── App.jsx               # Routes & Toaster provider
├── main.jsx              # Entry point
└── index.css             # Tailwind CSS import
```

## API Endpoints Used

| Method   | Endpoint         | Description          |
| -------- | ---------------- | -------------------- |
| `POST`   | /auth/signup     | Register a new user  |
| `POST`   | /auth/login      | Login & get JWT      |
| `GET`    | /tasks           | List all user tasks  |
| `POST`   | /tasks           | Create a task        |
| `PUT`    | /tasks/:id       | Update a task        |
| `DELETE` | /tasks/:id       | Delete a task        |
