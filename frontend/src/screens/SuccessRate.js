import React from 'react';
import './SuccessRate.css'; // Make sure your CSS is imported

const SuccessRate = () => {
  return (
    <div className="success-rate-wrapper">
      <div className="success-rate-container">
        <div className="success-rate-content">
          <h2 className="success-rate-title">99% Success in 3 Months</h2>
          <p className="success-rate-description">
            Join thousands of satisfied customers who saw results in just three months.
          </p>
        </div>
        <div className="image-wrapper">
          {/* Using a random image from Unsplash */}
          <img
            src="https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQxfF9oYi1kbDRRLTRVfHxlbnwwfHx8fHw%3D"
            alt="success-rate-info"
            className="success-rate-image"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessRate;
