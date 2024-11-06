import React, { useState, useEffect } from "react";
import "./AppointmentSlots.css"; // Ensure CSS is correctly linked

function AppointmentSlots() {
  const [appointments, setAppointments] = useState([]); // State to store the fetched appointments
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error

  const email = localStorage.getItem("email"); // Get the logged-in doctor's email

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/bookings/bookings"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();

        // Log the response data to check its structure
        console.log("Fetched data:", data);

        // Filter the appointments based on the doctor's email and requestAccept being 'y'
        const filteredAppointments = data.bookings.filter(
          (appointment) =>
            appointment.doctorEmail === email &&
            appointment.requestAccept === "y"
        );

        setAppointments(filteredAppointments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="appointments-container">
      <h1>My Appointment Slots</h1>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((appointment) => (
          <div key={appointment._id} className="appointment-card">
            <div className="appointment-timing">
              <h2>{appointment.timeSlot}</h2>
            </div>
            <div className="appointment-details">
              <p>
                <strong>Name of the Patient:</strong> {appointment.patientName}
              </p>
              <p>
                <strong>Patient Email:</strong>{" "}
                {appointment.patientEmail || "No email available"}
              </p>
            </div>
            <div className="appointment-details">
              <p>
                <strong>Gender:</strong> {appointment.patientGender}
              </p>
              <p>
                <strong>Age:</strong>{" "}
                {appointment.patientAge || "No email available"}
              </p>
            </div>
            <div className="appointment-actions">
              <button className="action-button">Send Meet Link</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AppointmentSlots;
