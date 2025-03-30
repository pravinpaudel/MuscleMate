const express = require('express')
const dotenv = require('dotenv')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')
const mongoose = require('mongoose')
dotenv.config()

// Set up app
const app = express()

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

