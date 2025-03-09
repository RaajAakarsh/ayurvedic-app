import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import logo from '../media/logo.png';
import locationIcon from '../media/location.png';
import defaultProfilePic from '../media/default-profile.png'; // Default profile picture

const API_KEY = 'f08bb887cc0d42bb8b9fb21993c3a6d3'; // Your OpenCage API key

function NavBar() {
  const [userLocation, setUserLocation] = useState('Fetching location...');

  const profilePic = ''; // Logic to fetch the user's profile picture URL

  useEffect(() => {
    // Function to get the user's location
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
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
        setUserLocation(city); // Update location text
      } else {
        setUserLocation('City not found');
      }
    } catch (error) {
      setUserLocation('Error fetching city name');
      console.error('Error fetching city name:', error);
    }
  };

  return (
    <header className="navbar-header">
      <div className="top-navbar">
        <NavLink to="/" className="logo-container">
          <img src={logo} alt="Ayurvedic Logo" className="nav-logo" />
          <div className="text-container">
            <div className="logo-text">AYURVEDIC</div>
            <div className="consultations-text">Consultations</div>
          </div>
        </NavLink>
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
        <div className="auth">
        <NavLink to="/signin" className="signin-btn">Sign In</NavLink>
          <NavLink to="/signin" className="signin-btn">
            <img
              src={profilePic || defaultProfilePic}
              alt="Profile"
              className="profile-pic"
            />
          </NavLink>
        </div>
      </div>

      <nav className="navbar">
        <div className="left-item">
          <img src={locationIcon} alt="Location Icon" className="location-icon" />
          <span className="location-text">{userLocation}</span> {/* Display user location */}
        </div>
        <div className="center-items">
          <ul>
            <li>
              <NavLink to="/" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/treatments" activeClassName="active">
                Treatments
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctors" activeClassName="active">
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink to="/medicines" activeClassName="active">
                Medicines
              </NavLink>
            </li>
            <li>
              <NavLink to="/diet-yoga" activeClassName="active">
                Diet And Yoga
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs-videos" activeClassName="active">
                Blogs and Videos
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
