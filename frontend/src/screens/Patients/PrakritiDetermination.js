import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PrakritiDetermination.css';
import '../SignUpScreen.css';

function PrakritiDetermination() {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/patient-home'); // Navigate to HomeScreen
  };

  const handleSkipClick = () => {
    navigate('/patient-home'); // Navigate to HomeScreen
  };

  return (
    <div className="signup-container">
      <h1>Prakriti Determination Form</h1>
      <p>Unlock personalized care! Complete our Prakriti determination to find the perfect doctor for you based on your needs.</p>
      <form className="signup-form">
        
        {/* Physical Traits */}
        <div className="form-section">
          <h2>Physical Traits</h2>
          <div className="form-group">
            <label>Body Build</label>
            <select required>
              <option value="">Select...</option>
              <option value="thin">Thin</option>
              <option value="wellBuilt">Well-built</option>
            </select>
          </div>
          <div className="form-group">
            <label>Height</label>
            <select required>
              <option value="">Select...</option>
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="tall">Tall</option>
            </select>
          </div>
          <div className="form-group">
            <label>Appearance (Veins/Tendons)</label>
            <select required>
              <option value="">Select...</option>
              <option value="prominent">Prominent</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          {/* New Physical Traits */}
          <div className="form-group">
            <label>Skin Texture</label>
            <select required>
              <option value="">Select...</option>
              <option value="dry">Dry</option>
              <option value="oily">Oily</option>
              <option value="combination">Combination</option>
            </select>
          </div>
          <div className="form-group">
            <label>Hair Type</label>
            <select required>
              <option value="">Select...</option>
              <option value="thin">Thin</option>
              <option value="thick">Thick</option>
              <option value="curly">Curly</option>
            </select>
          </div>
          <div className="form-group">
            <label>Voice Quality</label>
            <select required>
              <option value="">Select...</option>
              <option value="soft">Soft</option>
              <option value="moderate">Moderate</option>
              <option value="loud">Loud</option>
            </select>
          </div>
        </div>

        {/* Physiological Traits */}
        <div className="form-section">
          <h2>Physiological Traits</h2>
          <div className="form-group">
            <label>Digestion</label>
            <select required>
              <option value="">Select...</option>
              <option value="regular">Regular</option>
              <option value="irregular">Irregular</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
          <div className="form-group">
            <label>Body Temperature</label>
            <select required>
              <option value="">Select...</option>
              <option value="cold">Feels Cold Easily</option>
              <option value="hot">Feels Hot Easily</option>
            </select>
          </div>
          <div className="form-group">
            <label>Thirst Level</label>
            <select required>
              <option value="">Select...</option>
              <option value="frequent">Frequent</option>
              <option value="normal">Normal</option>
              <option value="intense">Intense</option>
            </select>
          </div>
          <div className="form-group">
            <label>Sleeping Pattern (Hours per Night)</label>
            <input type="number" placeholder="e.g., 7" required />
          </div>
          <div className="form-group">
            <label>Appetite</label>
            <select required>
              <option value="">Select...</option>
              <option value="strong">Strong</option>
              <option value="weak">Weak</option>
              <option value="irregular">Irregular</option>
            </select>
          </div>
          <div className="form-group">
            <label>Dietary Habits</label>
            <select required>
              <option value="">Select...</option>
              <option value="heavy">Heavy</option>
              <option value="medium">Medium</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>

        {/* Psychological Traits */}
        <div className="form-section">
          <h2>Psychological Traits</h2>
          <div className="form-group">
            <label>Decision-Making Ability</label>
            <select required>
              <option value="">Select...</option>
              <option value="often">Often Changes Decisions</option>
              <option value="sometimes">Sometimes Changes Decisions</option>
              <option value="rarely">Rarely Changes Decisions</option>
            </select>
          </div>
          <div className="form-group">
            <label>Comprehension/Grasping Power</label>
            <select required>
              <option value="">Select...</option>
              <option value="quick">Quick</option>
              <option value="delayed">Delayed</option>
            </select>
          </div>
        </div>

        {/* Behavioral Traits */}
        <div className="form-section">
          <h2>Behavioral Traits</h2>
          <div className="form-group">
            <label>Politeness</label>
            <select required>
              <option value="">Select...</option>
              <option value="polite">Polite/Humble</option>
              <option value="sometimes">Sometimes Polite</option>
              <option value="rarely">Rarely Polite</option>
            </select>
          </div>
          <div className="form-group">
            <label>Emotional Stability</label>
            <select required>
              <option value="">Select...</option>
              <option value="calm">Calm and Composed</option>
              <option value="balanced">Balanced</option>
              <option value="easilyDisturbed">Easily Disturbed</option>
            </select>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="button-container">
          <button type="button" className="skip-btn" onClick={handleSkipClick}>Skip →</button>
          <button type="button" className="next-btn" onClick={handleNextClick}>Next →</button>
        </div>
      </form>
    </div>
  );
}

export default PrakritiDetermination;
