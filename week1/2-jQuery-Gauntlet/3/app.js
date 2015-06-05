"use strict";

$(document).ready(function() {
  $("#search-button").click(function() {
    var value = $("#search-input").val(),
        obj = new Image();
        obj.src = value;
    if (obj.complete && value !== "") {
      createImage(value);
    } else {
        $("#search-input").val("");
        alert("Enter a valid image!");
    }
  });
  function createImage(url) {
    var $div = $("<div></div>"),
        $img = $("<img />");
    $img
        .attr("height", 100)
        .attr("src", url);
    $div
        .attr("class", "thumbnail col-xs-4");
    $div.bind("click", function(){
      $div.remove();
    });
    $div.append($img);
    $(".image-container").append($div);
    $("#search-input").val("");
  };
});
