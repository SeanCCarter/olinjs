var net = require('http');
var fs = require('fs');
var server = net.createServer(callback);
server.listen(process.argv[2])
function callback(request, response) {
	var stream = fs.createReadStream(process.argv[3]);
	stream.pipe(response)
	//stream.on("end", function(){response.end();request.end()})
}