// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  medicine: {
    name: String,
    price: Number,
    image: String,
  },
  quantity: Number,
  totalPrice: Number,
  buyer: {
    firstName: String,
    lastName: String,
    userId: mongoose.Schema.Types.ObjectId,
  },
  status: {
    type: String,
    enum: ['received', 'sent', 'accepted', 'rejected'],
    default: 'received',
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
