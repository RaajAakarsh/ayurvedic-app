import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyOrders.css';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('received');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/my-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      <div className="order-tabs">
        <button className={status === 'received' ? 'active' : ''} onClick={() => setStatus('received')}>Received</button>
        <button className={status === 'sent' ? 'active' : ''} onClick={() => setStatus('sent')}>Sent</button>
      </div>
      {orders
        .filter(order => order.status === status)
        .map(order => (
          <div key={order._id} className="order-card">
            <img src={order.medicine.image} alt={`Order ${order._id}`} />
            <div className="order-details">
              <p><strong>Item Name:</strong> {order.medicine.name}</p>
              <p><strong>Price:</strong> ₹{order.medicine.price}</p>
              <p><strong>Total Value:</strong> ₹{order.totalPrice}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Buyer:</strong> {order.buyer.firstName} {order.buyer.lastName}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default MyOrders;
