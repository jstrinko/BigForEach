var BigForEach = require(process.env.SRCTOP + '/ec/lib/util/bigforeach').BigForEach,
	ASync = require('async');

var arr = [];
for(var x=0; x<1000000; x++) {
	arr.push(x);
}
var start = +new Date();
var i = 0;
var j = 0;
BigForEach(arr, function(number, foreach_callback) {
	ASync.waterfall(
		[
			function(waterfall_callback) {
				i++;
				waterfall_callback();
			},
			function(waterfall_callback) {
				j++;
				waterfall_callback();
			}
		],
		function(err) {
			foreach_callback();
		}
	)
}, function(err) {
	console.log("Big Bench: " + (+new Date() - start));
	console.log("I: " + i);
	console.log("J: " + j);
});
