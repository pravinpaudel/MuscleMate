# MuscleMate - Workout Planner
MuscleMate is a full-stack web application that allows users to schedule and manage their workouts. It provides a user-friendly interface for creating, editing, and filtering workout schedules. The frontend is built with React, while the backend is powered by Node.js, Express, and MongoDB.

# Features
- User authentication and authorization using JWT (JSON Web Tokens)
- Schedule workouts for yourself and manage your workout routines
- Filter workouts by day.
- Responsive and intuitive UI built with React
- RESTful API backend with Node.js and Express
- MongoDB for data storage

# Installation
Follow these steps to set up the project on your local machine:
1. **Clone the repository:**
   ```
    git clone https://github.com/pravinpaudel/MuscleMate.git
    cd MuscleMate
   ```
2. **Install dependencies for the frontend and backend:**
   ```
   # In the project root directory
   cd backend
   npm install
   cd frontend
   npm install
   ```
3. **Set up environment variables:** Create a .env file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. **Start the development server:**
   ```
   # In the backend directory, start the backend server
   npm start

   # In the frontend directory, start the frontend server
   npm run dev
   ```

# Usage
1. **Sign Up/Login:** Create an account or log in to access your personalized workout schedules.
2. **Schedule Workouts:** Add new workouts to your schedule by specifying details like workout type, and day.
3. **Filter Workouts:** Use the filter options to view your workouts based on different criteria like day.
4. **Manage Workouts:** Delete your scheduled workouts if needed.
