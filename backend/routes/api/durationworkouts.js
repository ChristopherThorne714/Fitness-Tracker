const express = require('express');
const router = express.Router();

// Load DurationWorkout model
const DurationWorkout = require('../../models/DurationWorkout');

// @route   GET api/durationworkouts/test
// @desc    Tests workouts route
// @access  Public
router.get('/test', (req, res) => res.send('Workouts testing!'));

// @route   GET api/durationworkouts
// @desc    Get all workouts
// @access  Public
router.get('/', (req, res) => {
    DurationWorkout.find().sort({ createdAt: -1 }) // displays most recent entries first
    .then(workouts => res.json(workouts))
    .catch(err => res.status(404).json({ noworkoutsfound : 'No workouts found'}));
});

// @route   GET api/durationworkouts/:id
// @desc    Get single workout by id
// @access  Public
router.get('/:id', (req, res) => {
    DurationWorkout.findById(req.params.id)
      .then(workout => res.json(workout))
      .catch(err => res.status(404).json({ noworkoutfound: 'No workout found' }));
  });

// @route   POST api/durationworkouts
// @desc    Add/save workout
// @access  Public
router.post('/', (req, res) => {
    console.log(req.body);
    DurationWorkout.create(req.body)
      .then(workout => res.json(workout))
      .catch(err => res.status(400).json({ error: 'Unable to add this workout' }));
  });
  
// @route   PUT api/durationworkouts/:id
// @desc    Update workout by id
// @access  Public
router.put('/:id', (req, res) => {
    DurationWorkout.findByIdAndUpdate(req.params.id, req.body)
        .then(workout => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/durationworkouts/:id
// @desc    Delete workout by id
// @access  Public
router.delete('/:id', (req, res) => {
    DurationWorkout.findByIdAndDelete(req.params.id)
      .then(workout => res.json({ mgs: 'Workout entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such workout entry' }));
  });

module.exports = router;