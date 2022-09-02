const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name must required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price must required'],
  },
  image: {
    type: String,
    required: [true, 'Product image must required'],
  },
});

module.exports = mongoose.model('Product', ProductSchema);
