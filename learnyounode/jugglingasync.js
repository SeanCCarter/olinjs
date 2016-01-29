var http = require('http');
var pages = []
var counter = 0
// for(i=2;i<process.argv.length;i++) {
// 	http.get(process.argv[i], callback)
// }

http.get(process.argv[2], callback)

function callback(response) {
	pages.push("")
	//console.log(pages.length)
	response.setEncoding("utf8")
	response.on("data", function(data){pages[counter] += data});
	response.on("error", function(error){throw error});
	response.on("end", function(){counter++;storepage();if (counter < 3) {http.get(process.argv[pages.length+2], callback)}})
	
}

function storepage() {
	if (counter == 3) {
		for(i=0;i<pages.length;i++) {
			console.log(pages[i])
		}
	}
}