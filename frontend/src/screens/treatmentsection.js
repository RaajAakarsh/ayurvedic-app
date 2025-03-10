import './treatmentsection.css';
import React, { useState } from 'react';

const medicines = [
  { name: 'Ashwagandha Capsules', price: '₹499', image: 'https://via.placeholder.com/150' },
  { name: 'Triphala Churna', price: '₹349', image: 'https://via.placeholder.com/150' },
  { name: 'Brahmi Syrup', price: '₹299', image: 'https://via.placeholder.com/150' },
  { name: 'Neem Tablets', price: '₹399', image: 'https://via.placeholder.com/150' },
  { name: 'Amla Powder', price: '₹259', image: 'https://via.placeholder.com/150' },
  { name: 'Shilajit Resin', price: '₹899', image: 'https://via.placeholder.com/150' },
  { name: 'Giloy Juice', price: '₹599', image: 'https://via.placeholder.com/150' },
  { name: 'Moringa Capsules', price: '₹699', image: 'https://via.placeholder.com/150' },
  { name: 'Turmeric Tablets', price: '₹399', image: 'https://via.placeholder.com/150' },
  { name: 'Herbal Tea', price: '₹199', image: 'https://via.placeholder.com/150' },
  { name: 'Ayurvedic Face Cream', price: '₹499', image: 'https://via.placeholder.com/150' },
  { name: 'Chyawanprash', price: '₹549', image: 'https://via.placeholder.com/150' },
  { name: 'Herbal Shampoo', price: '₹349', image: 'https://via.placeholder.com/150' },
  { name: 'Joint Pain Oil', price: '₹799', image: 'https://via.placeholder.com/150' },
  { name: 'Aloe Vera Gel', price: '₹299', image: 'https://via.placeholder.com/150' }
];

const Medicines = () => {
  const [visibleCount, setVisibleCount] = useState(5);

  const showMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 5, medicines.length));
  };

  return (
    <section className="medicines-section">
      <div className="medicines-header">
        <h2 className="section-title">Explore All Medicines</h2>
      </div>
      <div className="medicines-grid">
        {medicines.slice(0, visibleCount).map((medicine, index) => (
          <div className="medicine-cardt" key={index}>
            <img src={medicine.image} alt={medicine.name} className="medicine-image" />
            <h3 className="medicine-name">{medicine.name}</h3>
            <p className="medicine-price">{medicine.price}</p>
          </div>
        ))}
      </div>
      {visibleCount < medicines.length && (
        <button className="see-more-btn" onClick={showMore}>See More</button>
      )}
    </section>
  );
};

export default Medicines;