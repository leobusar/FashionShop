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


exports.login = (req, res) => {


    User.findOne({
      username: req.body.username,
    },
    (err, user) => {
      if (err) return res.status(500).send('There was a problem registering the user.');
      if (!user) return  res.status(401).send({ auth: false, token: null });
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

      // create a token
      const token = jwt.sign(
        { username: user.username },
        auth.config.secret,
        { expiresIn: auth.config.jwtExpiresIn },
      );
      return res.status(200).send({ auth: true, token });
    });
  };
