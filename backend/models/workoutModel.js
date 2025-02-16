const { Schema, model } = require("mongoose");

const WorkoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, { timestamps: true })

const WorkoutModel = model('workouts', WorkoutSchema)
module.exports = WorkoutModel