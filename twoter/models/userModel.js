var mongoose = require('mongoose');

// I think it would be nice to consider a way to attach to a "twottes" 
// key to your model that instantiates the twoteModel that you have created
// and simply references all twottes that a given user has written nicely. 
// A way to do this is by setting twottes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'twottes' }].
// If you have more questions about this, please come find me and we can dicsuss it :), but your
// current implementation is just fine :+1:

// Create a Schema
var userSchema = mongoose.Schema({
  name: String,
  password: String
});

module.exports = mongoose.model("user", userSchema);