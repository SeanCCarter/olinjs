var net = require('net');
var server = net.createServer(callback);
server.listen(process.argv[2])

function callback (socket) {
	var date = new Date();
	time = "";
	time += date.getFullYear() + "-";
	month = parseInt(date.getMonth());
	day = date.getDate();

	if (month.toString().length == 2){time += (month +1) + '-'}
	else {time += "0"+(month+1)+"-"}

	if (day.toString().length == 2){time += day + ' '}
	else {time += ("0"+day+" ")}

	time += date.getHours() + ":";
	time += date.getMinutes();
	console.log(time)
	socket.write(time)
	console.log("Got here.")
	socket.end()
}