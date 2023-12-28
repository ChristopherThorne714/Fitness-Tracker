const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind' };

// basic schema and model
const baseWorkoutSchema = new mongoose.Schema({ 
    title: { 
        type: String, 
    },
    sort: {
        type: { "type": String, "enum": ["Under Load", "Duration", "Distance"]}
    },
    musclegroup: {
        type: { "type": String, "enum": ["Biceps", "Triceps", "Shoulders", "Forearms", "Chest", "Back", "Abs", "Quads", "Hamstrings", "Calves", "Cardio"]},
    }
}, { timestamps: true }, options);
const Workout = mongoose.model('workout', baseWorkoutSchema);

// discriminators for different workout types
// workout types:
// under load
// duration
// laps/distance
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

const DurationWorkout = Workout.discriminator('Duration', new mongoose.Schema({
    duration: {
        hours: Number,
        minutes: Number,
        seconds: Number,
    },
    reps: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true}, options));

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

// const workoutSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     archetype: {
//         type: { "type": String, "enum": ["", "", "", ""]},
//         required: true,
//     },
//     reps: {
//         type: Number,
//         required: true,
//         default: 0
//     },
//     sets: {
//         type: Number,
//         required: false,
//         default: 0
//     },
//     load: {
//         type: Number,
//         required: false,
//         default: 0
//     },
//     laps: {
//         type: Number,
//         required: false,
//         default: 0
//     },
//     duration: {
//         type: Number,
//         required: false,
//         default: 0
//     },
// }, { timestamps: true });

//const Workout = mongoose.model('workout', workoutSchema);

module.exports = Workout;

// module.exports = {
//     Workout, UnderLoadWorkout, DurationWorkout, DistanceWorkout
// };