const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const debug = require('debug')('shoppingcart:auth-controller');

const auth = require('../config/auth');
const User = require('../models/User');

exports.register = (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  User.findOne({ username: req.body.username })
    .then((user) => { /* eslint consistent-return: off */
      if (user) {
        return res.status(500).send('Username is already taken');
      }
      User.create({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
      },
      (err, userNew) => {
        if (err) return res.status(500).send('There was a problem registering the user.');
        // create a token
        const token = jwt.sign(
          { username: userNew.username },
          auth.config.secret,
          { expiresIn: auth.config.jwtExpiresIn },
        );
        return res.status(200).send({ auth: true, token });
      });
    }).catch((error) => {
      debug(`Error: ${error.message}`);

      return res.status(500).send(`There was a problem registering the user: ${error.messsage}`);
    });
};

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username,
  },
  (err, user) => {
    if (err) return res.status(500).send('There was a problem registering the user.');
    if (!user) return res.status(401).send({ auth: false, token: null });
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
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
