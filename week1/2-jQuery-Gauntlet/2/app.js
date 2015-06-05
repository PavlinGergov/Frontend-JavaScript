"use strict";

$(document).ready(function(){
  var que = [];
  $("#mightyParagraphHolder").find("p").each(function(){
      var pClassName = $(this).attr("class");
      que.push(pClassName);
  });
  var $toggleButton = $("#toggle");
  var previousClassName = "";
  var currentClassName = "";
  $toggleButton.click(function() {
    currentClassName = que.shift();
    $("." + currentClassName).addClass("highlight");
    if (previousClassName !== ""){
      $("." + previousClassName).removeClass("highlight");
    }
    previousClassName = currentClassName;
    que.push(currentClassName);
  });
});
