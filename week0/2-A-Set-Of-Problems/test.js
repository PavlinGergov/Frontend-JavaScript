"use strict";

var repeat = function (char, times) {
  var i = 0, result = "";
  while (i < times) {
    result += char;
    i += 1;
  }
  return result;
};

var b = [1,2,3].map(function(x) {
  return repeat("a", x);
});
console.log(b);

var arr = [[1,2], [3], [4,5]];
var c = arr.map(function(x) {
  return x.length;
});
console.log(c);

var d = ["1", "2", "3"].map(function(x) {
  return parseInt(x);
});
console.log(d);



var numb = 145;

var fact = function(n){
  var i = 1,result = 1;
  while (i <= n){
    result *= i;
    i += 1;
  }
  return result;
};

var toArray = function(arr){
  return (arr+"").split("").map(function(x){return parseInt(x);});
};

var sum = function(arr) {
  var result = 0;
  arr.forEach(function(x) {
    result += x;
  });
  return result;
};

var getNumbs = function(arr){
  var numbs = toArray(arr).filter(function(x) {
    return x % 2 === 1;
  });
  return numbs.map(fact);
};

console.log(sum(getNumbs(numb)));

var leng = function(arr){
  return sum(arr.map(function() {return 1;}));
};

console.log(leng([1,2,3,4]));
