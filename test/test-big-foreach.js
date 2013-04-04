var BigForEach = require('../lib/bigforeach').BigForEach,
	ASync = require('async');

// This script can be run without arguments. 

var arr = [];
var count = process.argv[2] || 100000;
var min_threshold = process.argv[3] || 100;
for(var x=0; x<count; x++) {
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
	console.log("Iterating over " + i + " items with divided arrays no larger than " + min_threshold + " items took " + (+new Date() - start) + "ms");
}, min_threshold);
