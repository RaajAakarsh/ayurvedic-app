import React, { useState } from 'react';
import './QuestionnaireCarousel.css';

const QuestionnaireCarousel = () => {
  const questions = [
    {
      id: 1,
      text: "What's your primary goal?",
      options: ["Career Growth", "Personal Development", "Financial Success", "Work-Life Balance"],
    },
    {
      id: 2,
      text: "How do you prefer to learn?",
      options: ["Reading", "Watching Videos", "Hands-on Practice", "Group Discussions"],
    },
    {
      id: 3,
      text: "What motivates you most?",
      options: ["Recognition", "Personal Satisfaction", "Financial Rewards", "Making a Difference"],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentQuestion((prev) => prev + 1);
      }, 500);
    } else {
      alert('Thank you for completing the questionnaire!');
      console.log('Final Answers:', selectedAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentQuestion((prev) => prev - 1);
      }, 500);
    }
  };

  return (
    <div className="carousel-container">
      <div className={`carousel ${isTransitioning ? 'transitioning' : ''}`}>
        <div className="card-container" style={{ transform: `translateX(-${currentQuestion * 100}%)` }}>
          {questions.map((question, index) => (
            <div key={index} className="card">
              <h2>{question.text}</h2>
              <div className="options-grid">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    className={`option-button ${
                      selectedAnswers[currentQuestion] === option ? 'selected' : ''
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="navigation-buttons">
                <button
                  className="prev-button"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  className="next-button"
                  onClick={handleNext}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCarousel;
