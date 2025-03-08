const Admin = require('../models/Admin'); // Import Admin model
const Doctor = require('../models/Doctor');
const Retailer = require('../models/Retailer');
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Register Admin (Manually done by an existing admin)
exports.registerAdmin = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ firstName, lastName, email, phone, password: hashedPassword, role: 'admin' });

    await admin.save();
    const token = generateToken(admin);

    res.status(201).json({ message: 'Admin registered successfully', token, user: {
      id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      role: 'admin',
    }});
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login User (Including Admin)
exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  let user;

  try {
    if (role === 'doctor') {
      user = await Doctor.findOne({ email });
    } else if (role === 'retailer') {
      user = await Retailer.findOne({ email });
    } else if (role === 'patient') {
      user = await Patient.findOne({ email });
    } else if (role === 'admin') {
      user = await Admin.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', token, user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role,
    }});
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Register a new doctor
exports.registerDoctor = async (req, res) => {
  const { firstName, lastName, email, phone, password, specialization } = req.body;

  try {
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new Doctor({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      specialization,
      certificate: req.file?.path || "", // Store certificate path
      role: "doctor",
    });

    await doctor.save();
    const token = generateToken(doctor);
    res.status(201).json({ message: "Doctor registered successfully", token, user: doctor });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// Register a new retailer
exports.registerRetailer = async (req, res) => {
  const { firstName, lastName, email, phone, password, shopName } = req.body;

  try {
    const existingRetailer = await Retailer.findOne({ email });
    if (existingRetailer) {
      return res.status(400).json({ message: "Retailer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const retailer = new Retailer({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      shopName,
      role: "retailer",
    });

    await retailer.save();
    const token = generateToken(retailer);
    res.status(201).json({ message: "Retailer registered successfully", token, user: retailer });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// Register a new patient
exports.registerPatient = async (req, res) => {
  const { firstName, lastName, email, phone, password, age, gender } = req.body;

  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const patient = new Patient({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      age,
      gender,
      role: "patient",
    });

    await patient.save();
    const token = generateToken(patient);
    res.status(201).json({ message: "Patient registered successfully", token, user: patient });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};
