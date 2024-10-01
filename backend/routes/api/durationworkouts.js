const express = require('express');
const router = express.Router();
const { reqAuth } = require('../../middleware/AuthMiddleware');

router.use(reqAuth);

// Load DurationWorkout model
const DurationWorkout = require('../../models/DurationWorkout');

// @route   GET api/durationworkouts/test
// @desc    Tests workouts route
// @access  Public
router.get('/test', (req, res) => res.send('Workouts testing!'));

// @route   POST api/durationworkouts
// @desc    Add/save workout
// @access  Public
router.post('/', (req, res) => {
    DurationWorkout.create(req.body)
      .then(workout => res.status(201).json(workout))
      .catch(err => res.status(400).json({ error: 'Unable to add this workout' }));
  });
  
// @route   PUT api/durationworkouts/:id
// @desc    Update workout by id
// @access  Public
router.put('/:id', (req, res) => {
    DurationWorkout.findByIdAndUpdate(req.params.id, req.body)
        .then(workout => res.status(200).json({ msg: 'Updated successfully' }))
        .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
    );
});

module.exports = router;