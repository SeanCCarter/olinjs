var net = require('http');
var fs = require('fs');
var url = require('url');

var server = net.createServer(callback);
server.listen(process.argv[2])
function callback(request, response) {
	response.writeHead(200, { 'Content-Type': 'application/json' })
	var pathname = url.parse(request.url).pathname;  
	if (pathname == "/api/parsetime") {
		var thingie = url.parse(request.url, true)
		time = JSON.stringify(parsetime(thingie.query.iso))
		response.write(time, function(){response.end();})
	}
	else {
		var thingie = url.parse(request.url, true)
		time = JSON.stringify(parsesecs(thingie.query.iso))
		response.write(time, function(){response.end();})
	}
	
}

function parsetime(time) {
	time = time.split("T")
	console.log(time)
	return {
				"hour": 24 - (parseInt(time[1].slice(0,2)) + 1),
				"minute": parseInt(time[1].slice(3,5)),
				"second": parseInt(time[1].slice(6,8)),
			}
}

function parsesecs(time) {
	return { "unixtime": Date.parse(time)}
}