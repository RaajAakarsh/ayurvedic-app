import React from 'react';
import './RequestCallback.css';

const RequestCallback = () => {
  return (
    <section className="new-user-homepage">
      <div className="request-callback-container">
        <div className="request-callback-content">
          <h3 className="title">Request a callback</h3>
          <p className="subtitle">Know more about our plans or Smart Ring</p>
          <div className="right-arrow-wrapper">
            <i className="icon-arrow-right"></i>
          </div>
          <button className="request-callback-btn">Request Callback</button>
        </div>
        <div className="image-wrapper">
          <img
            alt="callback-person-illustration"
            className="callback-image"
            loading="lazy"
            decoding="async"
            src="https://res.cloudinary.com/dmezmffej/image/upload/v1732510727/static/other/request-callback-illustration.avif"
          />
        </div>
      </div>
    </section>
  );
};

export default RequestCallback;
