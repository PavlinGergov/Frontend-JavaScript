"use strict";

// Sum only numbers. Concat only strings.

var sum = function(a,b) {
  if (typeof a === "number" && typeof b === "number"){
    return a + b;
  } else {
    throw new TypeError("Something is wrong with the types.");
  }
};

// Contains. Find element in a list.

var contains = function(element, arr) {
  return arr.filter(function(x){
    return x === element;
  }).length !== 0;
};

// Contains them all? Find a list in a list

var containsAll = function(elements, arr) {
  return elements.map(function(element){
    return contains(element, arr);
  }).every(function(x){
      return x === true;
    });
};

// Group them by!

var groupBy = function(groupingFunction, arr) {
  var result = {};
  arr.forEach(function(x){
    if (!result.hasOwnProperty(groupingFunction(x))){
      result[groupingFunction(x)] = [];
    }
    result[groupingFunction(x)].push(x);
  });
  return result;
};

// Count them by!

var countBy = function(countingFunction, arr) {
  var result = {};
  arr.forEach(function(x){
    if (!result.hasOwnProperty(countingFunction(x))){
      result[countingFunction(x)] = 0;
    }
    result[countingFunction(x)] += 1;
  });
  return result;
};

// always!

var always = function(value) {
  return function(){
    return value;
  };
};

// A list of only certain values.

var only = function(type, arr) {
  return arr.filter(function(x){
    return typeof x === type;
  }).length === arr.length;
};

// Texas Ranger!

var range = function(from, to) {
  var result = [from];
  if (from === to){
    return [from];
  }
  return result.concat(range(from + 1, to));
};

// find or undefined

var find = function(predicate, arr) {
  arr.forEach(function(x){
    if (predicate(x)){
      return x;
    }
  });
};

// Without them!

var without = function(exclude, arr) {
  return arr.filter(function(x){
    return exclude.indexOf(x) === -1;
  });
};

// Pluck

var pluck = function(property, arr) {
  return arr.map(function(x){
    return x[property];
  });
};

// Zip!

var getCounter = function(obj){
  var count = 0;
  Object.keys(obj).forEach(function(x){
    if (obj[x].length > count){
      count = obj[x].length;
    }
  });
  return count - 1;
};

var zip = function() {

};

// console.log(zip([1, 2, 3], [4, 5, 6], [7, 8, 9]));
// [ [1, 4, 7], [2, 4, 8], [3, 6, 9] ]

// Histogram of words

var wordsHistogram = function(str){
  var result = {};
  var words = str.toLowerCase().split(/\W+/).filter(function(x){
    return x !== "";
  });
  words.forEach(function(word){
      if (!result.hasOwnProperty(word)){
        result[word] = 0;
      }
      result[word] += 1;
  });
  return result;
};

// Histogram of characters

var charsHistogram = function(str){
  var result ={};
  str.toLowerCase().split("").forEach(function(char){
    if (char.match(/[a-z]/) !== null){
      if (!result.hasOwnProperty(char)){
        result[char] = 0;
      }
      result[char] += 1;
    }
  });
  return result;
};

// Unordered lists and ordered lists

var li = function(item){
  return "<li>" + item.label + "</li>";
};

var ul = function(items) {
  var openUl = ["<ul>"], closeUl = ["</ul>"];
  return generateList(ul, items, openUl, closeUl);
};

var ol = function(items) {
  var openOl = ["<ol>"], closeOl = ["</ol>"];
  return generateList(ol, items, openOl, closeOl);
};

var generateList = function(func, items, openingTag, closingTag){
  var result = openingTag;
  items.forEach(function(item){
    result.push(li(item));
    if (item.hasOwnProperty("children")){
      func(item.children).forEach(function(x){
        result.push(x);
      });
    }
  });
  return result.concat(closingTag);
};

var nested = [{ "label" : "Item 1"},
             { "label" : "Item 2", "children" : [
                {
                    "label" : "Level 2 of Item 2",
                    "children" : [
                      {
                        "label": "level 3 of item 2"
                      },
                      {
                        "label": "level 3 of item 2",
                        "children": [
                          {
                            "label": "level 4 of item 2"
                          }
                        ]
                      }
                    ]
                },
                {
                    "label" : "Another level 2"
                }
             ]}];

// console.log(ol(nested));
console.log(ul(nested));
