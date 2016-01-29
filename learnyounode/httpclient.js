var http = require('http');

http.get(process.argv[2], callback)

function callback(response) {
	response.setEncoding("utf8")
	response.on("data", function(data){console.log(data)});
	response.on("error", function(error){throw error});
	response.on("end", function(){})
}