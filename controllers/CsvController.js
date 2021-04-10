const User = require('../models/User');
const Product = require('../models/Product');

exports.csvProducts = (req, res, next) => {
  console.log(req.files)
};