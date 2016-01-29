var fs = require('fs') // require is a special function provided by node

function findFiles(callback) {
  fs.readdir(process.argv[2], function doneReading(err, list) {
    callback(list, process.argv[3])
    })
}

function sortFiles(files, extention) {
	for(i = 0; i < files.length; i++) {
		if (files[i].slice(files[i].length-extention.length-1,files[i].length) == "." +extention) {
			console.log(files[i])
		}
	}
}

findFiles(sortFiles)