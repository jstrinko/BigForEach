if (typeof require !== 'undefined') {
	var ASync = require('async');
}
// The idea here is that ASync.forEach is slow over large arrays.
// Also, in testing, ASync.forEach cannot handle very large arrays 
// (~1,000,000 elements or more) without running into memory issues.
// BigForEach breaks up the array into smaller arrays and executes on those
// This prevents a gigantic stack.
// Divide and conquer!
var BigForEach = function(arr, func, outer_callback, min_threshold) {
	if (!min_threshold) { 
		min_threshold = 100;
	}
	min_threshold = min_threshold < 2 ? 2 : min_threshold;
	var length = arr.length;
	var threshold = Math.sqrt(length);
	if (threshold < min_threshold) {
		threshold = min_threshold;
	}
	var count = Math.floor(length / threshold);
	var leftover = length % threshold;
	var total_count = count + (leftover ? 1 : 0);
	if (total_count > threshold) {
		var index = 0;
		ASync.whilst(
			function() {
				return index < total_count;
			},
			function(callback) {
				var part = index < count ? 
					arr.slice(index * threshold, (index + 1) * threshold) :
					arr.slice(count * threshold, (count * threshold) + leftover);
				index++;
				BigForEach(
					part,
					func,
					function(error) {
						return callback(error);
					},
					min_threshold
				);
			},
			function(error) {
				if (outer_callback) {
					return outer_callback(error);
				}
			}
		);
	}
	else {
		var index = 0;
		ASync.whilst(
			function() {
				return index < total_count;
			},
			function(callback) {
				var part = index < count ? 
					arr.slice(index * threshold, (index + 1) * threshold) :
					arr.slice(count * threshold, (count * threshold) + leftover);
				index++;
				ASync.forEach(part, func, callback);
			},
			function(error) {
				if (outer_callback) {
					return outer_callback(error);
				}
			}
		);
	}
};

if (typeof exports !== 'undefined') {
	exports.BigForEach = BigForEach;
}
