import React, { useState, useEffect } from "react";
import "./PatientList.css"; // Ensure this CSS file is linked

function PatientList() {
  const [activeTab, setActiveTab] = useState("Previous");
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [deniedAppointments, setDeniedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem("email"); // Assuming the doctor's email is stored in localStorage

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/bookings/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        const currentDate = new Date();

        // Filter appointments for the logged-in doctor
        const doctorAppointments = data.bookings.filter(
          (booking) => booking.doctorEmail === email
        );

        // Sort appointments into previous and denied
        const sortedAppointments = doctorAppointments.reduce(
          (acc, booking) => {
            const appointmentDate = new Date(booking.dateOfAppointment);
            const isPastAppointment = appointmentDate < currentDate;

            if (booking.requestAccept === "n") {
              acc.denied.push(booking);
            } else if (isPastAppointment) {
              acc.previous.push(booking);
            }

            return acc;
          },
          { previous: [], denied: [] }
        );

        setPreviousAppointments(sortedAppointments.previous);
        setDeniedAppointments(sortedAppointments.denied);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [email]);

  const handleDeleteAppointment = async (bookingId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/delete/${bookingId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }

      // Remove the deleted appointment from the denied list
      setDeniedAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="patient-list-container">
      <h1>Patient List</h1>

      {/* Tabs for Previous Appointments and Denied Requests */}
      <div className="tabs">
        <button
          onClick={() => setActiveTab("Previous")}
          className={`tab ${activeTab === "Previous" ? "active" : ""}`}
        >
          Previous Appointments
        </button>
        <button
          onClick={() => setActiveTab("Denied")}
          className={`tab ${activeTab === "Denied" ? "active" : ""}`}
        >
          Denied Requests
        </button>
      </div>

      {/* Previous Appointments Section */}
      {activeTab === "Previous" && (
        <div className="appointment-list">
          {previousAppointments.length === 0 ? (
            <p>No previous appointments found.</p>
          ) : (
            previousAppointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <h3>{appointment.patientName}</h3>
                <p><strong>Date:</strong> {new Date(appointment.dateOfAppointment).toLocaleDateString()}</p>
                <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
                <p><strong>Gender:</strong> {appointment.patientGender}</p>
                <p><strong>Age:</strong> {appointment.patientAge}</p>
                <p><strong>Illness described:</strong> {appointment.patientIllness}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* Denied Requests Section */}
      {activeTab === "Denied" && (
        <div className="appointment-list">
          {deniedAppointments.length === 0 ? (
            <p>No denied requests found.</p>
          ) : (
            deniedAppointments.map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <h3>{appointment.patientName}</h3>
                <p><strong>Date:</strong> {new Date(appointment.dateOfAppointment).toLocaleDateString()}</p>
                <p><strong>Time Slot:</strong> {appointment.timeSlot}</p>
                <p><strong>Gender:</strong> {appointment.patientGender}</p>
                <p><strong>Age:</strong> {appointment.patientAge}</p>
                <p><strong>Illness described:</strong> {appointment.patientIllness}</p>
                <p><strong>Message:</strong> {appointment.doctorsMessage || "No message provided"}</p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteAppointment(appointment._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default PatientList;
