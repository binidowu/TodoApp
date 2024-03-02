const User = require("../models/users");
const Task = require("../models/tasks");
require("dotenv").config();

// Register user
exports.registerUser = async (req, res, next) => {
  try {
    // Extract user data from request body
    const { firstName, lastName, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Save user to database
    await User.create(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    req.user = await User.findOne({ _id: req.params.userID }, "-hashedPassword");
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: "Error getting user" });
    next(err);
  }
};

// Get user information by ID
exports.getUser = async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(200).json({
      success: true,
      data: data,
      message: "User retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error getting user" });
    next(err);
  }
};
