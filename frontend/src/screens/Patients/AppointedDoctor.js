import React, { useState, useEffect } from "react";
import "./AppointedDoctor.css"; // Ensure the CSS file is linked

function AppointedDoctor() {
  const [activeTab, setActiveTab] = useState("Current"); // State to manage active tab
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [currentDoctors, setCurrentDoctors] = useState([]);
  const [deniedDoctors, setDeniedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem("email");

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

        // Filter bookings for the logged-in patient
        const patientBookings = data.bookings.filter(
          (booking) => booking.patientEmail === email
        );

        // Separate pending, accepted, and denied bookings
        const pendingBookings = patientBookings.filter(
          (booking) => booking.requestAccept === "o"
        );
        const acceptedBookings = patientBookings.filter(
          (booking) => booking.requestAccept === "y"
        );
        const deniedBookings = patientBookings.filter(
          (booking) => booking.requestAccept === "n"
        );

        setPendingDoctors(pendingBookings);
        setCurrentDoctors(acceptedBookings);
        setDeniedDoctors(deniedBookings); // Set the array of denied bookings
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
    <>
      <div className="appointed-container">
        {/* Tabs for Current, Pending, and Denied Doctors */}
        <div className="tabs">
          <button
            onClick={() => setActiveTab("Current")}
            className={`tab ${activeTab === "Current" ? "active" : ""}`}
          >
            Current Doctor
          </button>
          <button
            onClick={() => setActiveTab("Pending")}
            className={`tab ${activeTab === "Pending" ? "active" : ""}`}
          >
            Pending Requests
          </button>
          <button
            onClick={() => setActiveTab("Denied")}
            className={`tab ${activeTab === "Denied" ? "active" : ""}`}
          >
            Denied Requests
          </button>
        </div>

        {/* Display Current Doctors Information */}
        {activeTab === "Current" && (
          <div className="doctor-info current">
            {currentDoctors.length > 0 ? (
              <>
                <h1>Your Current Doctors</h1>
                {currentDoctors.map((currentDoctor) => (
                  <div key={currentDoctor.id} className="singled-doctor">
                    <h2>with Dr. {currentDoctor.doctorName}</h2>
                    <ul>
                      <li>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          currentDoctor.dateOfAppointment
                        ).toLocaleDateString("en-GB")}{" "}
                        (dd/mm/yyyy)
                      </li>
                      <li>
                        <strong>Timeslot:</strong> {currentDoctor.timeSlot}
                      </li>
                      <li>
                        <strong>Doctor's Email:</strong>{" "}
                        {currentDoctor.doctorEmail}
                      </li>
                    </ul>

                    {/* Recommended Supplements Section */}
                    <div className="supplements">
                      <h2>Recommended Supplements</h2>
                      <div className="medicines">
                        {["Medicine 1", "Medicine 2", "Medicine 3"].map(
                          (medicine, index) => (
                            <div key={index} className="medicine">
                              <p>
                                <strong>Name of Medicine:</strong> {medicine}
                              </p>
                              <p>Cures Illness</p>
                              <p>Price</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>No current doctor assigned.</p>
            )}
          </div>
        )}

        {/* Display Pending Doctors Information */}
        {activeTab === "Pending" && (
          <div className="doctor-info pending">
            {pendingDoctors.length > 0 ? (
              <>
                <h1>Your Pending Doctor Requests</h1>
                {pendingDoctors.map((pendingDoctor) => (
                  <div key={pendingDoctor.id} className="singled-doctor">
                    <h2>with Dr. {pendingDoctor.doctorName}</h2>
                    <ul>
                      <li>
                        <strong>Status:</strong> Pending (Request not accepted
                        yet)
                      </li>
                      <li>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          pendingDoctor.dateOfAppointment
                        ).toLocaleDateString("en-GB")}{" "}
                        (dd/mm/yyyy)
                      </li>
                      <li>
                        <strong>Timeslot:</strong> {pendingDoctor.timeSlot}
                      </li>
                      <li>
                        <strong>Doctor's Email:</strong>{" "}
                        {pendingDoctor.doctorEmail}
                      </li>
                    </ul>
                  </div>
                ))}
              </>
            ) : (
              <p>No pending doctor requests at the moment.</p>
            )}
          </div>
        )}

        {/* Display Denied Doctor Information */}
        {activeTab === "Denied" && (
          <div className="doctor-info denied">
            {deniedDoctors.length > 0 ? (
              <>
                <h1>Your Denied Doctor Requests</h1>
                {deniedDoctors.map((deniedDoctor) => (
                  <div key={deniedDoctor.id} className="singled-doctor">
                    <h2>with Dr. {deniedDoctor.doctorName}</h2>
                    <ul>
                      <li>
                        <strong>Status:</strong> Denied
                      </li>
                      <li>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          deniedDoctor.dateOfAppointment
                        ).toLocaleDateString("en-GB")}{" "}
                        (dd/mm/yyyy)
                      </li>
                      <li>
                        <strong>Timeslot:</strong> {deniedDoctor.timeSlot}
                      </li>
                      <li>
                        <strong>Doctor's Email:</strong>{" "}
                        {deniedDoctor.doctorEmail}
                      </li>
                      <li>
                        <strong>Doctor's Message:</strong>{" "}
                        {deniedDoctor.doctorsMessage}
                      </li>
                    </ul>
                  </div>
                ))}
              </>
            ) : (
              <p>No denied doctor requests at the moment.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AppointedDoctor;
