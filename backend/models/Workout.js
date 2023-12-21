const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    archetype: {
        type: { "type": String, "enum": ["", "", "", ""]},
        required: true,
    },
    reps: {
        type: Number,
        required: true,
        default: 0
    },
    sets: {
        type: Number,
        required: false,
        default: 0
    },
    load: {
        type: Number,
        required: false,
        default: 0
    },
    laps: {
        type: Number,
        required: false,
        default: 0
    },
    duration: {
        type: Number,
        required: false,
        default: 0
    },
}, { timestamps: true });

const Workout = mongoose.model('workout', workoutSchema);

module.exports = {
    Workout
};