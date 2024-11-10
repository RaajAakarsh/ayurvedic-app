const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // Assuming you have a Doctor schema/model
        required: true,
    },
    doctorName: { // New field to store the doctor's name
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Blog', blogSchema);
