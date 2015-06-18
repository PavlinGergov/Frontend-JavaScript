/* globals $*/
$(document).ready(function(){
  "use strict";

  var canvas = $("#canvas")[0],
      ctx = canvas.getContext("2d"),
      w = $("#canvas").width(),
      h = $("#canvas").height(),
      cellWidth = 20,
      d,
      food,
      score,
      tail,
      snake,
      gameover;
  init();

  function init(){
    d = "right";
    create_snake();
    create_food();
    if (!gameover){
      gameLoop();
    }
  }

  function create_snake(){
    var length = 4;
    snake = [];
    for(var i = length-1; i>=0; i--){
      snake.push({x: i, y:0});
    }
  }

  function create_food(){
    food = {
      x: Math.round(Math.random()*(w-cellWidth)/cellWidth),
      y: Math.round(Math.random()*(h-cellWidth)/cellWidth),
    };
    console.log(food);
  }

  function gameLoop(){
    setTimeout(function() {
      paint();
      gameLoop();
    }, 100);
  }

  function paint(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);

    var nx = snake[0].x;
    var ny = snake[0].y;
    if(d == "right") {
      nx++;
    } else if(d == "left") {
      nx--;
    } else if(d == "up") {
      ny--;
    } else if(d == "down") {
      ny++;
    }
    if (nx === -1 || nx === cellWidth + 3 || ny === -1 || ny === 3 + cellWidth || checkForCollision(nx, ny, snake)) {
      gameover = true;
      init();
      return;
    }

    if(nx == food.x && ny == food.y) {
      tail = {x: nx, y: ny};
      score++;
      create_food();
    } else {
      tail = snake.pop();
      tail.x = nx; tail.y = ny;
    }

    snake.unshift(tail);
    for(var i = 0; i < snake.length; i++){
      var c = snake[i];
      paint_cell(c.x, c.y, "green");
    }
    paint_cell(food.x, food.y, "black");
  }

  function paint_cell(x, y, color){
    ctx.fillStyle = color;
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

  $(document).keydown(function(button){
    var key = button.which;
    if(key == "37" && d != "right") {
      d = "left";
    } else if(key == "38" && d != "down") {
      d = "up";
    } else if(key == "39" && d != "left"){
      d = "right";
    } else if(key == "40" && d != "up"){
      d = "down";
    }
  });
});
