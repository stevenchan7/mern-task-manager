const User = require('../models/user');

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) return res.status(500).json({ message: err });

    if (user) {
      return res.status(400).json({ message: 'Failed! Username already in use.' });
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) return res.status(500).json({ message: err });

      if (user) {
        return res.status(400).json({ message: 'Failed! Email already in use' });
      }

      // If no duplicate
      next();
    });
  });
};

module.exports = checkDuplicateUsernameOrEmail;
