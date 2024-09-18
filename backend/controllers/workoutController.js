const Workout = require('../models/Workout');
const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({ 
        user: req.query.user,
        performedOn: req.query.performedOn }).sort({ createdAt: -1 }) // displays most recent entries first
        .then(workouts => res.json(workouts))
        .catch(err => console.log(err));
};

module.exports = {
    getWorkouts,
};