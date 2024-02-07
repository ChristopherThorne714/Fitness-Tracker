const express = require('express');
const router = express.Router();

// Load UnderLoadWorkout model
const UnderLoadWorkout = require('../../models/UnderLoadWorkout');

// @route   GET api/UnderLoadWorkout/test
// @desc    Tests workouts route
// @access  Public
router.get('/test', (req, res) => res.send('Workouts testing!'));

// @route   GET api/wnderloadworkouts
// @desc    Get all UnderLoadWorkouts
// @access  Public
router.get('/', (req, res) => {
    UnderLoadWorkout.find().sort({ createdAt: -1 }) // displays most recent entries first
    .then(workouts => res.json(workouts))
    .catch(err => res.status(404).json({ noworkoutsfound : 'No workouts found'}));
});

// @route   GET api/underloadworkouts/:id
// @desc    Get single underloadworkout by id
// @access  Public
router.get('/:id', (req, res) => {
    UnderLoadWorkout.findById(req.params.id)
      .then(workout => res.json(workout))
      .catch(err => res.status(404).json({ noworkoutfound: 'No workout found' }));
  });

// @route   POST api/underloadworkouts
// @desc    Add/save underloadworkout
// @access  Public
router.post('/', (req, res) => {
    console.log(req)
    UnderLoadWorkout.create(req.body)
      .then(workout => res.json(workout))
      .catch(err => res.status(400).json({ error: 'Unable to add this workout' }));
  });
  
// @route   PUT api/underloadworkouts/:id
// @desc    Update underloadworkout by id
// @access  Public
router.put('/:id', (req, res) => {
    UnderLoadWorkout.findByIdAndUpdate(req.params.id, req.body)
        .then(workout => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/underloadworkouts/:id
// @desc    Delete workout by id
// @access  Public
router.delete('/:id', (req, res) => {
    UnderLoadWorkout.findByIdAndDelete(req.params.id)
      .then(workout => res.json({ mgs: 'Workout entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such workout entry' }));
  });

  module.exports = router;