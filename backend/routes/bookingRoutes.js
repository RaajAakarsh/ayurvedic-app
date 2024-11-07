// routes/bookingRoutes.js

const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getNotifications,
  updateBookingStatus,
  updateMeetLink
} = require("../controllers/bookingController");

// POST route to book an appointment
router.post("/", createBooking);

// Route to fetch all bookings
router.get("/bookings", getAllBookings);

router.get("/notifications", getNotifications);

// PUT route to update booking requestAccept status
router.put("/update/:id", updateBookingStatus);

router.put("/update/meet-link/:id", updateMeetLink);

module.exports = router;
