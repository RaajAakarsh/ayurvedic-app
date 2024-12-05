import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import './QuestionnaireCarousel.css';

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
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 500);
    }
  };

  const movePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const moveNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const submitQuestionnaire = () => {
    console.log('Final Answers:', selectedAnswers);
  };

  return (
    <div className="questionnaire-container">
      <div className="top-bar">
        <img src="/path/to/google-play-badge.png" alt="Get it on Google Play" className="store-badge" />
        <img src="/path/to/app-store-badge.png" alt="Download on the App Store" className="store-badge" />
      </div>
      <div className="questionnaire-card">
        <div className="navigation-arrow left-arrow" onClick={movePrevious} disabled={currentQuestion === 0}>
          <ChevronLeft />
        </div>
        
        <div className="questionnaire-content">
          <div className="questionnaire-header">
            {questions[currentQuestion].text}
          </div>
          
          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswers[currentQuestion] === option ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="navigation-arrow right-arrow" onClick={moveNext} disabled={currentQuestion === questions.length - 1}>
          <ChevronRight />
        </div>

        {currentQuestion === questions.length - 1 && (
          <button 
            className="submit-button"
            onClick={submitQuestionnaire}
            disabled={Object.keys(selectedAnswers).length !== questions.length}
          >
            <CheckCircle2 />
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireCarousel;
