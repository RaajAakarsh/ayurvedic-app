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

    if (currentQuestion < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentQuestion((prev) => prev + 1);
      }, 500); // Delay for smooth transition
    } else {
      alert('Thank you for completing the questionnaire!');
      console.log('Final Answers:', selectedAnswers);
    }
  };

  return (
    <div className="carousel-container">
      <div className={`carousel ${isTransitioning ? 'transitioning' : ''}`}>
        <div
          className="card-container"
          style={{ transform: `translateX(-${currentQuestion * 100}%)` }}
        >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCarousel;
