const express = require('express');
const router = express.Router();

// Load Workout model
const Workout = require('../../models/Workout');

// @route   GET api/workouts/test
// @desc    Tests workouts route
// @access  Public
router.get('/test', (req, res) => res.send('Workouts testing!'));

// @route   GET api/workouts
// @desc    Get all workouts performed on a given date
// @access  Public
router.get('/', (req, res) => {
  Workout.find({ performedOn: req.query.performedOn }).sort({ createdAt: -1 }) // displays most recent entries first
    .then(workouts => res.json(workouts))
    .catch(err => res.status(404).json({ noworkoutsfound : 'No workouts found'}));
});

// @route   GET api/workouts
// @desc    Get all workouts performed on a given date by a specific user
// @access  Public
router.get('/:user', (req, res) => {
  Workout.find({ 
    user: req.params.user,
    performedOn: req.query.performedOn }).sort({ createdAt: -1 }) // displays most recent entries first
    .then(workouts => res.json(workouts))
    .catch(err => res.status(404).json({ noworkoutsfound : 'No workouts found'}));
});

// @route   GET api/workouts/show-workout/:title
// @desc    Get all workouts with a matching title AND between a given date range
// @access  Public
router.get('/show-workout/:title', (req, res) => {
    Workout.find({ 
      title: req.params.title, 
      performedOn: {$gte: req.query.dateRange[0], $lte: req.query.dateRange[1]}})
      .sort({ createdAt: -1 })
      .then(workouts => res.json(workouts))
      .catch(err => res.status(404).json({ noworkoutsfound : "No workouts found"}));
});
// @route   GET api/workouts/show-workout/:title
// @desc    Get all workouts with a matching title AND between a given date range by a specific user
// @access  Public
router.get('/show-workout/:user/:title', (req, res) => {
  Workout.find({ 
    title: req.params.title, 
    performedOn: {$gte: req.query.dateRange[0], $lte: req.query.dateRange[1]}})
    .sort({ createdAt: -1 })
    .then(workouts => res.json(workouts))
    .catch(err => res.status(404).json({ noworkoutsfound : "No workouts found"}));
});

// @route   GET api/workouts/:id
// @desc    Get single workout by id
// @access  Public
router.get('/:id', (req, res) => {
    Workout.findById(req.params.id)
      .then(workout => res.json(workout))
      .catch(err => res.status(404).json({ noworkoutfound: 'No workout found' }));
});

// @route   POST api/workouts
// @desc    Add/save workout
// @access  Public
router.post('/', (req, res) => {
    Workout.create(req.body)
      .then(workout => res.json(workout))
      .catch(err => res.status(400).json({ error: 'Unable to add this workout' }));
});
  
// @route   PUT api/workouts/:id
// @desc    Update workout by id
// @access  Public
router.put('/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, req.body)
      .then(workout => res.json({ msg: 'Updated successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to update the Database' }));
});

// @route   DELETE api/workouts/:id
// @desc    Delete workout by id
// @access  Public
router.delete('/:id', (req, res) => {
    Workout.findByIdAndDelete(req.params.id)
      .then(workout => res.json(workout))
      .catch(err => res.status(404).json({ error: 'No such workout entry' }));
});

module.exports = router;