import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TreatmentDetails.css';

const treatmentData = {
  'Digestive Health': {
    description: 'Digestive health focuses on maintaining a healthy digestive system, including the stomach and intestines.',
    items: {
      'Acid Reflux': 'Acid reflux is a condition where stomach acid flows back into the esophagus, causing discomfort.',
      'Constipation': 'A condition in which bowel movements become difficult and less frequent.',
      'Diarrhea': 'Frequent loose or watery bowel movements, often caused by infections or dietary issues.',
      'Indigestion': 'A discomfort in the stomach often after eating, causing bloating or nausea.',
      'Irritable Bowel Syndrome (IBS)': 'A chronic condition affecting bowel movements, often triggered by stress or diet.',
    },
  },
  'Respiratory Health': {
    description: 'Respiratory health focuses on maintaining healthy lungs and airways.',
    items: {
      'Asthma': 'A chronic condition causing airway inflammation and difficulty in breathing.',
      'Bronchitis': 'Inflammation of the bronchial tubes, leading to cough and mucus production.',
      'Common Cold': 'A viral infection affecting the nose and throat, causing congestion and sneezing.',
      'Cough': 'A reflex action to clear the throat and airways of mucus or irritants.',
      'Sinusitis': 'Inflammation of the sinuses, often caused by infections or allergies.',
    },
  },
  'Skin Care': {
    description: 'Skin care involves maintaining the health of the skin through proper hygiene and treatments.',
    items: {
      'Acne': 'A skin condition causing pimples due to blocked hair follicles and oil glands.',
      'Eczema': 'A condition that causes inflamed, itchy, and red skin.',
      'Psoriasis': 'A chronic autoimmune condition that results in scaly patches on the skin.',
      'Rashes': 'Temporary outbreaks of red, itchy, or inflamed skin.',
      'Skin Allergies': 'Reactions of the skin to allergens, causing redness, swelling, or irritation.',
    },
  },
};

function TreatmentDetailsScreen() {
  const { category } = useParams();
  const navigate = useNavigate();
  const details = treatmentData[decodeURIComponent(category)];

  if (!details) {
    return <h2>Category not found.</h2>;
  }

  return (
    <div className="treatment-details">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h1>{category}</h1>
      <p>{details.description}</p>
      <h2>Common Conditions</h2>
      <ul>
        {Object.keys(details.items).map((item, index) => (
          <li key={index}><strong>{item}:</strong> {details.items[item]}</li>
        ))}
      </ul>
    </div>
  );
}

export default TreatmentDetailsScreen;
