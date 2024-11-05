import React, { useState, useEffect, useContext } from "react";
import "./CurrentRequests.css"; // Ensure this CSS file is linked
import { AuthContext } from "../../context/AuthContext";

function CurrentRequests() {
  const [requests, setRequests] = useState([]); // Initialize state to hold the requests as an array
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage any potential errors

  const { auth, setAuth } = useContext(AuthContext);
  const firstName = auth.user?.firstName || "Doctor";

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  console.log(`User Email: ${email}`);
  console.log(`User Role: ${role}`);

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/bookings/bookings"
        ); // Adjust API URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data = await response.json();

        // Log the response data to check its structure
        console.log("Fetched data:", data);

        // Ensure that we are accessing the bookings array
        const requestsArray = Array.isArray(data.bookings) ? data.bookings : [];

        // Filter the requests based on the logged-in doctor's email
        const filteredRequests = requestsArray.filter(
          (request) =>
            request.doctorEmail === email && request.requestAccept === "o" // Assuming doctorName is the doctor's email
        );

        setRequests(filteredRequests); // Set the fetched requests to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError(error.message); // Capture any error that occurs during the fetch
        setLoading(false);
      }
    };

    fetchRequests();
  }, [email]); // Empty dependency array ensures this runs once when the component mounts

  // Function to accept request
  const acceptRequest = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestAccept: "y" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept request");
      }

      // Remove the request from the state after accepting
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );

      alert(`Request ${id} accepted!`);
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Error accepting the request.");
    }
  };

  // Function to deny request
  const denyRequest = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bookings/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestAccept: "n" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to deny request");
      }

      // Remove the request from the state after denying
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== id)
      );

      alert(`Request ${id} denied!`);
    } catch (error) {
      console.error("Error denying request:", error);
      alert("Error denying the request.");
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message if any
  }

  return (
    <div className="requests-container">
      <h1>Current Requests for Dr. {firstName}</h1>
      {console.log(requests)}
      {requests.length > 0 ? (
        requests.map((request) => (
          <div key={request._id} className="request-card">
            <p>
              <strong>Patient Name:</strong> {request.patientName}
            </p>
            <p>
              <strong>Patient Email:</strong> {request.patientEmail}
            </p>
            <p>
              <strong>Time Slot:</strong> {request.timeSlot}
            </p>
            <div className="action-buttons">
              <button onClick={() => acceptRequest(request._id)}>
                Accept Request
              </button>
              <button
                onClick={() => denyRequest(request._id)}
                className="deny-button"
              >
                Deny Request
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="noRequest">There are no current requests for you.</p>
      )}
    </div>
  );
}

export default CurrentRequests;

// const requests = [
//   {
//     id: 1,
//     name: "John Doe",
//     age: 34,
//     gender: "Male",
//     illness: "Common Cold",
//     note: "First consultation",
//   },
