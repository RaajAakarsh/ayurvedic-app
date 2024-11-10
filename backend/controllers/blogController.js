const Blog = require('../models/Blog');
const Doctor = require('../models/Doctor');


// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        const { title, description, date, doctorId } = req.body;

        // Find the doctor by ID to get the name
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Create the new blog with the doctor's name
        const newBlog = new Blog({
            title,
            description,
            date,
            doctorId,
            doctorName: `${doctor.firstName} ${doctor.lastName}` // Saving the full name
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all blogs (for public view)
exports.getallBlog =  async (req, res) => {
    try {
        const blogs = await Blog.find().populate('doctorId', 'name');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get blogs by doctor ID (for personal view)
exports.getBlogByDoctor =  async (req, res) => {
    try {
        const { doctorId } = req.params;
        const blogs = await Blog.find({ doctorId });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single blog by ID
exports.getOneBlog =  async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('doctorId', 'name');
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};