const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind', collection: 'workouts' };

const Workout = require('./Workout');

const UnderLoadWorkout = Workout.discriminator('UnderLoad', new mongoose.Schema({ 
    reps: {
        type: Number,
        required: true,
        default: 0
    },
    sets: {
        type: Number,
        required: true,
        default: 0
    },
    load: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true }, options));

module.exports = UnderLoadWorkout