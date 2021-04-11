const debug = require('debug')('shoppingcart:product-controller');
const Joi = require('joi');
const Product = require('../models/Product');

/**
 * Get Product.
 * @property {string} req.params.id - The id of product.
 * @returns {Product}
 */

exports.get = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => res.json(product))
    .catch((err) => {
      debug(`Error: ${err.message}`);
      return res.status(404).send({ error: err.message });
    });
};

/**
 * Create new product
 * @property {string} req.body.name - The name of product.
 * @property {string} req.body.category - The category of product.
 * @property {string} req.body.brand - The brand of product.
 * @property {number} req.body.price - The price of product.
 * @property {number} req.body.quantity - The quantity of product.
 * @property {string} req.body.specs - The specs of product.
 * @returns {Product}
 */

exports.create = (req, res, next) => {
  const productData = {
    name: req.body.name,
    category: req.body.category,
    brand: req.body.brand,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  if (req.body.specs) {
    productData.specs = req.body.specs;
  }
  const product = new Product(productData);

  product
    .save()
    .then((savedProduct) => res.json(savedProduct))
    .catch((e) => next(e));
};

/**
 * Update existing product
 * @property {string} req.params.id - The id of product.
 * @property {string} req.body.name - The name of product.
 * @property {string} req.body.category - The category of product.
 * @property {string} req.body.brand - The brand of product.
 * @property {number} req.body.price - The price of product.
 * @property {number} req.body.quantity - The quantity of product.
 * @property {string} req.body.specs - The specs of product.
 * @returns {Product}
 */
exports.update = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id).then((prod) => {
    // return res.json(product);
    const product = prod;
    product.name = req.body.name ? req.body.name : product.name;
    product.brand = req.body.brand ? req.body.brand : product.brand;
    product.category = req.body.category ? req.body.category : product.category;
    product.model = req.body.model ? req.body.model : product.model;
    product.specs = req.body.specs ? req.body.specs : product.specs;
    product.quantity = req.body.quantity ? req.body.quantity : product.quantity;
    product.price = req.body.price ? req.body.price : product.price;

    product
      .save()
      .then((savedProduct) => res.json(savedProduct))
      .catch((e) => next(e));
  })
    .catch((err) => {
      debug(`Error: ${err.message}`);
      return res.status(404).send({ error: err.message });
    });
};

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
    category = '', brand = '', sort = 'createdAt', order = 'desc', limit = 50, skip = 0,
  } = req.query;

  let condition;

  if (brand) condition.brand = brand;
  if (category) condition.category = category;

  const orderM = order === 'desc' ? -1 : 1;

  Product.find(condition)
    .limit(limit)
    .skip(skip)
    .sort({ [sort]: orderM })
    .then((products) => res.json(products))
    .catch((e) => next(e));
};

/**
 * Delete Product.
 * @property {string} req.params.id - The id of product.
 * @returns {num_rows_affected}
 */
exports.remove = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .remove()
    .then((product) => res.json(product))
    .catch((e) => {
      debug(`Error: ${e.message}`);
      next(e);
    });
};

/**
 * Schema to validate params
 */
exports.schema = Joi.object({
  name: Joi.string()
    .required(),
  category: Joi.string()
    .required(),
  brand: Joi.string()
    .required(),
  model: Joi.string(),
  price: Joi.number()
    .required(),
  quantity: Joi.number()
    .required(),

});
