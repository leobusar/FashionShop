const jwt = require('jsonwebtoken');

function authenticateToken(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    // console.log(err);
    if (err) return res.sendStatus(403);
    // req.user = user;
    return res.status(200).send(user);
  });

  return res.sendStatus(401);
}

const config = {
  env: process.env.NODE_ENV,
  jwtExpiresIn: 86400,
  jwtMiddleware: authenticateToken,
};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: config.jwtExpiresIn });
}

module.exports = { config, authenticateToken, generateAccessToken };
