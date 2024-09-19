const express = require('express');
const router = express.Router();
const { reqAuth } = require('../../middleware/AuthMiddleware');

router.use(reqAuth);

// Load DistanceWorkout model
const DistanceWorkout = require('../../models/DistanceWorkout');

// @route   GET api/workouts/test
// @desc    Tests workouts route
// @access  Public
router.get('/test', (req, res) => res.send('Workouts testing!'));

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

module.exports = router;