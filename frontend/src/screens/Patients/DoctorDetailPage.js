import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./DoctorDetailPage.css"; // Ensure this path matches the location of your CSS file
import { AuthContext } from "../../context/AuthContext";

function DoctorDetail() {
  const location = useLocation();
  const { doctor } = location.state;

  const { auth } = useContext(AuthContext);
  const patientFirstName = auth.user?.firstName || "Patient";
  const patientLastName = auth.user?.lastName || "";
  const patientGender = auth.user?.gender;
  const patientAge = auth.user?.age;
  const requestAccept = "o";
  const doctorsMessage = "";

  const patientName = patientFirstName + " " + patientLastName;

  const [selectedTime, setSelectedTime] = useState(null); // Track selected time slot
  const [patientIllness, setPatientIllness] = useState(""); // Track patient illness
  const [dateOfAppointment, setDateOfAppointment] = useState(""); // Track the date of appointment

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time); // Set the selected time slot
  };

  const handleBookAppointment = async () => {
    if (selectedTime && patientIllness && dateOfAppointment) {
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");

      console.log(`Selected time: ${selectedTime}`);
      console.log(`Patient Illness: ${patientIllness}`);
      console.log(`User Email: ${email}`);
      console.log(`User Role: ${role}`);

      // Data to be sent to the backend
      let bookingData = {
        doctorName: doctor.name,
        doctorEmail: doctor.email,
        timeSlot: selectedTime,
        dateOfAppointment: dateOfAppointment,
        email: email,
        patientName: patientName,
        patientGender: patientGender,
        patientAge: patientAge,
        patientIllness: patientIllness,
        requestAccept: requestAccept,
        doctorsMessage: doctorsMessage,
        meetLink: "no",
      };

      // Include email only if the role is 'patient'
      if (role === "patient") {
        bookingData.email = email; // Add email to bookingData
        console.log(`User Email: ${email}`);
      } else {
        // If the role is not 'patient', alert the user
        alert("Only patients can book appointments.");
        return; // Exit the function
      }

      try {
        const response = await fetch("http://localhost:8080/api/bookings", {
          // Replace with your API URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData), // Send the doctor and slot data
        });

        const result = await response.json();

        if (response.ok) {
          alert("Appointment booked successfully!");
          console.log("Booking response:", result); // Optional: log the server response
        } else {
          alert(result.error || "Failed to book appointment");
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
      }
    } else {
      console.log("No time slot selected");
    }
  };

  return (
    <div className="doctor-detail-container">
      <div className="left-section">
        <div className="doctor-info">
          <h1>Dr. {doctor.name}</h1>
          <div className="doctor-image"></div>
          <div className="text-info">
            <p>Specialization: {doctor.specialization}</p>
            <p>Experience: {doctor.experience} years</p>
          </div>
        </div>
        <div className="about-doctor">
          <h2>About Doctor</h2>
          <p>Education: {doctor.education}</p>
          <p>Gender: {doctor.gender}</p>
          <p>Age: {doctor.age}</p>
          <p>Location: {doctor.location}</p>
          <p>Price: Rs. {doctor.pricepoint}</p>
          {/* Additional details can be listed here */}
        </div>
      </div>
      <div className="right-section">
        <div className="consultation-info">
          <h2>Consultation Time:</h2>
          <div className="date-input">
            <label htmlFor="dateOfAppointment">Date of Appointment: </label>
            <input
              type="date"
              className="dateOfAppointment"
              value={dateOfAppointment}
              onChange={(e) => setDateOfAppointment(e.target.value)}
              placeholder="dd/mm/yyyy"
              required
            />
          </div>

          <p>Availability:</p>
          <div className="availability-slots">
            {["09:00 AM", "12:00 PM", "03:00 PM"].map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSlotClick(time)} // Handle button click
                className={selectedTime === time ? "selected" : ""} // Add selected class conditionally
              >
                {time}
              </button>
            ))}
          </div>

          <div className="illness-input">
            <label htmlFor="patientIllness">Describe your illness: </label>
            <textarea
              className="patientIllness"
              value={patientIllness}
              onChange={(e) => setPatientIllness(e.target.value)}
              placeholder="Explain in detail about the illness"
              rows="6"
              wrap="soft"
              required
            />
          </div>

          <button className="book-appointment" onClick={handleBookAppointment}>
            Book Appointment
          </button>
        </div>
        <div>
          <p>
            <b>Note: </b> Once, you see the message: "Appointment Booked
            Successfully!", then checkout the "Your Appointed Doctor" section in
            the home page to see whether the doctor has approved your request or
            not.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetail;
