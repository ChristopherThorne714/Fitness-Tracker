const User = require("../models/User");
const jwt = require("jsonwebtoken");

const userVerification = async (req, res) => {
  const token = req.cookies.token
  if (!token) return res.json({ status: false, error: 'Authorization token required' })

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false, error: 'Verification failed' })
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.email });
      else return res.status(401).json({ status: false, error: 'Verification failed' })
    };
  });
};

const reqAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({status: false, error: 'Authorization token required'});

  try {
    const { id } = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = await User.findById( id );
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({status: false, error: 'request is not authorized'});
  };
};

module.exports = { reqAuth, userVerification };