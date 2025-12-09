const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  // String field with lowercase constraint
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    lowercase: true,
    minlength: 2
  },
  // String field with uppercase constraint
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    uppercase: true,
    minlength: 2
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: [true, 'Gender is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    // match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  // Number field with maximum value constraint
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative'],
    max: [150, 'Age cannot exceed 150']
  },


  isDeleted: {
    type: Boolean,
    default: false
  },
}, { timestamps: true });
 


module.exports = mongoose.model('Patient', patientSchema);