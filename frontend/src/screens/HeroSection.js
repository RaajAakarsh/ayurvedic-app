import React from 'react';
import { useNavigate } from 'react-router-dom';
import v from '../media/mov_bbb.mp4';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  const handleConsultButtonClick = () => {
    navigate('/signin');
  };

  return (
    <div className="hero-section" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video autoPlay muted loop style={{ width: '100%', height: '100%', objectFit: 'cover', marginRight:"-10px" }}>
        <source src={v} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Hero Content */}
      <div className="hero-content" style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Find Relief from Piles, Fistula & Hemorrhoids</h2>
        <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Expert Treatment for a Pain-Free Life</p>

        <button
          className="consult-btn"
          onClick={handleConsultButtonClick}
          style={{
            marginTop: '1.5rem',
            padding: '10px 20px',
            fontSize: '1.2rem',
            backgroundColor: '#6b8e23',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Book Your Appointment Today
        </button>

        {/* Tabbed Navigation */}
        <div className="treatment-tabs" style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#fff',
            color: '#6b8e23',
            border: '1px solid #6b8e23',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Piles Treatment</button>

          <button style={{
            padding: '10px 20px',
            backgroundColor: '#fff',
            color: '#6b8e23',
            border: '1px solid #6b8e23',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Fistula Treatment</button>

          <button style={{
            padding: '10px 20px',
            backgroundColor: '#fff',
            color: '#6b8e23',
            border: '1px solid #6b8e23',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Hemorrhoids Treatment</button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
