// controllers/userController.js
const db = require('../db/db');
const { User } = require('../models/User');
const { generateToken } = require('../helpers/jwtHelper');
const { authenticateUser } = require('../middlewares/authMiddleware');

/**
 * User Signup
 * POST /users/signup
 */
const signup = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).send('Invalid input');
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send('Email already in use');
    }

    // Create a new user in the database
    const newUser = await User.create({
      username,
      email,
      password,
    });

    // Generate a JWT token for the new user
    const token = generateToken(newUser.id);

    // Send the user data and token in the response
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * User Login
 * POST /users/login
 */
const login = async (req, res) => {
  try {
    // Extract login credentials from the request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).send('Invalid input');
    }

    // Check if the user with the provided email and password exists
    const user = await User.findOne({ where: { email, password } });

    // If no user is found, return an authentication error
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken(user.id);

    // Send the user data and token in the response
    res.json({ user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Get All Users
 * GET /users
 * Requires authentication using the authenticateUser middleware
 */
const getAllUsers = async (req, res) => {
  try {
    // Use the authenticateUser middleware before fetching all users
    authenticateUser(req, res, async () => {
      // Fetch all users from the database
      const users = await User.findAll();
      res.json(users);
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  // ... other functions for user-related operations
};





















