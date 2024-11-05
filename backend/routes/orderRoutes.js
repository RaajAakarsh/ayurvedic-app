// routes/orderRoutes.js
const express = require('express');
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const router = express.Router();

router.post('/', createOrder); // Patient creating order
router.get('/user', getOrders);    // Retailer fetching orders
router.patch('/status', updateOrderStatus); // Retailer updating status

module.exports = router;
