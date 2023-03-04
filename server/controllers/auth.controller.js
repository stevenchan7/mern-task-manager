const User = require('../models/user');
const { secretKey } = require('../config/authConfig');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const signUp = (req, res) => {
  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    },
    (err) => {
      if (err) return res.status(400).json({ message: err });

      res.status(200).json({ message: 'Account registered success' });
    }
  );
};

const signIn = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) return res.status(400).json({ message: err });
    // If user does not exist
    if (!user) return res.status(400).json({ message: 'User not found! ' });
    // Check if password is valid
    bcrypt.compare(req.body.password, user.password, (err, isPasswordValid) => {
      if (!isPasswordValid) return res.status(400).json({ message: 'Password is not valid! ' });
      // Assign token
      var token = jwt.sign({ id: user._id }, secretKey, { expiresIn: 86400 });
      req.session.token = token;

      res.status(200).json({ user: user, token: req.session.token });
    });
  });
};

const signOut = async (req, res) => {
  try {
    req.session = null;
    res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    this.next(error);
  }
};

module.exports = {
  signIn,
  signUp,
  signOut,
};
