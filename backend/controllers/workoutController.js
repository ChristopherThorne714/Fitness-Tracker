const Workout = require('../models/Workout');
const mongoose = require('mongoose');

const getWrktsByUser = async (req, res) => {
    Workout.find({ 
        user: req.params.user,
        performedOn: req.query.performedOn }).sort({ createdAt: -1 }) // displays most recent entries first
        .then(workouts => res.status(200).json(workouts))
        .catch(err => console.log(err));
};

const getUserWrktsByTitle = async (req, res) => {
    Workout.find({ 
        user: req.params.user,
        title: req.params.title, 
        performedOn: {$gte: req.query.dateRange[0], $lte: req.query.dateRange[1]}})
        .sort({ createdAt: -1 })
        .then(workouts => res.status(200).json(workouts))
        .catch(err => res.status(404).json({ noworkoutsfound : "No workouts found"}));
};

const getWrktById = async (req, res) => {
    Workout.findById(req.params.id)
      .then(workout => res.status(200).json(workout))
      .catch(err => res.status(404).json({ noworkoutfound: 'No workout found' }));
};

const postWrkt = async (req, res) => {
    Workout.create(req.body)
    .then(workout => res.json(workout))
    .catch(err => res.status(400).json({ error: 'Unable to add this workout' }));
};

const putWrkt = async (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, req.body)
    .then(workout => res.json({ msg: 'Updated successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
};

const deleteWrkt = async (req, res) => {
    Workout.findByIdAndDelete(req.params.id)
    .then(workout => res.status(200).json(workout))
    .catch(err => res.status(404).json({ error: 'No such workout entry' }));
};

module.exports = {
    getWrktsByUser,
    getUserWrktsByTitle,
    getWrktById,
    postWrkt,
    putWrkt,
    deleteWrkt,
};