"use strict";

function Shape(type) {
  this.getType = function() {
    return type;
  };
}

Shape.prototype.area = function() {
  throw new Error("Cannot call area of Shape. Use subclasses!");
};

function Rectangle() {
  Shape.call(this, "rectangle");

}
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.area = function() {
  return "Rest is for the wicked, no time for math.";
};

function Triangle() {
  Shape.call(this, "triangle");

}
Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.area = function() {
  return "Rest is for the wicked, no time for math.";
};

function Circle() {
  Shape.call(this, "circle");

}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.area = function() {
  return "Rest is for the wicked, no time for math.";
};

var pitagor_triangle = new Triangle();
console.log(pitagor_triangle.area());

var random_shape = new Shape("asd");
// console.log(random_shape.area());
