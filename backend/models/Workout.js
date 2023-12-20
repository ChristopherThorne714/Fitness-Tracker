const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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
    // archetype: {
    //     type:
    // }
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
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = Workout = mongoose.model('workout', workoutSchema);