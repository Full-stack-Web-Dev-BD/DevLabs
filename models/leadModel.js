const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  businessName: {
    type: String,
    required: true,
  },
  teamSize: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Lead', UserSchema);
