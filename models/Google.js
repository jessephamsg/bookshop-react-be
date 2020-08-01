const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const GoogleSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    googleId: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });

const Google = mongoose.model('Google', GoogleSchema)
module.exports = Google;