const express = require('express');

const router = express.Router();
// AuthController

/* GET users listing. */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  res.send(`respond with a resource${username} ${password}`);
});

module.exports = router;
