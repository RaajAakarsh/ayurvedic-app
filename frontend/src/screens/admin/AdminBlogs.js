import React, { useState, useEffect } from "react";
import './AdminBlogs.css';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  // Load blogs from localStorage
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  // Save blogs to localStorage
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  // Handle form input change
  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  // Add a new blog post
  const addBlog = () => {
    if (!newBlog.title || !newBlog.content || !newBlog.category) {
      alert("Please fill all fields!");
      return;
    }

    const updatedBlogs = [...blogs, { ...newBlog, id: Date.now() }];
    setBlogs(updatedBlogs);
    setNewBlog({ title: "", content: "", category: "", image: "" });
  };

  // Delete a blog post
  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <div className="admin-blogs">
      <h1>Admin Blog Management</h1>

      {/* Blog Form */}
      <div className="blog-form">
        <input
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleChange}
          placeholder="Blog Title"
        />
        <textarea
          name="content"
          value={newBlog.content}
          onChange={handleChange}
          placeholder="Blog Content"
        />
        <input
          type="text"
          name="category"
          value={newBlog.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          type="text"
          name="image"
          value={newBlog.image}
          onChange={handleChange}
          placeholder="Image URL (optional)"
        />
        <button onClick={addBlog}>Add Blog</button>
      </div>

      {/* Blog List */}
      <div className="blog-list">
        <h2>Existing Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <h3>{blog.title}</h3>
            <p>{blog.content.substring(0, 150)}...</p>
            <p><strong>Category:</strong> {blog.category}</p>
            {blog.image && <img src={blog.image} alt={blog.title} />}
            <button onClick={() => deleteBlog(blog.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogs;
