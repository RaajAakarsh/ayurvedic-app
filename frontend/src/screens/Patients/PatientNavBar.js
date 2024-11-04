import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../NavBar.css'; // Ensure styles from NavBar are included
import logo from '../../media/logo.png';
import locationIcon from '../../media/location.png';
import defaultProfilePic from '../../media/default-profile.png'; // Default profile picture
import notificationIcon from '../../media/notifications.png';
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

const API_KEY = 'f08bb887cc0d42bb8b9fb21993c3a6d3'; // Replace with your OpenCage API key

function PatientNavBar() {
  const { auth, signOut } = useContext(AuthContext); // Get auth context to access user info
  const [showModal, setShowModal] = useState(false);
  const [userLocation, setUserLocation] = useState('Fetching location...');
  const [cityName, setCityName] = useState(''); // State for city name

  const profilePic = ''; // Logic to fetch user's profile picture URL
  const userName = auth.user ? auth.user.name : 'Guest';
  const userPhone = auth.user ? auth.user.phone : 'N/A';
  const userEmail = auth.user ? auth.user.email : 'N/A';

  useEffect(() => {
    // Function to get the user's location
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation(`Lat: ${latitude}, Lon: ${longitude}`);

            // Fetch city name using OpenCage API
            fetchCityName(latitude, longitude);
          },
          () => {
            setUserLocation('Location access denied');
          }
        );
      } else {
        setUserLocation('Geolocation not supported');
      }
    };

    fetchLocation();
  }, []);

  // Function to fetch city name from OpenCage API
  const fetchCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`);
      const data = await response.json();
      if (data.results.length > 0) {
        const city = data.results[0].components.city || data.results[0].components.town || 'Unknown location';
        setCityName(city);
      } else {
        setCityName('City not found');
      }
    } catch (error) {
      setCityName('Error fetching city name');
      console.error('Error fetching city name:', error);
    }
  };

  const handleProfileClick = () => {
    setShowModal(!showModal); // Toggle modal visibility
  };

  const handleSignOut = () => {
    signOut(); // Call signOut function from AuthContext
  };

  return (
    <header className="navbar-header">
      <div className="top-navbar">
        <div className="logo-container">
          <img src={logo} alt="Ayurvedic Logo" className="nav-logo" />
          <div className="text-container">
            <div className="logo-text">AYURVEDIC</div>
            <div className="consultations-text">Consultations</div>
          </div>
        </div>
        <div className="search-signin">
          <div className="search-bar">
            <div className="dropdown">
              <select>
                <option value="doctor">Doctor</option>
                <option value="disease">Diseases</option>
                <option value="medicine">Medicines</option>
                <option value="diet-yoga">Diet And Yoga</option>
                <option value="blogs-videos">Blogs</option>
              </select>
            </div>
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>
        <div className="auth" onClick={handleProfileClick}>
          {userName}
          <NavLink to="/profile" className="signin-btn">
            <img
              src={profilePic || defaultProfilePic}
              alt="Profile"
              className="profile-pic"
            />
          </NavLink>
        </div>
        <NavLink to="/notifications" className="notification-icon">
          <img src={notificationIcon} alt="Notifications" className="notification-img" />
        </NavLink>
      </div>

      {showModal && (
        <div className="profile-modal">
          <h2>User Profile</h2>
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Phone:</strong> {userPhone}</p>
          <p><strong>Email:</strong> {userEmail}</p>
          <button onClick={handleSignOut} className="signout-btn">Sign Out</button>
          <button onClick={handleProfileClick} className="close-btn">Close</button>
        </div>
      )}

      <nav className="navbar">
        <div className="left-item">
          <img src={locationIcon} alt="Location Icon" className="location-icon" />
          <span className="location-text">{cityName || userLocation}</span> {/* Display city name */}
        </div>
        <div className="center-items">
          <ul>
            <li>
              <NavLink to="/patient-home" activeClassName="active">Home</NavLink>
            </li>
            <li>
              <NavLink to="/treatments" activeClassName="active">Treatments</NavLink>
            </li>
            <li>
              <NavLink to="/doctors" activeClassName="active">Doctors</NavLink>
            </li>
            <li>
              <NavLink to="/medicines" activeClassName="active">Medicines</NavLink>
            </li>
            <li>
              <NavLink to="/diet-yoga" activeClassName="active">Diet and Yoga Plan</NavLink>
            </li>
            <li>
              <NavLink to="/blogs-videos" activeClassName="active">Blogs and Videos</NavLink>
            </li>
            <li>
              <NavLink to="/cart" activeClassName="active">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/orders" activeClassName="active">Orders</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default PatientNavBar;
