import React, { useState, useEffect } from "react";
import "./AppointedDoctor.css"; // Ensure the CSS file is linked

function AppointedDoctor() {
  const [activeTab, setActiveTab] = useState("Upcoming"); // State to manage active tab
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [deniedDoctors, setDeniedDoctors] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]); // New state for previous appointments
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("email");
  const [supplements, setSupplements] = useState({}); // Key: appointment ID, Value: supplements array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const RatingModal = ({ isOpen, onClose, onSubmit, rating, setRating, review, setReview }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Rate Your Experience</h2>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? "filled" : ""}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Write your review (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <div className="modal-actions">
            <button onClick={onSubmit} disabled={!rating}>
              Submit
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  const handleRatingSubmit = async () => {
    if (!currentAppointmentId || !rating) {
      alert("Please provide a rating before submitting.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/rating-review/${currentAppointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating, review }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit rating and review");
      }

      // Update the local state to reflect the new rating and review
      const updatedAppointments = upcomingAppointments.map((appointment) =>
        appointment._id === currentAppointmentId
          ? { ...appointment, rating, review }
          : appointment
      );
      setUpcomingAppointments(updatedAppointments);

      const updatedPreviousAppointments = previousAppointments.map((appointment) =>
        appointment._id === currentAppointmentId
          ? { ...appointment, rating, review }
          : appointment
      );
      setPreviousAppointments(updatedPreviousAppointments);

      // Close the modal and reset the state
      setIsModalOpen(false);
      setRating(0);
      setReview("");
    } catch (error) {
      console.error("Error submitting rating and review:", error);
      alert("Failed to submit rating and review. Please try again.");
    }
  };

  // Function to fetch supplements for a specific appointment
  const fetchSupplements = async (appointmentId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/supplements/${appointmentId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supplements");
      }

      const data = await response.json();
      setSupplements((prev) => ({
        ...prev,
        [appointmentId]: data.supplements || [],
      }));
    } catch (error) {
      console.error("Error fetching supplements:", error);
      setSupplements((prev) => ({
        ...prev,
        [appointmentId]: [],
      }));
    }
  };

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

        const currentDate = new Date();

        // Sort bookings into upcoming, past, pending, and denied
        const sortedBookings = patientBookings.reduce(
          (acc, booking) => {
            const appointmentDate = new Date(booking.dateOfAppointment);
            const isPastAppointment = appointmentDate < currentDate;
            const isWithinOneDayAfterAppointment =
              appointmentDate < currentDate &&
              currentDate - appointmentDate <= 24 * 60 * 60 * 1000; // 1 day in milliseconds

            // For past appointments, add to previousAppointments with source info
            if (isPastAppointment && !isWithinOneDayAfterAppointment) {
              let appointmentWithSource = { ...booking };

              if (booking.requestAccept === "y") {
                appointmentWithSource.source = "Completed";
                acc.previous.push(appointmentWithSource);
              } else if (booking.requestAccept === "n") {
                appointmentWithSource.source = "Denied";
                acc.previous.push(appointmentWithSource);
              } else if (booking.requestAccept === "o") {
                appointmentWithSource.source = "Pending";
                acc.previous.push(appointmentWithSource);
              }
            }
            // For non-past appointments or appointments within 1 day after
            else if (!isPastAppointment || isWithinOneDayAfterAppointment) {
              if (booking.requestAccept === "o") {
                acc.pending.push(booking);
              } else if (booking.requestAccept === "y") {
                acc.upcoming.push(booking);
              } else if (booking.requestAccept === "n") {
                acc.denied.push(booking);
              }
            }

            return acc;
          },
          { pending: [], upcoming: [], denied: [], previous: [] }
        );

        setPendingDoctors(sortedBookings.pending);
        setUpcomingAppointments(sortedBookings.upcoming);
        setDeniedDoctors(sortedBookings.denied);
        setPreviousAppointments(sortedBookings.previous);
        setLoading(false);

        // Fetch supplements for completed upcoming and previous appointments
        [...sortedBookings.upcoming, ...sortedBookings.previous].forEach(
          (appointment) => {
            if (appointment.source === "Completed" || appointment.requestAccept === "y") {
              fetchSupplements(appointment._id);
            }
          }
        );

      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [email]);

  const handleDeleteRequest = async (bookingId) => {
    // Ask for confirmation before proceeding
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (!confirmed) {
      return; // If the user clicks "Cancel", do nothing
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/delete/${bookingId}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the request");
      }

      // Remove the deleted request from the appropriate state
      setDeniedDoctors((prevDeniedDoctors) =>
        prevDeniedDoctors.filter((doctor) => doctor._id !== bookingId)
      );
      
      setPreviousAppointments((prevDoctors) => 
        prevDoctors.filter((doctor) => doctor._id !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting the request:", error);
      alert("Failed to delete the request");
    }
  };

  const handlePayFees = (doctorId) => {
    // Redirect to the payment page or handle payment logic
    window.open(`/payment/${doctorId}`, "_blank"); // Replace with actual payment page URL
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="appointed-container">
        {/* Tabs for Upcoming, Pending, Denied, and Previous Appointments */}
        <div className="tabs">
          <button
            onClick={() => setActiveTab("Upcoming")}
            className={`tab ${activeTab === "Upcoming" ? "active" : ""}`}
          >
            Upcoming Appointments
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
          <button
            onClick={() => setActiveTab("Previous")}
            className={`tab ${activeTab === "Previous" ? "active" : ""}`}
          >
            Previous Appointments
          </button>
        </div>

        {/* Display Upcoming Appointments Information */}
        {activeTab === "Upcoming" && (
          <div className="doctor-info upcoming">
            {upcomingAppointments.length > 0 ? (
              <>
                <h1>Your Upcoming Appointments</h1>
                <p>Completed appointments will be displayed here for a period of 24 hours, after which they will be archived in the previous appointments section.</p>
                {upcomingAppointments
                  .sort((a, b) => new Date(a.dateOfAppointment) - new Date(b.dateOfAppointment))
                  .map((upcomingAppointment) => (
                    <div key={upcomingAppointment._id} className="singled-doctor">
                      <hr className="hr"></hr>
                      <h2>with Dr. {upcomingAppointment.doctorName}</h2>
                      <ul>
                        <li>
                          <strong>Date:</strong>{" "}
                          {new Date(upcomingAppointment.dateOfAppointment).toLocaleDateString("en-GB")}{" "}
                          (dd/mm/yyyy)
                        </li>
                        <li>
                          <strong>Timeslot:</strong> {upcomingAppointment.timeSlot}
                        </li>
                        <li>
                          <strong>Doctor's Email:</strong>{" "}
                          {upcomingAppointment.doctorEmail}
                        </li>
                        <li>
                          <strong>Illness:</strong> {upcomingAppointment.patientIllness}
                        </li>
                      </ul>

                      {/* Show "Join Meet" button if meetLink is available */}
                      {upcomingAppointment.meetLink && upcomingAppointment.meetLink !== "no" ? (
                        <button
                          className="action-button"
                          onClick={() => window.open(upcomingAppointment.meetLink, "_blank")}
                        >
                          Join Meet
                        </button>
                      ) : (
                        <button
                          className="action-button pay-fees"
                          onClick={() => handlePayFees(upcomingAppointment._id)}
                        >
                          Pay Fees
                        </button>
                      )}

                      {
                        new Date(upcomingAppointment.dateOfAppointment) < new Date() && (
                          <>
                            {upcomingAppointment.rating ? (
                              <p>Thank you for your opinion!</p>
                            ) : (
                              <button
                                className="action-button"
                                onClick={() => {
                                  setCurrentAppointmentId(upcomingAppointment._id);
                                  setIsModalOpen(true);
                                }}
                              >
                                Give your Rating
                              </button>
                            )}
                          </>
                        )
                      }

                      {/* Recommended Supplements Section */}
                      {supplements[upcomingAppointment._id] && supplements[upcomingAppointment._id].length > 0 && (
                        <div className="supplements">
                          <h2>Recommended Supplements</h2>
                          <div className="medicines">
                            {supplements[upcomingAppointment._id].map((supplement, index) => (
                              <div key={index} className="medicine">
                                <p>
                                  <strong>Medicine:</strong> {supplement.medicineName}
                                </p>
                                <p>
                                  <strong>For Illness:</strong> {supplement.forIllness}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            ) : (
              <p>No upcoming doctor assigned.</p>
            )}
          </div>
        )}

        {/* Display Pending Doctors Information */}
        {activeTab === "Pending" && (
          <div className="doctor-info pending">
            {pendingDoctors.length > 0 ? (
              <>
                <h1>Your Pending Doctor Requests</h1>
                {pendingDoctors
                  .sort((a, b) => new Date(a.dateOfAppointment) - new Date(b.dateOfAppointment)) // Sort by date, closest first
                  .map((pendingDoctor) => (
                  <div key={pendingDoctor._id} className="singled-doctor">
                    <hr className="hr"></hr>
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
                      <li>
                        <strong>Illness:</strong> {pendingDoctor.patientIllness}
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
                {deniedDoctors
                  .sort((a, b) => new Date(b.dateOfAppointment) - new Date(a.dateOfAppointment)) // Sort by date, newest first
                  .map((deniedDoctor) => (
                  <div key={deniedDoctor._id} className="singled-doctor">
                    <hr className="hr"></hr>
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
                        <strong>Illness:</strong> {deniedDoctor.patientIllness}
                      </li>
                      <li>
                        <strong>Doctor's Message:</strong>{" "}
                        {deniedDoctor.doctorsMessage}
                      </li>
                    </ul>

                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteRequest(deniedDoctor._id)}
                    >
                      Delete Request
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <p>No denied doctor requests at the moment.</p>
            )}
          </div>
        )}

        {/* New Section: Display Previous Appointments Information */}
        {activeTab === "Previous" && (
          <div className="doctor-info previous">
            {previousAppointments.length > 0 ? (
              <>
                <h1>Your Previous Appointments</h1>
                {previousAppointments
                  .sort((a, b) => new Date(b.dateOfAppointment) - new Date(a.dateOfAppointment))
                  .map((previousAppointment) => (
                    <div key={previousAppointment._id} className="singled-doctor">
                      <hr className="hr"></hr>
                      <h2>with Dr. {previousAppointment.doctorName}</h2>
                      <ul>
                        <li>
                          <strong>Status:</strong> {previousAppointment.source}
                        </li>
                        <li>
                          <strong>Date:</strong>{" "}
                          {new Date(previousAppointment.dateOfAppointment).toLocaleDateString("en-GB")}{" "}
                          (dd/mm/yyyy)
                        </li>
                        <li>
                          <strong>Timeslot:</strong> {previousAppointment.timeSlot}
                        </li>
                        <li>
                          <strong>Doctor's Email:</strong>{" "}
                          {previousAppointment.doctorEmail}
                        </li>
                        <li>
                          <strong>Illness:</strong> {previousAppointment.patientIllness}
                        </li>
                        {previousAppointment.doctorsMessage && (
                          <li>
                            <strong>Doctor's Notes:</strong>{" "}
                            {previousAppointment.doctorsMessage}
                          </li>
                        )}
                        <li>
                          <strong>Request Type:</strong>{" "}
                          {previousAppointment.source === "Completed" ? "Accepted" : 
                           previousAppointment.source === "Denied" ? "Denied" : "Pending"}
                        </li>
                      </ul>

                      {/* Rating and Review Section */}
                      {previousAppointment.source === "Completed" && (
                        <>
                          {previousAppointment.rating ? (
                            <p>Thank you for your opinion!</p>
                          ) : (
                            <button
                              className="action-button"
                              onClick={() => {
                                setCurrentAppointmentId(previousAppointment._id);
                                setIsModalOpen(true);
                              }}
                            >
                              Give your Rating
                            </button>
                          )}
                        </>
                      )}

                      {/* Recommended Supplements Section */}
                      {previousAppointment.source === "Completed" && (
                        <div className="supplements">
                          <h2>Recommended Supplements</h2>
                          {supplements[previousAppointment._id] &&
                          supplements[previousAppointment._id].length > 0 ? (
                            <div className="medicines">
                              {supplements[previousAppointment._id].map((supplement, index) => (
                                <div key={index} className="medicine">
                                  <p>
                                    <strong>Medicine:</strong> {supplement.medicineName}
                                  </p>
                                  <p>
                                    <strong>For Illness:</strong> {supplement.forIllness}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p>No supplements recommended for this appointment.</p>
                          )}
                        </div>
                      )}

                      {/* Optional: Add a button to view past records or delete */}
                      <button
                        className="action-button action-delete"
                        onClick={() => handleDeleteRequest(previousAppointment._id)}
                      >
                        Remove from History
                      </button>
                    </div>
                  ))}
              </>
            ) : (
              <p>No previous appointments in your history.</p>
            )}
          </div>
        )}

        {/* Rating Modal */}
        <RatingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRatingSubmit}
          rating={rating}
          setRating={setRating}
          review={review}
          setReview={setReview}
        />
      </div>
    </>
  );
}

export default AppointedDoctor;
