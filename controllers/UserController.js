const debug = require('debug')('shoppingcart:user-controller');
const Joi = require('joi');
const User = require('../models/User');

/**
 * Get products list.
 * @property {string} req.query.sort - Field to sort.
 * @property {string} req.query.order - Order of products.
 * @property {number} req.query.skip - Number of products to be skipped.
 * @property {number} req.query.limit - Limit number of products to be returned.
 * @returns {Product[]}
 */
exports.list = (req, res, next) => {
  // console.log(req.query);
  const {
    sort = 'createAt', order = 'desc', limit = 50, skip = 0,
  } = req.query;

  let condition;

  const orderM = order === 'desc' ? -1 : 1;

  User.find(condition)
    .limit(limit)
    .skip(skip)
    .sort({ [sort]: orderM })
    .then((products) => res.json(products))
    .catch((e) => {
      debug(`Error: ${e.message}`);
      next(e);
    });
};

exports.schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),

  name: Joi.string()
    .min(3)
    .max(30),
});
