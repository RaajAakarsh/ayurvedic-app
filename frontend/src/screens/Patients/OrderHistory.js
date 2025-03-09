// src/components/OrderHistory.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './OrderHistory.css';
import { AuthContext } from '../../context/AuthContext';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { auth } = useContext(AuthContext); // Access auth context
  const userId = auth?.user?.id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/user`, {
          params: { userId },
          headers: { Authorization: `Bearer ${auth.token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (userId) fetchOrders();
  }, [userId]);

  return (
    <div className="order-history" style={{ marginTop: '160px' }}>
      <h1>Your Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Item Name:</strong> {order.medicine.name}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
