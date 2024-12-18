// ShopByConcern.js
import React from 'react';
import './ShopByConcern.css'; // Import the specific CSS file for Shop by Concern

// Import images from the media folder
import painfulBowelImage from '../media/bowel.jpg';
import bleedingItchingImage from '../media/bleeding.jpg';
import difficultyWalkingImage from '../media/sitting.jpg';
import emotionalDistressImage from '../media/stress.jpg';

const ShopByConcern = () => {
  return (
    <div className="SkinHealth_skinConcernWrapper__4RStK">
      <div className="ComponentHeader_componentHeaderDesktop__sNo2H ShopByConcern_sectionHeader__CLeME">
        <div className="ComponentHeader_headerTitle__oeo_k">
          <h2 className="title3-bold-d title3-bold-m">Are You Suffering from Piles, Fistula or Hemorrhoids?</h2>
          <h4>Chronic pain, discomfort, and embarrassment can affect your daily life. Our expert doctors provide personalized treatment solutions.</h4>
        </div>
        <i className="icon-info ShopByConcern_infoIcon__dnCMm body1-regular-m"></i>
      </div>

      {/* Top section (4 cards with titles and background images) */}
      <div className="ShopByConcern_container__ZcaN3 top-section">
        {/* Painful Bowel Movements Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Painful%20bowel%20movements">
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Painful bowel movements</h4>
          </div>
          <div
            className="ShopByConcern_imageWrapper__pz_iH"
            style={{
              backgroundImage: `url(${painfulBowelImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </a>

        {/* Bleeding or Itching Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Bleeding%20or%20itching">
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Bleeding or itching</h4>
          </div>
          <div
            className="ShopByConcern_imageWrapper__pz_iH"
            style={{
              backgroundImage: `url(${bleedingItchingImage})`
            }}
          ></div>
        </a>

        {/* Difficulty Sitting or Walking Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Difficulty%20sitting%20or%20walking">
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Difficulty sitting or walking</h4>
          </div>
          <div
            className="ShopByConcern_imageWrapper__pz_iH"
            style={{
              backgroundImage: `url(${difficultyWalkingImage})`
            }}
          ></div>
        </a>

        {/* Emotional Distress Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Emotional%20distress">
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Emotional distress</h4>
          </div>
          <div
            className="ShopByConcern_imageWrapper__pz_iH"
            style={{
              backgroundImage: `url(${emotionalDistressImage})`
            }}
          ></div>
        </a>
      </div>

      {/* Bottom section (3 cards without images) */}
      <div className="ShopByConcern_container__ZcaN3 bottom-section">
        {/* Piles Symptoms Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Piles%20symptoms">
          <div className="ShopByConcern_imageWrapper__pz_iH scard">
            <h4 className="ShopByConcern_title__aV3sc symptoms">Piles Symptoms</h4>
          </div>
        </a>

        {/* Fistula Symptoms Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Fistula%20symptoms">
          <div className="ShopByConcern_imageWrapper__pz_iH scard" >
          <h4 className="ShopByConcern_title__aV3sc symptoms">Fistula Symptoms</h4>
          </div>
        </a>

        {/* Hemorrhoids Symptoms Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Hemorrhoids%20symptoms">
          <div className="ShopByConcern_imageWrapper__pz_iH scard" >
          <h4 className="ShopByConcern_title__aV3sc symptoms">Hemorrhoids Symptoms</h4>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ShopByConcern;
