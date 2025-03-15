import React, { useState, useEffect } from "react";
import "./AppointedDoctor.css";
import RatingModal from "./RatingModal";
import AppointmentTab from "./AppointmentTab";
import { fetchDoctorData, handleDeleteRequest, fetchSupplements } from "./AppointmentUtils";

function AppointedDoctor() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [deniedDoctors, setDeniedDoctors] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [supplements, setSupplements] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const email = localStorage.getItem("email");

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

  const handleDeleteAppointment = async (bookingId) => {
    const success = await handleDeleteRequest(bookingId);
    if (success) {
      setDeniedDoctors((prevDeniedDoctors) =>
        prevDeniedDoctors.filter((doctor) => doctor._id !== bookingId)
      );
      
      setPreviousAppointments((prevDoctors) => 
        prevDoctors.filter((doctor) => doctor._id !== bookingId)
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDoctorData();
        
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
              fetchSupplementsForAppointment(appointment._id);
            }
          }
        );
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    loadData();
  }, [email]);

  const fetchSupplementsForAppointment = async (appointmentId) => {
    const supplementsData = await fetchSupplements(appointmentId);
    setSupplements((prev) => ({
      ...prev,
      [appointmentId]: supplementsData || [],
    }));
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

        <AppointmentTab 
          activeTab={activeTab}
          upcomingAppointments={upcomingAppointments}
          pendingDoctors={pendingDoctors}
          deniedDoctors={deniedDoctors}
          previousAppointments={previousAppointments}
          supplements={supplements}
          handlePayFees={handlePayFees}
          handleDeleteRequest={handleDeleteAppointment}
          onRatingClick={(appointmentId) => {
            setCurrentAppointmentId(appointmentId);
            setIsModalOpen(true);
          }}
        />

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
