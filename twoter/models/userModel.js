var mongoose = require('mongoose');

// Create a Schema
var userSchema = mongoose.Schema({
  name: String,
  password: String
});

module.exports = mongoose.model("user", userSchema);