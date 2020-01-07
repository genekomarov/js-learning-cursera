var assert = require('assert');

var Collection = require('./index.js');

var elements = (Collection.from(['a', 'b', 'c']));

console.log(elements);

console.log(elements.values());

console.log(elements instanceof Collection);