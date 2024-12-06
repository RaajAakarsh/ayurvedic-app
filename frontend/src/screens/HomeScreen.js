import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeScreen.css'; // Import the CSS
import logo from '../media/logo.png'; // Import the logo
import homebg from '../media/homebg.png'; // Import the background image
import QuestionnaireCarousel from './QuestionnaireCarousel';

function HomeScreen() {
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = [
    {
      image: "https://res.cloudinary.com/dmezmffej/image/upload/v1726465929/Gabit_CGM_1_2.avif",
      alt: "skin-care"
    },
    {
      image: "https://res.cloudinary.com/dmezmffej/image/upload/v1725542162/Gabit_CGM_1_1.avif",
      alt: "skin-care"
    },
    {
      image: "https://res.cloudinary.com/dmezmffej/image/upload/v1709882418/SkincareAssets/LandingPageCarousel/Skin-combos-for-app-1b.avif",
      alt: "skin-care"
    }
  ];

  const handleDotClick = (index) => {
    setActiveSlide(index);
  };

  const handleConsultButtonClick = () => {
    navigate('/signin');
  };

  return (
    <div className="homeScreen" style={{ backgroundImage: `url(${homebg})` }}>
      <div className="topSection">
        <h1 className="h">AYURVEDIC CONSULTATIONS</h1>
        <button className="consult-btn" onClick={handleConsultButtonClick}>
          Consult an Ayurvedic Doctor <br /> Book a Session
        </button>
      </div>
      <div className="bottomSection">
        <QuestionnaireCarousel />
      </div>
      <div className="productSection">
        <div className="productCard">
          <div className="productCardContent">
            <span className="productLabel">INTRODUCING</span>
            <h2 className="productTitle">Gabit Smart Ring</h2>
            <h5 className="productSubTitle">Your complete health loop</h5>
            <div className="productRating">
              <span className="rating">5</span>
              <span className="ratingText">43 Ratings</span>
            </div>
            <div className="productPrice">
              <span className="discountedPrice">₹13110</span>
              <span className="basePrice">₹13800</span>
              <span className="discount">5% off</span>
            </div>
            <p className="emiAvailable">EMI available</p>
            <div className="productFeatures">
              <div className="featureItem">
                <span className="featureTitle">Crafted from titanium</span>
              </div>
              <div className="featureItem">
                <span className="featureTitle">Feather-light experience</span>
              </div>
              <div className="featureItem">
                <span className="featureTitle">Highly accurate</span>
              </div>
            </div>
            <button className="exploreButton">Explore smart ring</button>
          </div>
          <div className="productImage">
            <img
              src="https://res.cloudinary.com/dmezmffej/image/upload/v1721388046/Frame_48098010_2_1.avif"
              alt="Smart Ring"
            />
          </div>
        </div>
      </div>
      {/* New Benefits Section */}
      <div className="benefitsSection">
        <div className="benefitsHeader">
          <h2 className="benefitsTitle">
            Attain your <span className="highlightedText">goals</span> with result-oriented programs
          </h2>
          <div className="gradientBottomBorder"></div>
        </div>
        <div className="benefitsList">
          <div className="benefitItem">
            <img
              src="https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/benefitsWithGabit-1.b7e1f249.webp"
              alt="Weight Loss"
              className="benefitImage"
            />
            <div className="benefitDetail">
              <p className="benefitTitle">Weight Loss</p>
              <p className="benefitDescription">
                Achieve the right weight to live healthily for longer
              </p>
            </div>
          </div>
          <div className="benefitItem">
            <img
              src="https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/benefitsWithGabit-2.4ef7d0ba.webp"
              alt="Stay Fit"
              className="benefitImage"
            />
            <div className="benefitDetail">
              <p className="benefitTitle">Stay Fit</p>
              <p className="benefitDescription">
                Reach and maintain your fittest form & live a healthier and longer life
              </p>
            </div>
          </div>
          <div className="benefitItem">
            <img
              src="https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/benefitsWithGabit-3.04a90767.webp"
              alt="Healthy Skin"
              className="benefitImage"
            />
            <div className="benefitDetail">
              <p className="benefitTitle">Healthy Skin</p>
              <p className="benefitDescription">
                Restore the vitality of your skin with result-oriented products, and Fitness & Nutrition programs
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* whats hot in gabit.................................................................................... */}
      <section className="NewUserHomePage_skinCarouselSection__NAw7l">
        <div className="SkinCarousel_skinHealth__APvJ6">
          <p className="SkinCarousel_heading__LxBzL title1-bold-m heading2-bold-d">
            What's <span> hot </span> at <span> Gabit</span>
          </p>
          <div className="SkinProductsCarousel_skinProductsCarousel__7voFv">
            <div className="CustomSlick_sliderContainer__fY_xB">
              <div className="slick-slider">
                <div className="slick-list">
                  <div
                    className="slick-track"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  >
                    {carouselItems.map((item, index) => (
                      <div
                        key={index}
                        className={`slick-slide ${index === activeSlide ? 'slick-active' : ''}`}
                      >
                        <div className="SkinProductsCarousel_skinProductsCarouselCard__EWrON">
                          <div className="Image_wrapper__bkC8Y">
                            <img
                              alt={item.alt}
                              src={item.image}
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <ul className="slick-dots">
                  {carouselItems.map((_, index) => (
                    <li key={index} className={index === activeSlide ? 'slick-active' : ''}>
                      <button onClick={() => handleDotClick(index)}>{index + 1}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
