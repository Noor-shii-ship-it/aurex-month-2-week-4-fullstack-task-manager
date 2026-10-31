# AUREX – Full Stack Task Manager

A full-stack task management application built using React, Node.js, Express.js, and MongoDB. It allows users to securely register, log in, and manage their personal tasks.

## Features

- User registration and login
- Secure password hashing with bcrypt
- JWT-based authentication
- Create, read, update, and delete tasks
- Mark tasks as completed
- User-specific task management
- Protected API routes
- Responsive user interface

## Tech Stack

**Frontend**
- React
- Vite
- CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Project Structure

```text
aurex-month-2-week-4-fullstack-task-manager/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   └── server.js
│
└── frontend/
    ├── public/
    └── src/
        ├── context/
        ├── pages/
        └── services/
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Noor-shii-ship-it/aurex-month-2-week-4-fullstack-task-manager.git
cd aurex-month-2-week-4-fullstack-task-manager
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
```

Start the backend:

```bash
npm start
```

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/tasks` | Get user's tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

Task endpoints require JWT authentication.

## Testing

Run backend tests:

```bash
cd backend
npm test
```

Current test suite: 7 tests passed.

## Security

- Passwords are hashed using bcrypt.
- Protected routes use JWT authentication.
- Tasks are associated with their owners.
- Environment variables are stored in `.env`.
- Secret files and dependencies are excluded through `.gitignore`.

**Never upload your `.env` file or share your database credentials.**

## Author

**Noor-shii-ship-it**

GitHub: https://github.com/Noor-shii-ship-it

## Project Status

Frontend production build and current backend test suite are successful. Deployment is still in progress.
