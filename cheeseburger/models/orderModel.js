var mongoose = require('mongoose');

// Create a Schema
var orderSchema = mongoose.Schema({
  name: String,
  ingredients: Array
});

module.exports = mongoose.model("order", orderSchema);