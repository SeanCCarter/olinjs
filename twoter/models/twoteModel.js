var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
  text: String,
  user: String
});

module.exports = mongoose.model("twote", twoteSchema);