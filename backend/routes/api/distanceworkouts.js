const express = require('express');
const router = express.Router();

// Load DistanceWorkout model
const DistanceWorkout = require('../../models/DistanceWorkout');

// @route   GET api/workouts/test
// @desc    Tests workouts route
// @access  Public
router.get('/test', (req, res) => res.send('Workouts testing!'));

// @route   GET api/distanceworkouts
// @desc    Get all workouts
// @access  Public
router.get('/', (req, res) => {
    DistanceWorkout.find().sort({ createdAt: -1 }) // displays most recent entries first
    .then(workouts => res.json(workouts))
    .catch(err => res.status(404).json({ noworkoutsfound : 'No workouts found'}));
});

// @route   GET api/distanceworkouts/:id
// @desc    Get single workout by id
// @access  Public
router.get('/:id', (req, res) => {
    DistanceWorkout.findById(req.params.id)
      .then(workout => res.json(workout))
      .catch(err => res.status(404).json({ noworkoutfound: 'No workout found' }));
});

// @route   POST api/distanceworkouts
// @desc    Add/save workout
// @access  Public
router.post('/', (req, res) => {
    DistanceWorkout.create(req.body)
      .then(workout => res.json(workout))
      .catch(err => res.status(400).json({ error: 'Unable to add this workout' }));
});
  
// @route   PUT api/distanceworkouts/:id
// @desc    Update workout by id
// @access  Public
router.put('/:id', (req, res) => {
    DistanceWorkout.findByIdAndUpdate(req.params.id, req.body)
        .then(workout => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/distanceworkouts/:id
// @desc    Delete workout by id
// @access  Public
router.delete('/:id', (req, res) => {
    DistanceWorkout.findByIdAndDelete(req.params.id)
      .then(workout => res.json({ mgs: 'Workout entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such workout entry' }));
});

module.exports = router;