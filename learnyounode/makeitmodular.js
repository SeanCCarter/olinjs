var mymodule = require('./firstmodule.js')


function callback (err, data) {
	if (err) {
		console.log(err)
	}
	else {
		for (i=0; i<data.length; i++) {
			console.log(data[i])
		}
	}
}

mymodule(process.argv[2], process.argv[3], callback)