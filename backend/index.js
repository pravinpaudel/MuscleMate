const express = require('express')
const dotenv = require('dotenv')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')
const mongoose = require('mongoose')
const cors = require('cors');
dotenv.config()

// Set up app
const app = express()

// Configure CORS to allow requests from your frontend's origin
const corsOptions = {
    origin: 'https://muscle-mate-self.vercel.app', // Your frontend's URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {

        // Only listen to requests once app is connected to DB
        app.listen(process.env.PORT, () => {
            console.log("App is listening on port ", process.env.PORT)
        })
        
    })
    .catch((error) => {
        console.log(error.message)
    })

module.exports = app;

