// JavaScript

// types:
// number
// string
// boolean
// object
// undefined
// function => functions are first class, higher order function
// functional scope && function hoisting


// key-value attributes
// keys must be string
// values can by any valid value
var person = {
  "name": "Rado",
  "age": 24
};


function Container() {
  var data = [];

  this.getData = function() { return data; };
  this.add = function(item) {
    data.push(item);
    // chaining
    return this;
  };

  this.remove = function(item) {
    data = data.filter(function(x) { return x !== item; });
    return this;
  };

}

Container.prototype.toString = function() {
  return "[" + this.getData().join(", ") + "]";
}

// IIFE

var C = (function() {
  var data = [];
  
  function add(item) {
    data.push(item);
    return this;
  }

  function remove(item) {
    data = data.filter(function(x) { return x !== item; });
    return this;
  };

  function getData() { return data; }
  
  return {
    add: add,
    remove: remove,
    getData: getData
  }

})();

function Person(name) {
  this.name = name;
}

Person.prototype.toString = function() { return this.name; }

function Student(name, fn) {
  Person.call(this, name);
  this.fn = fn;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.toString = function() {
  return Person.prototype.toString.call(this) + " " + this.fn;
}
