"use strict";

// A Pair or two

function Pair(left, right){
  this.left = left;
  this.right = right;
}

Pair.prototype.equals = function(pair){
  return pair.left === pair.right;
};

Pair.prototype.toString = function(){
  return "({" + this.left + "}, {" + this.right + "})";
};

Pair.prototype.toList = function(){
  return [this.left, this.right];
};

Pair.prototype.combine = function(f){
  return f(this.left, this.right);
};

var p = new Pair(4, 6);
var q = new Pair(5, 8);

console.log(p.equals(q));
console.log(p.toString());
console.log(p.toList());
console.log(p.combine(function(left, right) {
  return left + right;
  })
);

// String Prototype

String.prototype.capitalize = function(){
  return this.toUpperCase();
};

String.prototype.dasharize = function(){
  return this.replace(/_/g, "-");
};

String.prototype.times = function(amount){
  var result = this, i = 1;
  for (i; i < amount; i++) {
    result += " " + this;
  }
  return result;
};

String.prototype.blank = function(){
  return this.replace(/ /g, "").split("").length === 0;
};

console.log("javascript".capitalize());
console.log("border_bottom_width".dasharize());
console.log("javascript".times(5));
console.log("  ".blank());
console.log("".blank());
console.log(" a".blank());

// Array prototype

Array.prototype.first = function(){
  if (this.length === 0) {
    throw new RangeError("Please enter non empty array");
  }
  return this[0];
};

Array.prototype.range = function(from, to){
  var result = [], start = from, end = to;
  while (start <= end){
    result.push(start);
    start += 1;
  }
  return result;
};

Array.prototype.sum = function(){
  return this.reduce(function(previous, current){
    return previous + current;
  }, 0);
};

Array.prototype.avarage = function(){
  return this.sum() / this.length;
};

// console.log([].first());
console.log([1,2].first());
console.log([].range(1,10));
console.log([1,2,3,4].sum());
console.log([1,2,3].avarage());

// Number prototype

Number.prototype.times = function(action){
  for (var i = 0; i < this; i++){
    action();
  }
};

(5).times(function() {
  console.log("OMG!");
});

// A point in the sky.

function Point(x, y){
  this.getX = function(){
    return x;
  };

  this.xInc = function(amount){
    x += amount;
  };

  this.xDec = function(amount){
    x -= amount;
  };

  this.getY = function(){
    return y;
  };

  this.yInc = function(amount){
    y += amount;
  };

  this.yDec = function(amount){
    y -= amount;
  };

}

Point.prototype.equals = function(point){
  return point.getX() === point.getY();
};

Point.prototype.toString = function(){
  return "Point @ {" + this.getX() + "}, {" + this.getY() + "}";
};

var p = new Point(1,2);
var q = new Point(4, 4);

console.log(p.xDec(1));
console.log(p.getX());
// console.log(p.y);
console.log(p.getY());
console.log(p.equals(q));
console.log(p.toString());

// A Robot.

function Robot(startPoint){
  this.setStartPoint = function(){
    startPoint = startPoint;
  };

  this.getStartPoint = function() {
    return startPoint;
  };

  this.moveLeft = function(amount) {
    startPoint.xDec(amount);
  };

  this.moveRight = function(amount) {
    startPoint.xInc(amount);
  };

  this.moveUp = function(amount) {
    startPoint.yInc(amount);
  };

  this.moveDown = function(amount) {
    startPoint.yDec(amount);
  };

  this.getPosition = function(){
    return startPoint.toString();
  };
}

var robot = new Robot(new Point(0, 0));

robot.moveLeft(10);
robot.moveDown(5);

console.log(robot.getPosition().toString());

// Simulation of a Pizzeria
// IIFE
var makeCounter = (function(){
  var i = 0;
  return function(){
    i += 1;
    return i;
  };
})();

function Pizza(name, cost, timeToMake){
  this.name = name;
  this.cost = cost;
  this.timeToMake = timeToMake;
}

function PizzaOrder(pizza){
  this.pizza = pizza;
  var id = makeCounter();

  this.getId = function(){
    return id;
  };
}

var p = new Pizza("Калцоне", "10", 2000);
var o = new PizzaOrder(p);

console.log(o.getId());
var q = new PizzaOrder(p);
console.log(q.getId());

// Queue from a literal object

var queue = (function() {
  var data = [];
  var push = function(item) {
    data.push(item);
  };
  var pop = function() {
    return data.shift();
  };
  var isEmpty = function(){
    return data.length === 0;
  };

  return {
    push: push,
    pop: pop,
    isEmpty: isEmpty
  };
}());

queue.push(5);
console.log(queue.pop());
console.log(queue.isEmpty());

// An Event Queue

var que = (function() {
  var events = {};
  var on = function(eventName, callback) {
    if (!events.hasOwnProperty(eventName)){
      events[eventName] = [];
    }
    events[eventName].push(callback);
  };
  var remove = function(eventName) {
    delete events[eventName];
  };
  var trigger = function(eventName){
    events[eventName].forEach(function(event){
      event();
    });
  };

  return {
    on: on,
    remove: remove,
    trigger: trigger
  };
}());

que.on("PANIC_EVENT", function() {
    console.log("PANIC_EVENT HAPPENED!");
});

que.on("PANIC_EVENT", function() {
    console.log("PANIC_EVENT HAPPENED AGAIN!");
});

que.trigger("PANIC_EVENT");
