// ShopByConcern.js
import React from 'react';
import './ShopByConcern.css'; // Import the specific CSS file for Shop by Concern

const ShopByConcern = () => {
  return (
    <div className="SkinHealth_skinConcernWrapper__4RStK">
      <div className="ComponentHeader_componentHeaderDesktop__sNo2H ShopByConcern_sectionHeader__CLeME">
        <div className="ComponentHeader_headerTitle__oeo_k">
          <h2 className="title3-bold-d title3-bold-m">"Are You Suffering from Piles, Fistula or Hemorrhoids?</h2>
          <h4> Chronic pain, discomfort, and embarrassment can affect your daily life. Our expert doctors provide personalized treatment solutions.</h4>
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
          <div className="ShopByConcern_imageWrapper__pz_iH" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?stomach,health)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </a>

        {/* Bleeding or Itching Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Bleeding%20or%20itching">
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Bleeding or itching</h4>
          </div>
          <div className="ShopByConcern_imageWrapper__pz_iH" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?dermatology,skin)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </a>

        {/* Difficulty Sitting or Walking Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Difficulty%20sitting%20or%20walking">
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Difficulty sitting or walking</h4>
          </div>
          <div className="ShopByConcern_imageWrapper__pz_iH" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?arthritis,body)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </a>

        {/* Emotional Distress Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Emotional%20distress">
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Emotional distress</h4>
          </div>
          <div className="ShopByConcern_imageWrapper__pz_iH" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?stress,mental-health)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </a>
      </div>

      {/* Bottom section (3 cards with titles and background images) */}
      <div className="ShopByConcern_container__ZcaN3 bottom-section">
        {/* Skin Ageing Concern Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Skin%20ageing">
          <div className="ShopByConcern_imageWrapper__pz_iH" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?ageing,skin)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Piles Symptoms</h4>
          </div>
        </a>

        {/* Dryness Concern Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Dryness">
          <div className="ShopByConcern_imageWrapper__pz_iH" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?dry,skin)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Fistula Symptoms</h4>
          </div>
        </a>

        {/* Dullness Concern Card */}
        <a className="ShopByConcern_cardContainer__Y1toh" href="/skin/products?skinConcern=Dullness">
          <div className="ShopByConcern_imageWrapper__pz_iH" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?dullness,skin)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div className="ShopByConcern_textContainer__i6UMp">
            <h4 className="ShopByConcern_title__aV3sc">Hemorrhoids Symptoms</h4>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ShopByConcern;
