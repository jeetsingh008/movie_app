# MERN Movie Application

A robust, full-stack movie management application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a modern, responsive UI with advanced filtering, "glassmorphism" aesthetics, and a secure Role-Based Access Control (RBAC) system for administrators.

## 🚀 Features

*   **Modern UI/UX**: Sleek dark-mode interface with glassmorphism effects and responsive design.
*   **User Roles (RBAC)**:
    *   **Users**: Browse movies, search/filter, and view details.
    *   **Admins**: Comprehensive Dashboard to Add, Edit, and Delete movies.
*   **Advanced Search & Sort**: Real-time debounce search and multi-criteria sorting (Rating, Date, Duration).
*   **Background Processing**: Uses **Redis** and **BullMQ** for robust job queuing (lazy insertion of movies).
*   **Authentication**: Secure JWT-based authentication.

## 🛠️ Tech Stack

*   **Frontend**: React.js, Vite, Material UI (MUI).
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Atlas).
*   **Queue/Caching**: Redis, BullMQ.

---

## ⚙️ Setup Instructions

### Prerequisites
Ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16+)
*   [Redis](https://redis.io/) (Required for the queue system)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BINNYS_Assignment
```

### 2. Backend Setup
The backend handles the API, database connection, and job queue.

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_strong_secret_key
    REDIS_URL=redis://localhost:6379  # Or your cloud Redis URL
    ```
4.  **Seed Data** (Optional - Populates initial movies):
    ```bash
    npm run seed
    ```
5.  **Create Admin User** (Required for accessing Dashboard):
    ```bash
    node src/utils/createAdmin.js
    ```
    *   Default Credentials: `admin` / `admin123`
6.  Start the server:
    ```bash
    npm run dev
    ```

### 3. Frontend Setup
The frontend is built with React and Vite.

1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend` directory:
    ```env
    VITE_API_URL=http://localhost:5000
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```

## 🌐 Usage

*   Open your browser at `http://localhost:5173` (or the port shown in your terminal).
*   **Guest/User**: Browse the movie list, type in the search bar to filter movies, or use the sort dropdowns.
*   **Admin Access**:
    1.  Log in using the admin credentials created in step 2.5 (`admin`/`admin123`).
    2.  Click "Admin Dashboard" in the navigation bar.
    3.  Use the dashboard to Add, Update, or Delete movies.

## 📦 Deployment Note

*   **Backend**: Requires a Redis instance (e.g., via Upstash) alongside the Node.js hosting.
*   **Frontend**: Set `VITE_API_URL` to your production backend URL.
