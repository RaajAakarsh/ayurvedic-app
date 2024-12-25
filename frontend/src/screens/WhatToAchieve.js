import React from 'react';
import './WhatToAchieve.css';
import logo from '../media/logo.png'

const WhatToAchieve = () => {
  return (
    <section className="new-user-homepage-gabit">
      <div className="what-to-achieve-section" id="gabits-section">
        <div className="vector-component-header">
          <h2 className="subtitle">
            <span className="highlight">Gabits</span> to achieve holistic health
          </h2>
          <div className="gradient-bottom-border"></div>
        </div>
        <div className="what-to-achieve-container">
          <div className="example-container">
            <img
              alt="Fitness"
              loading="eager"
              className="gabit-image"
              src={logo}
            />
            <div className="content">
              <p className="heading">Fitness</p>
              <p className="text">
                Personalised fitness plan with LIVE sessions, fitness & habit coach
                interactions, and your Clan!
              </p>
            </div>
          </div>
          <div className="example-container">
            <img
              alt="Nutrition"
              loading="eager"
              className="gabit-image"
              src={logo}
            />
            <div className="content">
              <p className="heading">Nutrition</p>
              <p className="text">
                Personalised plans with bit-by-bit changes, 1:1 coach interactions, and your
                Clan for support!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatToAchieve;
