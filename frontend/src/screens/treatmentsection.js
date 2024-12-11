import React from 'react';
import './treatmentsection.css';  // Importing the CSS file
import logo from '../media/logo.png';  // Importing a logo for demonstration

const treatmentSection = () => {
  return (
    <div className="treatmentsSection">
      <div className="treatmentsHeader">
        <h2 className="treatmentsTitle">
          Expert Treatment Options for <span className="highlightedText">Piles, Fistula</span> & <span className="highlightedText">Hemorrhoids</span>
        </h2>
        <div className="gradientBottomBorder"></div>
      </div>
      
      <div className="treatmentsList">
        {/* Piles Treatment */}
        <div className="treatmentItem">
          <div className="treatmentDetail">
            <p className="treatmentTitle">Piles Treatment</p>
            <p className="treatmentDescription">
              Piles, also known as hemorrhoids, are swollen veins in the rectum and anus. Treatment involves a combination of lifestyle changes, medication, and sometimes surgical intervention.
            </p>
            <h4 className="benefitsTitle highlightedText">Benefits</h4>
            <ul className="benefitsList">
              <li>Reduces pain and inflammation</li>
              <li>Prevents recurrence of piles</li>
              <li>Improves overall digestive health</li>
            </ul>
            <h4 className="procedureTitle highlightedText">Procedure</h4>
            <p className="procedureDescription">
              The procedure may include non-surgical options like rubber band ligation or surgical options like hemorrhoidectomy depending on the severity.
            </p>
          </div>
          <img
            src={logo}
            alt="Piles Treatment"
            className="treatmentImage"
          />
        </div>

        {/* Fistula Treatment */}
        <div className="treatmentItem">
          <div className="treatmentDetail">
            <p className="treatmentTitle">Fistula Treatment</p>
            <p className="treatmentDescription">
              Fistulas are abnormal connections between two body parts, typically occurring near the anal region. Treatment aims to close the fistula and prevent further infections.
            </p>
            <h4 className="benefitsTitle">Benefits</h4>
            <ul className="benefitsList">
              <li>Prevents chronic infections</li>
              <li>Restores normal bodily function</li>
              <li>Promotes faster recovery</li>
            </ul>
            <h4 className="procedureTitle">Procedure</h4>
            <p className="procedureDescription">
              Fistula treatments often include surgery to remove or repair the fistula tract. In some cases, a seton or flap procedure may be used.
            </p>
          </div>
          <img
            src={logo}
            alt="Fistula Treatment"
            className="treatmentImage"
          />
        </div>

        {/* Hemorrhoids Treatment */}
        <div className="treatmentItem">
          <div className="treatmentDetail">
            <p className="treatmentTitle">Hemorrhoids Treatment</p>
            <p className="treatmentDescription">
              Hemorrhoids are swollen veins in the lower rectum or anus. They can cause pain, itching, and bleeding. Treatment may involve medication or surgical procedures.
            </p>
            <h4 className="benefitsTitle">Benefits</h4>
            <ul className="benefitsList">
              <li>Reduces discomfort and itching</li>
              <li>Prevents further bleeding</li>
              <li>Improves overall digestive health</li>
            </ul>
            <h4 className="procedureTitle">Procedure</h4>
            <p className="procedureDescription">
              The treatment options include over-the-counter medications, laser therapy, or surgical procedures like hemorrhoidectomy or stapling.
            </p>
          </div>
          <img
            src={logo}
            alt="Hemorrhoids Treatment"
            className="treatmentImage"
          />
        </div>
      </div>
    </div>
  );
};

export default treatmentSection;
