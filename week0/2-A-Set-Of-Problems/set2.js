"use strict";

// forEach for objects

var forEach = function(f, arr) {
  if (Array.isArray(arr)){
    var i = 0, n = arr.length;
    for(i; i < n; i++) {
      f(arr[i], i, arr);
    }
  } else {
    for (var key in arr) {
      if (arr.hasOwnProperty(key)) {
        f(arr[key], key);
      }
    }
  }
};

var info = {
    "name" : "Rado",
    "age" : 23
};

forEach(function(value, key) {
   console.log(key, value);
}, info);

// String format

var format = function(str, dict){
  var words = str.split(/[\s,!?.]+/), result=[];
  words.forEach(function(word){
    // console.log(word);
    if (word.indexOf("{") === 0 && word.indexOf("}") === word.length - 1){
      // console.log(word);
      word = word.slice(1,word.length - 1);
      if (dict.hasOwnProperty(word)) {
        result.push(dict[word]);
      } else {
        result.push(word);
      }
    } else {
      result.push(word);
    }
  });
  return result.join(" ");
};

var formatted = format("{lang} is a very weird {thing}!", {
  "lang" : "JavaScript",
  "thing" : "language"
});

console.log(formatted);

// Let's map

var map = function(f, arr){
  var result = [];
  arr.forEach(function(element){
    result.push(f(element));
  });
  return result;
};

var result = map(function(x) {
    return x * x;
}, [1,2,3]);

console.log(result); // [1, 4, 9]

// Let's filter

var filter = function(pred, arr){
  var result = [];
  arr.forEach(function(element){
    if (pred(element)){
      result.push(element);
    }
  });
  return result;
};

var users = [{
    "name" : "Rado",
    "score" : 50
}, {
    "name" : "Ivan",
    "score" : 67
}, {
    "name" : "Vlado",
    "score" : 30
}];

var result = filter(function(user) {
    return user.score > 40;
}, users);

console.log(result);

// Reduce arrays

var reduce = function(f, z, arr){
  if (arr.length === 0){
    return z;
  }
  return reduce(f, f(z,arr[0]), arr.slice(1));
};

var asd = reduce(function(a,b){
  return a + b;
}, 0, [1,2,3]);

console.log(asd);

// Any and All

var any = function(pred, arr) {
  arr.forEach(function(element){
    if (pred(element)){
      return true;
    }
  });
  return false;
};

var any2 = function(pred, arr){
  return reduce(function(a,b){
    return a && b;
  }, true, map(pred, arr));
};

var all = function(pred, arr) {
  var all_true = true;
  arr.forEach(function(element){
    if (!pred(element)){
      all_true = false;
    }
  });
  return all_true;
};

var all2 = function(pred, arr){
  return reduce(function(a,b){
    return a || b;
  }, true, map(pred, arr));
};
