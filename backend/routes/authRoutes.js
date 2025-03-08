const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth");
const Admin = require("../models/Admin");
const { registerDoctor, registerRetailer, registerPatient, loginUser } = require("../controllers/authController");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient"); // Import the Patient model
const Retailer = require("../models/Retailer"); 
const Doctor = require("../models/Doctor"); 

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Doctor, Retailer, Patient registration
router.post("/register/doctor", upload.single("certificate"), registerDoctor);
router.post("/register/retailer", registerRetailer);
router.post("/register/patient", registerPatient);
router.post("/login", loginUser);

//  Admin Login Route
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, admin });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//  Get Current Logged-in User (Admin or Regular User)
router.get("/user", auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all patients (Admin only)
router.get("/users", auth, async (req, res) => {
  try {
    // Ensure only admins can access this
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
      const user = await Patient.findByIdAndDelete(req.params.id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
  }
});

// Fetch all retailers
router.get("/retailers", async (req, res) => {
  try {
    const retailers = await Retailer.find({});
    res.status(200).json(retailers);
  } catch (error) {
    console.error("Error fetching retailers:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
