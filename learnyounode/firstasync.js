var fs = require('fs') // require is a special function provided by node
var myNumber = undefined

function findNewlines(callback) {
  fs.readFile(process.argv[2], function doneReading(err, fileContents) {
    myNumber = fileContents.toString().split("\n").length -1
    callback()
    })
}

function logMyNumber() {
  console.log(myNumber)
}

findNewlines(logMyNumber)