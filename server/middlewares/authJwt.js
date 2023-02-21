const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/authConfig');

const verifyToken = (req, res, next) => {
  let token = req.session.token;

  // Check if token provided
  if (!token) return res.status(401).json({ message: 'Token not provided!' });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    req.userId = decoded.id;
  });
};
