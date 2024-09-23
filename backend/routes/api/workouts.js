const express = require('express');
const router = express.Router();
const { reqAuth } = require('../../middleware/AuthMiddleware');
const { 
  getWrktsByUser, 
  getUserWrktsByTitle, 
  getWrktById,
  postWrkt,
  putWrkt,
  deleteWrkt,
} = require('../../controllers/workoutController');

router.use(reqAuth);

// Load Workout model
const Workout = require('../../models/Workout');

// @route   GET api/workouts/test
// @desc    Tests workouts route
// @access  Public
router.get('/test', (req, res) => res.status(200).json({ message: "Workouts testing!" }));

// @route   GET api/workouts
// @desc    Get all workouts performed on a given date by a specific user
// @access  Public
router.get('/:user', getWrktsByUser);

// @route   GET api/workouts/show-workout/:title
// @desc    Get all workouts with a matching title AND between a given date range by a specific user
// @access  Public
router.get('/show-workout/:user/:title', getUserWrktsByTitle);

// @route   GET api/workouts/:id
// @desc    Get single workout by id
// @access  Public
router.get('/workout/:id', getWrktById);

// @route   POST api/workouts
// @desc    Add/save workout
// @access  Public
router.post('/', postWrkt);
  
// @route   PUT api/workouts/:id
// @desc    Update workout by id
// @access  Public
router.put('/:id', putWrkt);

// @route   DELETE api/workouts/:id
// @desc    Delete workout by id
// @access  Public
router.delete('/:id', deleteWrkt);

/* ****************OLD/UNUSED************* */
// @route   GET api/workouts
// @desc    Get all workouts performed on a given date
// @access  Public
// router.get('/', (req, res) => {
//   Workout.find({ performedOn: req.query.performedOn }).sort({ createdAt: -1 }) // displays most recent entries first
//     .then(workouts => res.json(workouts))
//     .catch(err => res.status(404).json({ noworkoutsfound : 'No workouts found'}));
// });

// @route   GET api/workouts/show-workout/:title
// @desc    Get all workouts with a matching title AND between a given date range
// @access  Public
// router.get('/show-workout/:title', (req, res) => {
//   Workout.find({ 
//     title: req.params.title, 
//     performedOn: {$gte: req.query.dateRange[0], $lte: req.query.dateRange[1]}})
//     .sort({ createdAt: -1 })
//     .then(workouts => res.status(200).json(workouts))
//     .catch(err => res.status(404).json({ noworkoutsfound : "No workouts found"}));
// });

module.exports = router;