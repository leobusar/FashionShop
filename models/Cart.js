const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductItemSchema = new Schema({
  product_id: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const CartSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  items: [ProductItemSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('cart', CartSchema);
