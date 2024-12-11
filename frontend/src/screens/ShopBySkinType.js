// ShopBySkinType.js
import React from 'react';
import './ShopBySkinType.css'; // Import the specific CSS file for the Shop by Skin Type

const ShopBySkinType = () => {
  return (
    <div className="SkinHealth_skinTypeWrapper__InDhG">
      <div className="ComponentHeader_componentHeaderDesktop__sNo2H ShopBySkinType_sectionHeader__4dj9l">
        <div className="ComponentHeader_headerTitle__oeo_k">
          <h2 className="title3-bold-d title3-bold-m">Shop by skin type</h2>
        </div>
        <i className="icon-info ShopBySkinType_infoIcon__g6QLZ body1-regular-m"></i>
      </div>
      <div className="ShopBySkinType_container__cvZMd">
        {/* Oily Skin Card */}
        <a className="ShopBySkinType_cardContainer__r93Qr ShopBySkinType_longCard__JuzwU" href="/skin/products?skinType=Oily%20skin">
          <div className="Image_wrapper__bkC8Y ShopBySkinType_imageWrapper__AZriZ">
            <img alt="Oily Skin" className="ShopBySkinType_img__SJV_O" src="https://res.cloudinary.com/dmezmffej/image/upload/v1690959928/SkincareAssets/SkinType/Oily_skin.avif" />
          </div>
          <div className="ShopBySkinType_textContainer__fXBb0">
            <div className="ShopBySkinType_title__lstmx body3-semibold-m body1-bold-d">Oily skin</div>
            <div className="ShopBySkinType_description__ltIg9 label3-regular-m body1-regular-d">Greasy with enlarged pores, blackheads, and blemishes</div>
            <div className="ShopBySkinType_rightArrow__1dKY3 fw-8">
              <i className="icon-arrow-right"></i>
            </div>
          </div>
        </a>

        {/* Combination Skin Card */}
        <a className="ShopBySkinType_cardContainer__r93Qr ShopBySkinType_shortCard__d3YWU" href="/skin/products?skinType=Combination%20skin">
          <div className="Image_wrapper__bkC8Y ShopBySkinType_imageWrapper__AZriZ">
            <img alt="Combination Skin" className="ShopBySkinType_img__SJV_O" src="https://res.cloudinary.com/dmezmffej/image/upload/v1690959928/SkincareAssets/SkinType/Combination_skin.avif" />
          </div>
          <div className="ShopBySkinType_textContainer__fXBb0">
            <div className="ShopBySkinType_title__lstmx body3-semibold-m body1-bold-d">Combination skin</div>
            <div className="ShopBySkinType_description__ltIg9 label3-regular-m body1-regular-d">Oily forehead, nose, and chin but drier around the cheeks</div>
            <div className="ShopBySkinType_rightArrow__1dKY3 fw-8">
              <i className="icon-arrow-right"></i>
            </div>
          </div>
        </a>

        {/* Normal Skin Card */}
        <a className="ShopBySkinType_cardContainer__r93Qr ShopBySkinType_shortCard__d3YWU" href="/skin/products?skinType=Normal%20skin">
          <div className="Image_wrapper__bkC8Y ShopBySkinType_imageWrapper__AZriZ">
            <img alt="Normal Skin" className="ShopBySkinType_img__SJV_O" src="https://res.cloudinary.com/dmezmffej/image/upload/v1690959928/SkincareAssets/SkinType/Normal_skin.avif" />
          </div>
          <div className="ShopBySkinType_textContainer__fXBb0">
            <div className="ShopBySkinType_title__lstmx body3-semibold-m body1-bold-d">Normal skin</div>
            <div className="ShopBySkinType_description__ltIg9 label3-regular-m body1-regular-d">Neither too dry, nor too oily, with even tone and smooth texture</div>
            <div className="ShopBySkinType_rightArrow__1dKY3 fw-8">
              <i className="icon-arrow-right"></i>
            </div>
          </div>
        </a>

        {/* Dry Skin Card */}
        <a className="ShopBySkinType_cardContainer__r93Qr ShopBySkinType_longCard__JuzwU" href="/skin/products?skinType=Dry%20skin">
          <div className="Image_wrapper__bkC8Y ShopBySkinType_imageWrapper__AZriZ">
            <img alt="Dry Skin" className="ShopBySkinType_img__SJV_O" src="https://res.cloudinary.com/dmezmffej/image/upload/v1690959927/SkincareAssets/SkinType/Dry_skin.avif" />
          </div>
          <div className="ShopBySkinType_textContainer__fXBb0">
            <div className="ShopBySkinType_title__lstmx body3-semibold-m body1-bold-d">Dry skin</div>
            <div className="ShopBySkinType_description__ltIg9 label3-regular-m body1-regular-d">Dull, dehydrated, almost invisible pores, and unable to retain moisture</div>
            <div className="ShopBySkinType_rightArrow__1dKY3 fw-8">
              <i className="icon-arrow-right"></i>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ShopBySkinType;
