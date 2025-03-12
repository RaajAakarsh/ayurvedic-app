import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./AdminBlogs.css";
import { AuthContext } from "../../context/AuthContext";

const AdminBlogs = () => {
  const { auth } = useContext(AuthContext);
  const adminId = auth.user ? auth.user.id : null;

  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });

  // Fetch all blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/blogs");
        console.log("Fetched blogs:", response.data); // Debugging API response
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  // Add a new blog post
  const addBlog = async () => {
    if (!newBlog.title || !newBlog.content || !newBlog.category) {
      alert("Please fill all fields!");
      return;
    }

    const dataToSubmit = { ...newBlog, adminId };

    try {
      const response = await axios.post("http://localhost:8080/api/blogs", dataToSubmit);
      setBlogs([response.data, ...blogs]);
      setNewBlog({ title: "", content: "", category: "", image: "" });
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  // Delete a blog post
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id)); // Fix delete issue
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
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
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-item">
              <h3>{blog.title}</h3>
              <p>{blog.description.substring(0, 150)}...</p>
              {blog.image && <img src={blog.image} alt={blog.title} />}
              <button onClick={() => deleteBlog(blog._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
