/* globals $ */
'use strict';
$(document).ready(function(){

});

// Initialize variables:
var myArray1000 = [];
var myObj1000 = {};

var structureLen = 10000;
var valueToSearch = 1;
var iterations = 500;

for(var i = 0; i < structureLen; i++ ){
  myArray1000[i] = i;
}

for(var i = 0; i < structureLen; i++ ){
  myObj1000[i] = i;
}

// The indexOf test:
console.time('Function #1');

for(var i = 0; i < iterations; i++ ){
  if (myArray1000.indexOf(valueToSearch) !== -1) {}
}

console.timeEnd('Function #1');

// The in test:
console.time('Function #2');

for(var i = 0; i < iterations; i++ ){
  if (valueToSearch in myObj1000) {}
}

console.timeEnd('Function #2');

// http://stackoverflow.com/questions/7737850/in-js-which-is-faster-objects-in-operator-or-arrays-indexof
