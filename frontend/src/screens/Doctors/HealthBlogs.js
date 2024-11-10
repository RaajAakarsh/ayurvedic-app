import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './HealthBlogs.css'; // Ensure this CSS file is linked
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext

function HealthBlogs() {
  const { auth } = useContext(AuthContext); // Get auth state from context
  const doctorId = auth.user ? auth.user.id : null; // Get doctor ID from the user object

  const [activeTab, setActiveTab] = useState('recent');
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });

  // Fetch blogs that belong to the specific doctor
  useEffect(() => {
    if (doctorId) {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/blogs/doctor/${doctorId}`);
          setBlogs(response.data);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };
      fetchBlogs();
    }
  }, [doctorId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId) {
      console.error('Doctor ID is missing');
      return;
    }
  
    // Create a new object including the doctorId
    const dataToSubmit = { ...formData, doctorId };
  
    console.log('Form data with doctorId:', dataToSubmit); // Debug log
  
    try {
      const response = await axios.post('http://localhost:8080/api/blogs', dataToSubmit);
      setBlogs([response.data, ...blogs]); // Add the new blog to the current list
      setActiveTab('recent'); // Switch to recent blogs tab
    } catch (error) {
      console.error('Error publishing blog:', error);
    }
  };
  

  return (
    <div className="health-blogs-container">
      <div className="header">
        <h1>My Health Blogs</h1>
        <div className="button-group">
          <button
            className={`action-button ${activeTab === 'write' ? 'active' : ''}`}
            onClick={() => setActiveTab('write')}
          >
            Write a Blog
          </button>
          <button
            className={`action-button ${activeTab === 'recent' ? 'active' : ''}`}
            onClick={() => setActiveTab('recent')}
          >
            Recent Blogs
          </button>
        </div>
      </div>

      {activeTab === 'recent' && (
        <div className="blogs-grid">
          {blogs.map((blog, index) => (
            <div key={index} className="blog-card">
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
              <p><strong>Date - {new Date(blog.date).toLocaleDateString()}</strong></p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'write' && (
        <div className="write-blog-form">
          <h2>Write a New Blog</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                placeholder="Enter blog description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Publish Blog</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HealthBlogs;
