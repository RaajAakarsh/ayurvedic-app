import React, { useState } from 'react';
import './HealthBlogs.css';  // Ensure this CSS file is linked

function HealthBlogs() {
  const [activeTab, setActiveTab] = useState('recent');

  const blogs = [
    { title: "Title 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", date: "01/01/2024" },
    { title: "Title 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", date: "01/01/2024" },
    { title: "Title 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", date: "01/01/2024" },
    { title: "Title 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", date: "01/01/2024" },
    { title: "Title 5", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", date: "01/01/2024" },
    { title: "Title 6", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", date: "01/01/2024" },
    { title: "Title 7", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", date: "01/01/2024" },
    { title: "Title 8", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do", date: "01/01/2024" }
  ];

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
              <p><strong>Date - {blog.date}</strong></p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'write' && (
        <div className="write-blog-form">
          <h2>Write a New Blog</h2>
          <form>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" name="title" placeholder="Enter blog title" />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea name="description" placeholder="Enter blog description"></textarea>
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input type="date" name="date" />
            </div>
            <button type="submit" className="submit-button">Publish Blog</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HealthBlogs;
