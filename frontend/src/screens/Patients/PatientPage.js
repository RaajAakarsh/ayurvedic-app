import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientPage.css"; // Import the CSS file for styling
import { AuthContext } from "../../context/AuthContext";

// Import images for each service category
import doctorImage from "../../media/doctor.png";
import treatmentImage from "../../media/treatment.png";
import yogaImage from "../../media/yoga.jpeg";
import medicineImage from "../../media/medicine.png";
import step1Icon from '../../media/step1.png';  // Import icons for steps
import step2Icon from '../../media/step2.png';
import step3Icon from '../../media/step3.png';
import step4Icon from '../../media/step4.png';

function PatientPage() {
  const { auth, setAuth } = useContext(AuthContext);
  const firstName = auth.user?.firstName || "Patient";
  const navigate = useNavigate();

  const goToAppointedDoctor = () => {
    navigate("/appointed-doctor"); // Navigate to the appointed doctor page
  };

  const goToTreatmentPlans = () => {
    navigate("/treatments"); // Navigate to the treatment plans page
  };

  const goToYogaAndDiet = () => {
    navigate("/diet-yoga"); // Navigate to Yoga and Diet page
  };

  const goToMedicines = () => {
    navigate("/medicines"); // Navigate to the Ayurvedic medicines page
  };

  const handleOpenPrakritiForm = () => {
    // Redirect to Prakriti Determination form page or show modal for the form
    navigate("/prakritidetermination"); // Assume you have a page for this.
  };

  return (
    <div className="patient-container">
      <main className="content">
        {/* Greeting Message */}
        <h1>Hi {firstName}!</h1>
        <p>
          Welcome back to your Ayurvedic wellness journey. We're here to help
          you achieve balance and harmony in your life.
        </p>

        {/* Match Doctor Automatically Button */}
        <div className="match-section">
          {/*<button className="match-btn">Match Me Automatically</button>*/}
          <button
            className="match-btn"
            onClick={handleOpenPrakritiForm}
          >
            Prakriti Determination
          </button>
          <p>
            Let us find the perfect Ayurvedic doctor for you based on your
            needs.
          </p>
        </div>

        {/* Key Services Section */}
        <section className="services-section">
          <h2>What can we help you with today?</h2>
          <div className="services-cards">
            <div className="service-card" onClick={goToAppointedDoctor}>
              <img
                src={doctorImage}
                alt="Appointed Doctor"
                className="service-image"
              />
              <h3>Your Appointed Doctor</h3>
              <p>
                View the details of your currently assigned Ayurvedic doctor.
              </p>
            </div>
            <div className="service-card" onClick={goToTreatmentPlans}>
              <img
                src={treatmentImage}
                alt="Treatment Plans"
                className="service-image"
              />
              <h3>Treatment Plans</h3>
              <p>
                Explore personalized Ayurvedic treatment plans designed for your
                needs.
              </p>
            </div>
            <div className="service-card" onClick={goToYogaAndDiet}>
              <img
                src={yogaImage}
                alt="Yoga & Diet"
                className="service-image"
              />
              <h3>Yoga & Diet</h3>
              <p>
                Discover Ayurvedic yoga practices and diet recommendations for
                better health.
              </p>
            </div>
            <div className="service-card" onClick={goToMedicines}>
              <img
                src={medicineImage}
                alt="Medicines & Remedies"
                className="service-image"
              />
              <h3>Medicines & Remedies</h3>
              <p>
                Browse our selection of Ayurvedic medicines and natural
                remedies.
              </p>
            </div>
          </div>
        </section>

        <div className="how-we-work">
          <h2 className="hww-heading">How We Work?</h2>
          <div className="hww-content">
            <div className="hww-step">
              <img src={step1Icon} alt="Step 1" className="hww-icon" />
              <div className="hww-step-text">
                <h3>Step 1: Consultation</h3>
                <p>
                  Get a detailed consultation with our expert Ayurvedic doctors.
                </p>
              </div>
            </div>
            <div className="hww-step">
              <img src={step2Icon} alt="Step 2" className="hww-icon" />
              <div className="hww-step-text">
                <h3>Step 2: Diagnosis</h3>
                <p>
                  Receive a comprehensive diagnosis based on your health
                  profile.
                </p>
              </div>
            </div>
            <div className="hww-step">
              <img src={step3Icon} alt="Step 3" className="hww-icon" />
              <div className="hww-step-text">
                <h3>Step 3: Treatment Plan</h3>
                <p>
                  Follow a personalized treatment plan tailored to your needs.
                </p>
              </div>
            </div>
            <div className="hww-step">
              <img src={step4Icon} alt="Step 4" className="hww-icon" />
              <div className="hww-step-text">
                <h3>Step 4: Follow-Up</h3>
                <p>
                  Engage in follow-up sessions to track your progress and adjust
                  the plan if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientPage;
