const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users', error);
    res.json({ error: 'Server error' });
  }
});

//add new user
router.post('/', async (req, res) => {
  try {
    const { name, age, gender, email, address } = req.body;

    // Create a new user instance
    const newUser = new User({
      name,
      age,
      gender,
      email,
      address,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.json({ message: 'Error adding user' });
  }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.json({ error: 'Server error' });
  }
});


module.exports = router;
