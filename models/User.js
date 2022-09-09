const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'el password es requerido'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;