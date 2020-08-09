const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
    },
    googleUser: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    },
    orders: [{
      type: String,
    }] 
  });

const User = mongoose.model('User', UserSchema)
module.exports = User;