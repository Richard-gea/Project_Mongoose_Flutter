const express = require('express');
const router = express.Router();
const Gender = require('../models/Gender');

// Get all genders (not deleted)
router.get('/', async (req, res) => {
  try {
    const genders = await Gender.find({ isDeleted: false }).sort({ displayName: 1 });
    res.json({ genders, count: genders.length });
  } catch (error) {
    console.error('Error fetching genders:', error);
    res.status(500).json({ error: 'Failed to fetch genders' });
  }
});

// Create a new gender
router.post('/', async (req, res) => {
  try {
    const { genderName, displayName } = req.body;
    const gender = new Gender({ genderName, displayName });
    const savedGender = await gender.save();
    res.status(201).json({ gender: savedGender });
  } catch (error) {
    console.error('Error creating gender:', error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'Gender already exists' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Delete a gender (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const gender = await Gender.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!gender) {
      return res.status(404).json({ error: 'Gender not found' });
    }
    res.json({ message: 'Gender deleted successfully', gender });
  } catch (error) {
    console.error('Error deleting gender:', error);
    res.status(500).json({ error: 'Failed to delete gender' });
  }
});

module.exports = router;
