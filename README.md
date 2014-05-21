# bigforeach.js

bigforeach is a wrapper for Async.forEach. When working with large data sets, Async.forEach runs into performance, memory, and stack size problems. bigforeach is an attempt to tackle these issues. It's syntax is the same as Async.forEach. When using Async.forEach on large arrays (~1,000,000 or more), node tends to run out of memory. bigforeach simply utilizes a divide and conquer strategy to prevent memory issues. As an added bonus, due to the decreased stack size, performance is vastly improved. Using the included test script, performance gains exceeding 100% are observed.

TEST
