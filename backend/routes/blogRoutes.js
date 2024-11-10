const express = require('express');
const router = express.Router();
const {
    getOneBlog,
    getBlogByDoctor,
    getallBlog,
    createBlog
  } = require("../controllers/blogController");

// Create a new blog
router.post('/', createBlog);

// Get all blogs (for public view)
router.get('/',getallBlog );

// Get blogs by doctor ID (for personal view)
router.get('/doctor/:doctorId', getBlogByDoctor);

// Get a single blog by ID
router.get('/:id',getOneBlog);

module.exports = router;
