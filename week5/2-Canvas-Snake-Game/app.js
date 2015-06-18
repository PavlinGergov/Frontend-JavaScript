/* globals $*/

$(document).ready(function(){
  "use strict";
  var canvas = $("#canvas")[0],
      ctx = canvas.getContext("2d"),
      snake,
      w = $("#canvas").width(),
      h = $("#canvas").height(),
      cellWidth = 8,
      loopTime = 20,
      direction,
      food,
      tail;
  init();
  // var game_loop = setInterval(viewSnake, loopTime);

  function init(){
    direction = "right";
    createSnake();
    createFood();
    setInterval(viewSnake, loopTime);
  }


  function createFood(){
    food = {
      x: Math.round(Math.random()*(w-cellWidth)/cellWidth),
      y: Math.round(Math.random()*(h-cellWidth)/cellWidth),
    };
  }

  function createSnake(){
    var length = 4;
    snake = [];
    for (var i = length - 1; i >= 0; i--){
      snake.push({x: i, y:0});
    }
  }


  function viewSnake(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    var nx = snake[0].x;
    var ny = snake[0].y;

    if (direction === "right"){
      nx++;
    } else if (direction === "left"){
      nx--;
    } else if (direction === "up") {
      ny--;
    } else if (direction === "down") {
      ny++;
    }

    if (nx === -1 || nx === w / cellWidth || ny === -1 || ny === h / cellWidth || checkForCollision(nx, ny, snake)) {
      init();
      return;
    }

    if (nx === food.x && ny === food.y) {
      tail = {x: nx, y: ny};
      createFood();
    } else {
      tail = snake.pop();
      tail.x = nx;
      tail.y = ny;
    }

    snake.unshift(tail);

    for(var i = 0; i < snake.length; i++){
      var cell = snake[i];
      paintCell(cell.x, cell.y);
    }
    paintCell(food.x, food.y);
  }

  function paintCell(x, y){
    ctx.fillStyle = "black";
    ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
  }

  function checkForCollision(x, y, array){
    for(var i = 0; i < array.length; i++){
      if(array[i].x == x && array[i].y == y)
       return true;
    }
    return false;
  }

  // $(document).keypress(function(){
  //   console.log("asd");
  // });

  $(document).keydown(function(button){
    console.log("asd");
    var key = button.which;
    if (key === "37" && direction != "right") {
      direction = "left";
    } else if (key === "38" && direction != "down") {
      direction = "up";
    } else if (key === "37" && direction != "left") {
      direction = "right";
    } else if (key === "37" && direction != "up") {
      direction = "down";
    }
  });
});
