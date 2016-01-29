var fs = require('fs')
var thing = fs.readFileSync(process.argv[2])
console.log(thing.toString().split('\n').length -1)

