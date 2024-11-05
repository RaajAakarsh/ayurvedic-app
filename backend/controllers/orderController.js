// controllers/orderController.js
const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updated getOrders function to retrieve orders by userId
exports.getOrders = async (req, res) => {
  try {
    const userId = req.query.userId; // Capture userId from the query parameters
    let orders;

    if (userId) {
      // Fetch only orders that belong to the specific user
      orders = await Order.find({ 'buyer.userId': userId });
    } else {
      // If no userId is provided, fetch all orders (for admin or retailer views)
      orders = await Order.find();
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
