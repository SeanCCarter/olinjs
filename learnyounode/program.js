var args = process.argv;
var sum = 0
for (var i = 2; i<args.length; i++)
{
	sum += parseInt(args[i], 10);
}

console.log(sum)