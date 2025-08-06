const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getNotifications,
  updateBookingStatus,
  updateMeetLink,
  deleteBooking,
  updateRecommendedSupplements,
  getRecommendedSupplements,
  updateRatingAndReview,
  getRatingAndReview,
} = require("../controllers/bookingController");

const Booking = require("../models/Booking");

// POST route to book an appointment
router.post("/", createBooking);

// Route to fetch all bookings
router.get("/bookings", getAllBookings);

// Route to fetch all notifications
router.get("/notifications", getNotifications);

// PUT route to update booking requestAccept status
router.put("/update/:id", updateBookingStatus);

router.put("/update/meet-link/:id", updateMeetLink);

// DELETE route to delete a booking by ID
router.delete("/delete/:id", deleteBooking);

// Route to update recommended supplements
router.put("/supplements/:id", updateRecommendedSupplements);

// Route to get recommended supplements
router.get("/supplements/:id", getRecommendedSupplements);

// Route to update rating and review
router.put("/rating-review/:id", updateRatingAndReview);

// Route to get rating and review
router.get("/rating-review/:id", getRatingAndReview);

// GET all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch from DB
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

module.exports = router;
