/* eslint consistent-return: off */
const debug = require('debug')('shoppingcart:cart-controller');
const Joi = require('joi');

const Cart = require('../models/Cart');

/**
 * Update product in cart.
 * if not exist, add product to cart
 * if exist, update product quantity
 * qty = 0, delete product from cart
 *
 * @property {string} req.query.username
 * @property {string} req.query.product_id
 * @property {number} req.query.qty
 * @returns {Cart}
 */

exports.update = (req, res) => {
  const { username } = req.user; // get the username from session

  const { productId } = req.body;
  const qty = Number.parseInt(req.body.qty, 10);
  if (qty < 0) return res.status(400).send({ error: 'Quantity must be greater than 0' });

  Cart.findOne({ username })
    .then((cartFound) => {
      const cart = cartFound;
      if (!cart && qty === 0) {
        return res.status(400).send({ error: 'Quantity must be greater than 0' });
      } if (cart) {
        const index = cart.items.findIndex((item) => item.product_id === productId);
        if (index !== -1 && qty === 0) {
          cart.items.splice(index, 1);
        } else if (index !== -1) {
          cart.items[index].qty = qty;
        } else if (qty > 0) {
          cart.items.push({
            product_id: productId,
            qty,
          });
        }
        return cart.save();
      }
      const data = {
        username,
        items: [
          {
            product_id: productId,
            qty,
          },
        ],
      };
      const cartNew = new Cart(data);
      return cartNew.save();
    })
    .then((newCart) => res.json(newCart))
    .catch((err) => {
      debug(`Error: ${err.message}`);
      return res.status(400).send({ error: 'Invalid Request' });
    });
};

/**
 * Get Shopping cart details.
 *
 * @property {string} req.query.username
 * @returns {Cart}
 */

exports.get = (req, res) => {
  const { username } = req.user; // get the username from session

  Cart.findOne({ username })
    .then((cart) => res.json(cart))
    .catch((err) => {
      debug(`Error: ${err.message}`);
      return res.status(400).send({ error: 'Invalid Request' });
    });
};

/**
 * Schema to validate params
 */
exports.schema = Joi.object({
  productId: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  qty: Joi.number()
    .min(0)
    .required(),

});
