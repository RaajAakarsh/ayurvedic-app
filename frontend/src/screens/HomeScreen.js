import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css'; // Import the CSS
import logo from '../media/logo.png'; // Import the logo
import homebg from '../media/homebg.png'; // Import the background image
import QuestionnaireCarousel from './QuestionnaireCarousel';

function HomeScreen() {
  const navigate = useNavigate();

  const handleConsultButtonClick = () => {
    navigate('/signin');
  };

  return (
    <div className="homeScreen" style={{ backgroundImage: `url(${homebg})` }}>
      <div className="topSection">
        <h1 className="h">AYURVEDIC CONSULTATIONS</h1>
          <button
            className="consult-btn"
            onClick={handleConsultButtonClick}
          >
            Consult an Ayurvedic Doctor <br /> Book a Session
          </button>
      </div>
      <div className="bottomSection" >
        <QuestionnaireCarousel />
      </div>
    </div>
  );
}

export default HomeScreen;
