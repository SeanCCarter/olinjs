var fs = require('fs');
var path = require("path"); // require is a special function provided by node

module.exports = function findFiles(files, extention, callback) {
  fs.readdir(files, function doneReading(err, list) {
  	if (err) {
  		return callback(err)
  	}
  	else {
  		list = list.filter(function(file) {
        return path.extname(file) == '.' + extention
      });
		  callback(err, list)
  	  }
    })
}