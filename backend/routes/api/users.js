const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.send('Users testing!'));

// @route   POST api/users
// @desc    create new user
// @access  Public
router.post('/', (req, res) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json({ error: 'Unable to create user' }));
  });

module.exports = router;