import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(() => {
    // Retrieve cart items from local storage
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Update local storage whenever cart items change
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(item.quantity + delta, 0) } : item
      );
      return updatedItems.filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image ? `http://localhost:8080/${item.image}` : 'https://via.placeholder.com/100'} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                </div>
                <button onClick={() => handleRemoveItem(item._id)} className="remove-item-btn">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-summary">
        <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
        <Link to="/payment">
          <button className="checkout-btn">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default CartScreen;
