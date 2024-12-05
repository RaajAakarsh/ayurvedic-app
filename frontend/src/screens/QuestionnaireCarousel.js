import React, { useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import './QuestionnaireCarousel.css';
import { FcPrevious } from 'react-icons/fc';

const QuestionnaireCarousel = () => {
  const questions = [
    {
      id: 1,
      text: "What's your primary goal?",
      options: [
        "Career Growth",
        "Personal Development", 
        "Financial Success",
        "Work-Life Balance"
      ]
    },
    {
      id: 2,
      text: "How do you prefer to learn?",
      options: [
        "Reading",
        "Watching Videos",
        "Hands-on Practice",
        "Group Discussions"
      ]
    },
    {
      id: 3,
      text: "What motivates you most?",
      options: [
        "Recognition",
        "Personal Satisfaction",
        "Financial Rewards",
        "Making a Difference"
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      console.log('Final Answers:', selectedAnswers);
      alert('Thank you for completing the questionnaire!');
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {currentQuestion > 0 && (
          <button
            className="nav left"
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
          > <TiChevronLeftOutline /> Previous
          </button>
        )}

        <div
          className="card-container"
          style={{
            '--active': 1,
            '--offset': 0,
            '--abs-offset': 0,
          }}
        >
          <div className="card">
            <h2>{questions[currentQuestion].text}</h2>
            <div className="options-grid">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
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
        </div>

        {currentQuestion < questions.length && (
          <button
            className="nav right"
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion]}
          >
            {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
            <TiChevronRightOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireCarousel;
