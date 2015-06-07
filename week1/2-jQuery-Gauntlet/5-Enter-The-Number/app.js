"use strict";

$(document).ready(function() {
  var randNumb = createNumb();

  $("button").click(function(){
    if (this.id !== "back-space") {
      addNumb(this.id);
    } else {
      removeDigit();
    }
  });

  function createNumb(){
    randNumb = Math.floor((Math.random() * 10000) + 1);
    $("#number").text("");
    $("#random-number").text(randNumb);
    return randNumb;
  }

  function addNumb(numb){
    $("#number").append(numb);
    if (randNumb === parseInt($("#number").text())){
      alert("Congratulation! You typed it right! Let's try with another one :)");
      createNumb();
    }
  }

  function removeDigit(){
    var newNumb = Math.floor(parseInt($("#number").text()) / 10);
    if (newNumb === 0){
      $("#number").text("");
    } else {
    $("#number").text(newNumb);
    }
  }

});
