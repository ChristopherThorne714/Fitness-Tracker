const express = require('express');
const router = express.Router();
const { reqAuth } = require('../../middleware/AuthMiddleware');

// router.use(reqAuth);

// Load UnderLoadWorkout model
const UnderLoadWorkout = require('../../models/UnderLoadWorkout');

// @route   GET api/UnderLoadWorkout/test
// @desc    Tests workouts route
// @access  Public
router.get('/test', (req, res) => res.send('Workouts testing!'));

// @route   POST api/underloadworkouts
// @desc    Add/save underloadworkout
// @access  Public
router.post('/', (req, res) => {
    UnderLoadWorkout.create(req.body)
      .then(workout => res.status(201).json(workout))
      .catch(err => res.status(400).json({ error: 'Unable to add this workout' }));
  });
  
// @route   PUT api/underloadworkouts/:id
// @desc    Update underloadworkout by id
// @access  Public
router.put('/:id', (req, res) => {
    UnderLoadWorkout.findByIdAndUpdate(req.params.id, req.body)
        .then(workout => res.status(200).json({ msg: 'Updated successfully' }))
        .catch(err =>
        res.status(400).json({ error: 'Unable to update the Database' })
    );
});

module.exports = router;