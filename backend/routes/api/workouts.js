const express = require('express');
const router = express.Router();

// Load Book model
// not in use yet
// const Workout = require('../../models/workout');

// @route   GET api/workouts/test
// @desc    Tests workouts route
// @access  Public
router.get('/test', (req, res) => res.send('Workouts testing!'));

// @route   GET api/workouts
// @desc    Get all workouts
// @access  Public
router.get('/', (req, res) => {
    Workout.find()
    .then(workouts => res.json(workouts))
    .catch(err => res.status(404).json({ noworkoutsfound : 'No workouts found'}));
});

// @route   GET api/workouts/:id
// @desc    Get single workout by id
// @access  Public
router.get('/:id', (req, res) => {
    Book.findById(req.params.id)
      .then(workout => res.json(workout))
      .catch(err => res.status(404).json({ noworkoutfound: 'No workout found' }));
  });

// @route   POST api/workouts
// @desc    Add/save workout
// @access  Public
router.post('/', (req, res) => {
    Workout.create(req.body)
      .then(workout => res.json({ msg: 'Workout added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this workout' }));
  });
  
// @route   PUT api/workouts/:id
// @desc    Update workout by id
// @access  Public
router.put('/:id', (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, req.body)
        .then(book => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/workouts/:id
// @desc    Delete workout by id
// @access  Public
router.delete('/:id', (req, res) => {
    Workout.findByIdAndDelete(req.params.id)
      .then(workout => res.json({ mgs: 'Workout entry deleted successfully' }))
      .catch(err => res.status(404).json({ error: 'No such workout entry' }));
  });