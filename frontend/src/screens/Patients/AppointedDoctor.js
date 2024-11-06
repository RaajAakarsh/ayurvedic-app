import React, { useState, useEffect } from "react";
import "./AppointedDoctor.css"; // Ensure the CSS file is linked

function AppointedDoctor() {
  const [pendingDoctor, setPendingDoctor] = useState(null); // State to store the pending doctor
  const [currentDoctor, setCurrentDoctor] = useState(null); // State to store the accepted doctor
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  const email = localStorage.getItem("email"); // Get the logged-in patient's email

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/bookings/bookings`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctor data");
        }

        const data = await response.json();

        // Log the response data to check its structure
        console.log("Fetched data:", data);

        // Filter bookings for the logged-in patient
        const patientBookings = data.bookings.filter(
          (booking) => booking.patientEmail === email
        );

        // Separate pending and accepted bookings
        const pendingBooking = patientBookings.find(
          (booking) => booking.requestAccept === "o"
        );
        const acceptedBooking = patientBookings.find(
          (booking) => booking.requestAccept === "y"
        );

        setPendingDoctor(pendingBooking || null);
        setCurrentDoctor(acceptedBooking || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="appointed-container">
      {/* Pending Doctor Section */}
      {pendingDoctor ? (
        <div className="doctor-info pending">
          <h1>Your Pending Doctor Request</h1>
          <h2>with Dr. {pendingDoctor.doctorName}</h2>
          <ul>
            <li>
              <strong>Date:</strong>{" "}
              {new Date(pendingDoctor.dateOfAppointment).toLocaleDateString(
                "en-GB"
              )}{" "}
              (dd/mm/yyyy)
            </li>

            <li>
              <strong>Timeslot:</strong> {pendingDoctor.timeSlot}
            </li>
            <li>
              <strong>Doctor's Email:</strong> {pendingDoctor.doctorEmail}
            </li>
            <li>
              <strong>Status:</strong> Pending (Request not accepted yet)
            </li>
          </ul>
        </div>
      ) : (
        <p>No pending doctor requests at the moment.</p>
      )}

      <hr></hr>

      {/* Accepted/Current Doctor Section */}
      {currentDoctor ? (
        <div className="doctor-info current">
          <h1>Your Current Doctor</h1>
          <h2>with Dr. {currentDoctor.doctorName}</h2>
          <ul>
            <li>
              <strong>Date:</strong>{" "}
              {new Date(currentDoctor.dateOfAppointment).toLocaleDateString(
                "en-GB"
              )}{" "}
              (dd/mm/yyyy)
            </li>
            <li>
              <strong>Timeslot:</strong> {currentDoctor.timeSlot}
            </li>
            <li>
              <strong>Doctor's Email:</strong> {currentDoctor.doctorEmail}
            </li>
            <li>
              <strong>Number of Appointments Done:</strong> 1
            </li>
            <li>
              <strong>Next Appointment:</strong> {currentDoctor.timeSlot}
            </li>
          </ul>
        </div>
      ) : (
        <p>No current doctor assigned.</p>
      )}

      {/* Recommended Supplements Section */}
      <div className="supplements">
        <h2>Recommended Supplements</h2>
        <div className="medicines">
          {["Medicine 1", "Medicine 2", "Medicine 3"].map((medicine, index) => (
            <div key={index} className="medicine">
              <p>
                <strong>Name of Medicine:</strong> {medicine}
              </p>
              <p>Cures Illness</p>
              <p>Price</p>
              <button>Buy Item</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppointedDoctor;
