const express = require('express')
const router = express.Router()
const { createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController')
const requireAuth = require('../middlewares/requireAuth')

// Require authentication for all routes - Middleware
router.use(requireAuth)

// GET all workouts
router.get('/', getAllWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/', createWorkout)

// DELETE a workout
router.delete('/:id', deleteWorkout)

// UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router