import React, { useState } from 'react';
import './TopTransformationStories.css';
import logo from '../media/logo.png';
import v from '../media/mov_bbb.mp4';

const videos = [
  {
    id: 1,
    title: 'Video 1: Fitness Transformation',
    description: 'Watch how this individual transformed their fitness journey.',
    videoUrl: v,
  },
  {
    id: 2,
    title: 'Video 2: Weight Loss Success',
    description: 'A story of a dramatic weight loss transformation.',
    videoUrl: v,
  },
  {
    id: 3,
    title: 'Video 3: Health Transformation',
    description: 'See how someone changed their life through a health-focused approach.',
    videoUrl: v,
  },
  {
    id: 4,
    title: 'Video 4: Bodybuilding Journey',
    description: 'A bodybuilding transformation story that will inspire you.',
    videoUrl: v,
  },
  {
    id: 5,
    title: 'Video 5: Overcoming Adversity',
    description: 'A powerful story of overcoming challenges through fitness.',
    videoUrl: v,
  },
];

const blogs = [
  {
    id: 1,
    title: 'Blog 1: Mindset for Transformation',
    description: 'How a change in mindset can lead to life transformation.',
    imageUrl: logo,
    link: 'https://bestselfatlanta.com/blog1',
  },
  {
    id: 2,
    title: 'Blog 2: Healthy Eating Tips',
    description: 'Learn the best eating habits to stay fit and healthy.',
    imageUrl: logo,
    link: 'https://bestselfatlanta.com/blog2',
  },
  {
    id: 3,
    title: 'Blog 3: Fitness and Mental Health',
    description: 'Explore the connection between fitness and mental well-being.',
    imageUrl: logo,
    link: 'https://bestselfatlanta.com/blog3',
  },
  {
    id: 4,
    title: 'Blog 4: Overcoming Obstacles',
    description: 'How to push through challenges on your transformation journey.',
    imageUrl: logo,
    link: 'https://bestselfatlanta.com/blog4',
  },
  {
    id: 5,
    title: 'Blog 5: Importance of Rest',
    description: 'Why rest is essential for your fitness and health transformation.',
    imageUrl: logo,
    link: 'https://bestselfatlanta.com/blog5',
  },
];

const CarouselSection = ({ items, sectionType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + items.length) % items.length
    );
  };

  // Create a smooth "infinite" scroll by wrapping around the display items
  const handleVideoClick = (videoElement) => {
    if (videoElement.paused || videoElement.ended) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };
  const displayItems = [
    ...items.slice(currentIndex, currentIndex + itemsToShow),
    ...items.slice(0, Math.max(0, currentIndex + itemsToShow - items.length)),
  ];

  return (
    <div className="carousel-section">
      <h2>{sectionType} Carousel</h2>
      <div className="tcarousel-container">
        <button className="carousel-arrow left" onClick={goToPrevious}>
          ←
        </button>
        <div className="stories-container" >
          {displayItems.map((item) => (
            <div key={item.id} className="carousel-card">
              <div className="carousel-card-inner">
                {sectionType === 'Video' ? (
                  <video
                    className="carousel-video"
                    src={item.videoUrl}
                    preload="metadata"
                    onClick={(e) => handleVideoClick(e.target)}
                    controls={false}
                    style={{ width: '100%', height: 'auto' }}
                  />
                ) : (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <img
                      className="carousel-image"
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  </a>
                )}
                <h3 className="carousel-title">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={goToNext}>
          →
        </button>
      </div>
    </div>
  );
};

const TopTransformation = () => {
  return (
    <div className="top-transformation">
      <CarouselSection items={videos} sectionType="Video" />
      <CarouselSection items={blogs} sectionType="Blog" />
    </div>
  );
};

export default TopTransformation;
