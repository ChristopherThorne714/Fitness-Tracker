const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind', collection: 'workouts' };

// basic schema and model
const baseWorkoutSchema = new mongoose.Schema({ 
    title: { 
        type: String, 
        required: true
    },
    sort: {
        type: String, 
        enum: ["Under Load", "Duration", "Distance"],
        required: true
    },
    musclegroup: {
        type: String, 
        enum: ["Biceps", "Triceps", "Shoulders", "Forearms", "Chest", "Back", "Abs", "Quads", "Hamstrings", "Calves", "Cardio"],
        required: true
    }
}, { timestamps: true }, options);
const Workout = mongoose.model('workout', baseWorkoutSchema);


// each type of workout should be discriminated from each other
// workout types:
// under load
// duration
// laps/distance

module.exports = Workout;
