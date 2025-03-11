import React, { useState, useEffect } from "react";
import "./AppointmentSlots.css"; // Ensure CSS is correctly linked

function AppointmentSlots() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInput, setShowInput] = useState({});
  const [meetLink, setMeetLink] = useState({});
  const [linkSent, setLinkSent] = useState({});
  
  // New state variables for supplements modal
  const [showSupplementsModal, setShowSupplementsModal] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [supplements, setSupplements] = useState([]);
  const [newMedicineName, setNewMedicineName] = useState("");
  const [newIllness, setNewIllness] = useState("");

  const email = localStorage.getItem("email");

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
        const filteredAppointments = data.bookings.filter(
          (appointment) =>
            appointment.doctorEmail === email &&
            appointment.requestAccept === "y"
        );

        const meetLinks = {};
        filteredAppointments.forEach(appointment => {
          if (appointment.meetLink && appointment.meetLink !== "no") {
            meetLinks[appointment._id] = appointment.meetLink;
          }
        });

        setMeetLink(meetLinks);
        setAppointments(filteredAppointments);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [email]);

  const handleCreateMeetLink = (id) => {
    window.open("https://meet.google.com", "_blank");
    setShowInput((prev) => ({ ...prev, [id]: true }));
  };

  const handleSendMeetLink = async (id) => {
    if (!meetLink[id] || meetLink[id].trim() === "") {
      alert("Please enter a valid Meet link.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/update/meet-link/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ meetLink: meetLink[id] }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Meet link sent successfully!");
        setLinkSent((prev) => ({ ...prev, [id]: true }));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to send the meet link.");
    }
  };

  const handleInputChange = (id, value) => {
    setMeetLink((prev) => ({ ...prev, [id]: value }));
  };

  // New function to open supplements modal
  const handleSuggestSupplements = async (appointmentId) => {
    try {
      // Fetch existing supplements for this appointment
      const response = await fetch(
        `http://localhost:8080/api/bookings/supplements/${appointmentId}`
      );
      
      const appointment = appointments.find(app => app._id === appointmentId);
      setCurrentAppointment(appointment);
      
      if (response.ok) {
        const data = await response.json();
        setSupplements(data.supplements || []);
      } else {
        // If no supplements exist yet, start with empty array
        setSupplements([]);
      }
      
      setShowSupplementsModal(true);
    } catch (error) {
      console.error("Error fetching supplements:", error);
      // If error, still open modal but with empty supplements array
      setSupplements([]);
      setShowSupplementsModal(true);
    }
  };

  // Function to add a new supplement to the list
  const handleAddSupplement = () => {
    if (!newMedicineName.trim() || !newIllness.trim()) {
      alert("Please enter both medicine name and illness");
      return;
    }
    
    const newSupplement = {
      medicineName: newMedicineName,
      forIllness: newIllness
    };
    
    setSupplements([...supplements, newSupplement]);
    setNewMedicineName("");
    setNewIllness("");
  };

  // Function to remove a supplement from the list
  const handleRemoveSupplement = (index) => {
    const updatedSupplements = [...supplements];
    updatedSupplements.splice(index, 1);
    setSupplements(updatedSupplements);
  };

  // Function to save supplements to the backend
  const handleSaveSupplements = async () => {
    if (!currentAppointment) return;
    
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/supplements/${currentAppointment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ supplements }),
        }
      );

      if (response.ok) {
        alert("Supplements updated successfully!");
        setShowSupplementsModal(false);
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to save supplements.");
      console.error(error);
    }
  };

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
              <h2 className="date-time">
                {new Date(appointment.dateOfAppointment).toLocaleDateString(
                  "en-GB"
                )}
              </h2>
              <h2 className="date-time">{appointment.timeSlot}</h2>
            </div>
            <div className="appointment-details">
              <p>
                <strong>Name of the Patient:</strong> {appointment.patientName}
              </p>
              <p>
                <strong>Patient Email:</strong>{" "}
                {appointment.patientEmail || "No email available"}
              </p>
              <p>
                <strong>Illness:</strong>{" "}
                {appointment.patientIllness || "No illness information"}
              </p>
            </div>
            <div className="appointment-details">
              <p>
                <strong>Gender:</strong> {appointment.patientGender}
              </p>
              <p>
                <strong>Age:</strong>{" "}
                {appointment.patientAge || "No age information"}
              </p>
            </div>
            <div className="appointment-actions">
              {/* Button group for left-aligned "Suggest Diet and Yoga Plan" */}
              <div className="button-group">
                <button
                  className="action-button suggest-button"
                  onClick={() => handleSuggestSupplements(appointment._id)}
                >
                  Suggest Supplements
                </button>
                {meetLink[appointment._id] && meetLink[appointment._id] !== "no" ? (
                  <button
                    className="action-button"
                    onClick={() => window.open(meetLink[appointment._id], "_blank")}
                  >
                    Join Meet
                  </button>
                ) : showInput[appointment._id] ? (
                  <>
                    <input
                      type="text"
                      placeholder="Enter Meet link"
                      value={meetLink[appointment._id] || ""}
                      onChange={(e) =>
                        handleInputChange(appointment._id, e.target.value)
                      }
                      className="meet-link-input"
                    />
                    <button
                      className="action-button"
                      onClick={() => handleSendMeetLink(appointment._id)}
                    >
                      Send Meet Link
                    </button>
                  </>
                ) : (
                  <button
                    className="action-button"
                    onClick={() => handleCreateMeetLink(appointment._id)}
                  >
                    Create Meet Link
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}

      {/* Supplements Modal */}
      {showSupplementsModal && currentAppointment && (
        <div className="modal-overlay">
          <div className="supplements-modal">
            <h2>Recommend Supplements for {currentAppointment.patientName}</h2>
            <p>Patient Illness: {currentAppointment.patientIllness}</p>
            
            <div className="supplements-list">
              <h3>Current Recommendations</h3>
              {supplements.length === 0 ? (
                <p>No supplements recommended yet.</p>
              ) : (
                <ul>
                  {supplements.map((supplement, index) => (
                    <li key={index} className="supplement-item">
                      <div>
                        <strong>{supplement.medicineName}</strong> - For: {supplement.forIllness}
                      </div>
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveSupplement(index)}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="add-supplement-form">
              <h3>Add New Supplement</h3>
              <div className="form-group">
                <label>Medicine Name:</label>
                <input
                  type="text"
                  value={newMedicineName}
                  onChange={(e) => setNewMedicineName(e.target.value)}
                  placeholder="Enter medicine name"
                />
              </div>
              <div className="form-group">
                <label>For Illness:</label>
                <input
                  type="text"
                  value={newIllness}
                  onChange={(e) => setNewIllness(e.target.value)}
                  placeholder="Enter illness it treats"
                />
              </div>
              <button 
                className="add-button"
                onClick={handleAddSupplement}
              >
                Add Supplement
              </button>
            </div>
            
            <div className="modal-buttons">
              <button 
                className="save-button"
                onClick={handleSaveSupplements}
              >
                Save Recommendations
              </button>
              <button 
                className="cancel-button"
                onClick={() => setShowSupplementsModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentSlots;
