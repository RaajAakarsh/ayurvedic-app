import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./YogaPositions.css";

const yogaPositions = [
  { id: 1, name: "Downward Dog", image: "downward-dog.jpg", description: "A classic pose that stretches and strengthens the entire body." },
  { id: 2, name: "Tree Pose", image: "tree-pose.jpg", description: "Improves balance, focus and strengthens the legs and core." },
  { id: 3, name: "Warrior II", image: "warrior-ii.jpg", description: "Builds strength in the legs and opens the hips and chest." },
  { id: 4, name: "Bridge Pose", image: "bridge-pose.jpg", description: "Stretches the chest, neck, and spine while strengthening the back muscles." },
  { id: 5, name: "Child's Pose", image: "child-pose.jpg", description: "A restful pose that gently stretches the lower back, hips, and shoulders." },
];

const YogaPositions = () => {
  const bgRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.update();
        updateActiveSlideBackground();
      }
    };

    const updateActiveSlideBackground = () => {
      if (!swiperRef.current || !bgRef.current) return;
      
      const activeSlide = document.querySelector('.swiper-slide-active');
      if (!activeSlide) return;
      
      const sliderItem = activeSlide.querySelector('.news__item');
      if (!sliderItem) return;
      
      const rect = sliderItem.getBoundingClientRect();
      const bg = bgRef.current;
      
      bg.classList.add('active');
      bg.style.width = `${rect.width}px`;
      bg.style.height = `${rect.height}px`;
      bg.style.transform = `translateX(${rect.left}px) translateY(${rect.top}px)`;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSlideChange = () => {
    document.querySelectorAll('.news__item').forEach(item => {
      item.classList.remove('active');
    });
  };

  const handleSlideChangeTransitionEnd = () => {
    if (!bgRef.current) return;
    
    const activeSlide = document.querySelector('.swiper-slide-active');
    if (!activeSlide) return;
    
    const sliderItem = activeSlide.querySelector('.news__item');
    if (!sliderItem) return;
    
    sliderItem.classList.add('active');
    
    const rect = sliderItem.getBoundingClientRect();
    const bg = bgRef.current;
    
    bg.classList.add('active');
    bg.style.width = `${rect.width}px`;
    bg.style.height = `${rect.height}px`;
    bg.style.transform = `translateX(${rect.left}px) translateY(${rect.top}px)`;
  };

  const handleMouseOver = (e) => {
    if (window.innerWidth <= 800) return;
    
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    const bg = bgRef.current;
    
    if (!bg) return;
    
    document.querySelectorAll('.news__item').forEach(el => {
      el.classList.remove('active');
    });
    
    bg.classList.add('active');
    bg.style.width = `${rect.width}px`;
    bg.style.height = `${rect.height}px`;
    bg.style.transform = `translateX(${rect.left}px) translateY(${rect.top}px)`;
  };

  const handleMouseLeave = () => {
    if (window.innerWidth <= 800) return;
    
    const bg = bgRef.current;
    if (!bg) return;
    
    bg.classList.remove('active');
    document.querySelectorAll('.news__item').forEach(el => {
      el.classList.remove('active');
    });
  };

  return (
    <div className="wrapper">
      
      <div className="item-bg" ref={bgRef}></div>

      <div className="yoga-carousel-container news-slider">
        <h2 className="carousel-title">Yoga Positions</h2>
        <Swiper
          ref={swiperRef}
          modules={[EffectCoverflow, Navigation, Pagination, Keyboard]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 3,
            slideShadows: false
          }}
          keyboard={{
            enabled: true
          }}
          navigation={{
            nextEl: '.news-slider-next',
            prevEl: '.news-slider-prev'
          }}
          pagination={{
            el: '.news-slider__pagination',
            clickable: true
          }}
          speed={300}
          spaceBetween={0}
          onSlideChange={handleSlideChange}
          onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
          onInit={handleSlideChangeTransitionEnd}
          className="news-slider__wrp"
        >
          {yogaPositions.map((pose) => (
            <SwiperSlide key={pose.id} className="news-slider__item">
              <a href="#" className="news__item" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
                <div className="news-date">
                  <span className="news-date__title">{pose.id}</span>
                  <span className="news-date__txt">Pose</span>
                </div>
                <div className="news__title">
                  {pose.name}
                </div>
                <p className="news__txt">
                  {pose.description}
                </p>
                <div className="news__img">
                  <img src={pose.image} alt={pose.name} />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="news-slider__ctr">
          <div className="news-slider__arrows">
            <button className="news-slider__arrow news-slider-prev">
              <span className="icon-font">
                <svg className="icon icon-arrow-left"><use xlinkHref="#icon-arrow-left"></use></svg>
              </span>
            </button>
            <button className="news-slider__arrow news-slider-next">
              <span className="icon-font">
                <svg className="icon icon-arrow-right"><use xlinkHref="#icon-arrow-right"></use></svg>
              </span>
            </button>
          </div>
          <div className="news-slider__pagination"></div>
        </div>
      </div>

      <svg hidden="hidden">
        <defs>
          <symbol id="icon-arrow-left" viewBox="0 0 32 32">
            <title>arrow-left</title>
            <path d="M0.704 17.696l9.856 9.856c0.896 0.896 2.432 0.896 3.328 0s0.896-2.432 0-3.328l-5.792-5.856h21.568c1.312 0 2.368-1.056 2.368-2.368s-1.056-2.368-2.368-2.368h-21.568l5.824-5.824c0.896-0.896 0.896-2.432 0-3.328-0.48-0.48-1.088-0.704-1.696-0.704s-1.216 0.224-1.696 0.704l-9.824 9.824c-0.448 0.448-0.704 1.056-0.704 1.696s0.224 1.248 0.704 1.696z"></path>
          </symbol>
          <symbol id="icon-arrow-right" viewBox="0 0 32 32">
            <title>arrow-right</title>
            <path d="M31.296 14.336l-9.888-9.888c-0.896-0.896-2.432-0.896-3.328 0s-0.896 2.432 0 3.328l5.824 5.856h-21.536c-1.312 0-2.368 1.056-2.368 2.368s1.056 2.368 2.368 2.368h21.568l-5.856 5.824c-0.896 0.896-0.896 2.432 0 3.328 0.48 0.48 1.088 0.704 1.696 0.704s1.216-0.224 1.696-0.704l9.824-9.824c0.448-0.448 0.704-1.056 0.704-1.696s-0.224-1.248-0.704-1.664z"></path>
          </symbol>
        </defs>
      </svg>
    </div>
  );
};

export default YogaPositions;