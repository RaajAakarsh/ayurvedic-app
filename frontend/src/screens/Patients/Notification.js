import React from 'react';
import './Notification.css'; // Add any styles you need

const Notification = () => {
  // Sample notifications data, you can replace this with real data from your backend or context
  const notifications = [
    { id: 1, message: "Your appointment is confirmed for tomorrow.", date: "2024-11-04" },
    { id: 2, message: "New consultation available for your preferred doctor.", date: "2024-11-02" },
    { id: 3, message: "Your prescription has been updated.", date: "2024-11-01" },
  ];

  return (
    <div className="notification-container">
      <h2>Your Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <ul>
          {notifications.map(notification => (
            <li key={notification.id}>
              <p>{notification.message}</p>
              <span>{notification.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
