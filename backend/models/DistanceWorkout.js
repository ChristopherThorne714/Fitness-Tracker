const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind', collection: 'workouts' };

const Workout = require('./Workout');


const DistanceWorkout = Workout.discriminator('Distance', new mongoose.Schema({
    distance: {
        type: Number,
        required: true,
        default: 0
    },
    laps: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true}, options));

module.exports = DistanceWorkout;