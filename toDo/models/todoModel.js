var mongoose = require('mongoose');

// Create a Schema
var todoSchema = mongoose.Schema({
  checked: Boolean,
  text: String
});

module.exports = mongoose.model("todo", todoSchema);