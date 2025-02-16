const WorkoutModel = require("../models/workoutModel");
const mongoose = require("mongoose");

// Create a workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body;

    let emptyFields = [];
    if (!title) emptyFields.push("title");
    if (!load) emptyFields.push("load");
    if (!reps) emptyFields.push("reps");
    if (emptyFields.length > 0)
        return res.status(400).json({
            message: "Please fill in all the fields.",
            emptyFields,
        });

    try {
        const user_id = req.user._id  // Created this in middleware
        const newWorkout = await WorkoutModel.create({ title, load, reps, user_id});
        res.status(200).json(newWorkout);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// GET all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const user_id = req.user._id
        const workouts = await WorkoutModel.find({ user_id }).sort({ createdAt: -1 }); // Sort in descending order
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        // Check if the id is of valid type
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: "No such workout" });

        const workout = await WorkoutModel.findById(id);
        if (!workout) return res.status(400).json({ message: "No such workout" });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: "No such workout" });

        const workout = await WorkoutModel.findOneAndDelete({ _id: id });
        if (!workout) return res.status(404).json({ message: "No such workout" });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).json({ message: "No such workout" });

        const workout = await WorkoutModel.findOneAndUpdate(
            { _id: id },
            {
                ...req.body, // Spread the proporties of req.body (object)
            }
        );
        if (!workout) return res.status(404).json({ message: "No such workout" });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = {
    createWorkout,
    getAllWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout,
};
