var http = require('http');

http.get(process.argv[2], callback)

page = ""

function callback(response) {
	response.setEncoding("utf8")
	response.on("data", function(data){page += data});
	response.on("error", function(error){throw error});
	response.on("end", function(){console.log(page.length);console.log(page)})
}