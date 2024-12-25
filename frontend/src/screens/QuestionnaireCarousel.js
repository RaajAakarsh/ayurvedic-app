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
  const [showFact, setShowFact] = useState(false);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev };
      if (!newAnswers[currentQuestion]) {
        newAnswers[currentQuestion] = [];
      }

      // Add or remove the answer from the array
      const selectedAnswersForCurrentQuestion = newAnswers[currentQuestion];
      if (selectedAnswersForCurrentQuestion.includes(answer)) {
        newAnswers[currentQuestion] = selectedAnswersForCurrentQuestion.filter(item => item !== answer);
      } else {
        newAnswers[currentQuestion] = [...selectedAnswersForCurrentQuestion, answer];
      }

      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion === 1) {
      // Show the fact after the user selects an option on the second question
      setShowFact(true);

      // After the fact is shown, move to the next question after a brief delay
      setIsTransitioning(true);
      setTimeout(() => {
        setShowFact(false);
        setIsTransitioning(false);
        setCurrentQuestion(2); // Move to the 3rd question
      }, 3000); // Fact shows for 5 seconds before moving to the next question
    } else if (currentQuestion < questions.length - 1) {
      // If not on the second question, just move to the next question
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
        if (currentQuestion === 2) {
          setShowFact(false); // Reset fact if moving backwards
        }
      }, 500);
    }
  };

  // Check if the current question has selected answers
  const isNextDisabled = (currentQuestion === 1 && (!selectedAnswers[currentQuestion] || selectedAnswers[currentQuestion].length === 0)); // Disable next on Q2 until options are selected
  const isPrevDisabled = currentQuestion === 0; // Disable prev on Q1
  const isNextForCurrentDisabled = currentQuestion === 2 || isNextDisabled;

  // Disable navigation buttons for non-active questions
  const isNavigationDisabled = (index) => {
    return index !== currentQuestion;
  };

  return (
    <div className="carousel-container">
      <div className={`carousel ${isTransitioning ? 'transitioning' : ''}`}>
        <div className="card-container" style={{ transform: `translateX(-${currentQuestion * 100}%)` }}>
          {questions.map((question, index) => {
            // If we are on the second question and the fact is to be shown
            if (index === 1 && showFact) {
              return (
                <div key={index} className="card">
                  <h2>Fun Fact!</h2>
                  <p>Did you know? The average person spends 6 hours per week on personal development!</p>
                  <div className="navigation-buttons">
                    <button
                      className="prev-button"
                      onClick={handlePrevious}
                      disabled={isPrevDisabled || isNavigationDisabled(index)}
                    >
                      Previous
                    </button>
                    <button
                      className="next-button"
                      onClick={handleNext}
                      disabled={isNextForCurrentDisabled || isNavigationDisabled(index)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              );
            }

            // For all other questions (including the second question before the fact is shown)
            return (
              <div key={index} className="card">
                <h2>{question.text}</h2>
                <div className="options-grid">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      className={`option-button ${selectedAnswers[currentQuestion]?.includes(option) ? 'selected' : ''}`}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={isNavigationDisabled(index)} // Disable options for non-active questions
                    >
                      {option}
                      <input
                        type="checkbox"
                        checked={selectedAnswers[currentQuestion]?.includes(option)}
                        onChange={() => handleAnswerSelect(option)}
                        className="checkbox"
                      />
                    </button>
                  ))}
                </div>
                <div className="navigation-buttons">
                  <button
                    className="prev-button"
                    onClick={handlePrevious}
                    disabled={isPrevDisabled || isNavigationDisabled(index)}
                  >
                    Previous
                  </button>
                  <button
                    className="next-button"
                    onClick={handleNext}
                    disabled={isNextDisabled || isNextForCurrentDisabled || isNavigationDisabled(index)}
                  >
                    Next
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireCarousel;
