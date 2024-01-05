const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind', collection: 'workouts' };

const Workout = require('./Workout');

const DurationWorkout = Workout.discriminator('Duration', new mongoose.Schema({
    duration: {
        type: String,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true}, options));

module.exports = DurationWorkout;