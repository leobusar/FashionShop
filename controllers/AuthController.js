const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../config/auth');
const User = require('../models/User');

exports.register = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.create({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
  },
  (err, user) => {
    if (err) return res.status(500).send('There was a problem registering the user.');
    // create a token
    const token = jwt.sign(
      { username: user.username },
      auth.config.secret,
      { expiresIn: auth.config.jwtExpiresIn },
    );
    return res.status(200).send({ auth: true, token });
  });
};
