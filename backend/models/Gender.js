const mongoose = require('mongoose');

const genderSchema = new mongoose.Schema({
  genderName: {
    type: String,
    required: [true, 'Gender name is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  displayName: {
    type: String,
    required: [true, 'Display name is required'],
    trim: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gender', genderSchema);
