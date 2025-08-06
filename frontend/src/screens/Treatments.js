import React from 'react';
import './Treatments.css';
import { useNavigate } from 'react-router-dom';

function TreatmentsScreen() {
  const navigate = useNavigate();
  const treatments = [ 
    { category: 'Digestive Health', image: '/images/digestive.jpg' },
    { category: 'Respiratory Health', image: '/images/respiratory.jpg' },
    { category: 'Skin Care', image: '/images/skincare.jpg' },
    { category: 'Joint and Bone Health', image: '/images/joint.jpg' },
    { category: 'Cardiovascular Health', image: '/images/heart.jpg' },
    { category: 'Mental Health and Wellness', image: '/images/mental.jpg' },
    { category: 'Metabolic and Endocrine Health', image: '/images/metabolism.jpg' },
    { category: 'Immune Support', image: '/images/immune.jpg' },
    { category: "Women's Health", image: '/images/women.jpg' },
    { category: "Men's Health", image: '/images/men.jpg' },
    { category: 'Liver and Kidney Health', image: '/images/liver.jpg' },
    { category: 'Eye Health', image: '/images/eye.jpg' },
    { category: 'Oral Health', image: '/images/oral.jpg' },
    { category: 'General Wellness', image: '/images/wellness.jpg' },
    { category: 'Infections', image: '/images/infections.jpg' },
    { category: 'Pain Management', image: '/images/infections.jpg' },
  ];

  return (
    <div className="treatmentsScreen">
      <h1>Treatments</h1>
      <div className="grid-container">
        {treatments.map((treatment, index) => (
          <div 
            key={index} 
            className="grid-item" 
            onClick={() => navigate(`/treatment/${encodeURIComponent(treatment.category)}`)}
          >
            <img src={treatment.image} alt={treatment.category} className="treatment-image"/>
            <h2>{treatment.category}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TreatmentsScreen;
