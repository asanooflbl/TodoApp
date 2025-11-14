✅ TodoApp — ERN Stack (Node.js + Express + React + MongoDB)

A simple full-stack Todo application built as part of an internship assignment.TodoApp is a full-stack task management application built with Node.js, Express, MongoDB, and React.
Users can authenticate securely, create tasks, update them, toggle completion status, and manage their daily work efficiently through a clean and minimal interface.

🚀 Features
📝 Full CRUD for Todos

Create, read, update, and delete personal tasks with instant UI refresh.

🔄 Status Toggle

Switch tasks between pending and completed instantly.

🔐 JWT Authentication

Secure registration and login with hashed passwords (bcrypt) and protected API routes.

👤 User-Scoped Todos

Every user sees only their own tasks — no data leakage.

⚡ Lightweight UI

Simple React + Context API + Axios setup.
No unnecessary libraries, suitable for clean code review.

🧩 Tech Stack
Frontend

React (Vite)

React Router

Tailwind CSS

Axios

Context API

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Bcrypt

Tools

Git & GitHub for version control

Postman / ThunderClient (optional)

📂 Core Features Implemented

User Registration & Login
Token-based authentication, secure password storage.

Add Todo Items
Title + Description fields included.

Edit Todos
Inline editing for quick modifications.

Toggle Todo Status
Switch between pending and completed.

Delete Todos
Immediately removed from UI and database.

Protected Endpoints
Middleware ensures only authenticated users can access their todos.
