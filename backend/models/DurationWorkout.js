const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind', collection: 'workouts' };

const Workout = require('./Workout');

const DurationWorkout = Workout.discriminator('Duration', new mongoose.Schema({
    duration: {
        hours: Number,
        minutes: Number,
        seconds: Number,
    },
    sets: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true}, options));

module.exports = DurationWorkout;