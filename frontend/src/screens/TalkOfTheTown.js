import React, { useState } from 'react';
import './TalkOfTheTown.css';

const TalkOfTheTown = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const influencers = [
    {
      name: 'Rajiv Makhni',
      title: 'Gabit Smart Ring',
      instagramFollowers: '1.5M',
      youtubeSubscribers: '117K',
      thumbnail: 'https://res.cloudinary.com/dmezmffej/image/upload/v1722071358/Group_3015756_1.avif',
      instagramIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/footerInstagramIcon.607aa012.svg',
      youtubeIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/youtube.61f2e507.svg',
    },
    {
      name: 'Rajiv Makhni 2',
      title: 'Gabit Smart Ring',
      instagramFollowers: '1.5M',
      youtubeSubscribers: '117K',
      thumbnail: 'https://res.cloudinary.com/dmezmffej/image/upload/v1722071358/Group_3015756_1.avif',
      instagramIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/footerInstagramIcon.607aa012.svg',
      youtubeIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/youtube.61f2e507.svg',
    },
    {
      name: 'Rajiv Makhni 3',
      title: 'Gabit Smart Ring',
      instagramFollowers: '1.5M',
      youtubeSubscribers: '117K',
      thumbnail: 'https://res.cloudinary.com/dmezmffej/image/upload/v1722071358/Group_3015756_1.avif',
      instagramIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/footerInstagramIcon.607aa012.svg',
      youtubeIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/youtube.61f2e507.svg',
    },
    {
      name: 'Rajiv Makhni 4',
      title: 'Gabit Smart Ring',
      instagramFollowers: '1.5M',
      youtubeSubscribers: '117K',
      thumbnail: 'https://res.cloudinary.com/dmezmffej/image/upload/v1722071358/Group_3015756_1.avif',
      instagramIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/footerInstagramIcon.607aa012.svg',
      youtubeIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/youtube.61f2e507.svg',
    },
    {
        name: 'Rajiv Makhni 5',
        title: 'Gabit Smart Ring',
        instagramFollowers: '1.5M',
        youtubeSubscribers: '117K',
        thumbnail: 'https://res.cloudinary.com/dmezmffej/image/upload/v1722071358/Group_3015756_1.avif',
        instagramIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/footerInstagramIcon.607aa012.svg',
        youtubeIcon: 'https://assets.prod.gabit.com/2024-12-05-6ac279c/_next/static/media/youtube.61f2e507.svg',
    },
    // Add more influencers here if needed
  ];

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex === 0 ? influencers.length - 3 : prevIndex - 1);
    });
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex === influencers.length - 3 ? 0 : prevIndex + 1);
    });
  };

  return (
    <section className="talk-of-the-town">
      <div className="header1">
        <div className="title">Talk of the Town</div>
        <div className="gradient-border"></div>
      </div>

      <div className="slider-container">
        <div
          className="slick-slider1"
          style={{
            transform: `translateX(-${currentIndex * 340}px)`,
            transition: 'transform 0.3s ease',
          }}
        >
          {influencers.map((influencer, index) => (
            <div className="slick-slide1" key={index}>
              <div className="video-card1">
                <div className="video-thumbnail">
                  <img src={influencer.thumbnail} alt={influencer.name} className="thumbnail-img" />
                </div>
                <div className="content">
                  <p className="influencer-name">{influencer.name}</p>
                  <p className="video-title">{influencer.title}</p>
                  <div className="separator"></div>
                  <div className="social-stats">
                    <div className="stat">
                      <img src={influencer.instagramIcon} alt="Instagram" className="social-icon" />
                      <p className="followers">{influencer.instagramFollowers} followers</p>
                    </div>
                    <div className="stat">
                      <img src={influencer.youtubeIcon} alt="YouTube" className="social-icon" />
                      <p className="followers">{influencer.youtubeSubscribers} subscribers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="arrow-button left" onClick={handleLeftClick}>←</button>
        <button className="arrow-button right" onClick={handleRightClick}>→</button>
      </div>
    </section>
  );
};

export default TalkOfTheTown;
