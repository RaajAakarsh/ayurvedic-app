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
    const { userId, retailerId } = req.query; // Capture both userId and retailerId from query parameters
    let orders;

    if (userId) {
      // Fetch orders by userId for patient-specific views
      orders = await Order.find({ 'buyer.userId': userId });
    } else if (retailerId) {
      // Fetch orders for the specific retailer only
      orders = await Order.find({ 'medicine.retailerId': retailerId });
    } else {
      // Fetch all orders for admin or general views
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
