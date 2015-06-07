"use strict";

$(document).ready(function() {
  $.getJSON("http://localhost:3000/students")
    .success(start)
    .fail(function() {
        alert("You are probably not running server.js in the server folder.");
    });

  function start(data){
    initialFill(data);

    $(".btn").on("click", function() {
      var fromList = $(this).attr("from-list"),
          selectedValues = $(fromList).val(),
          toList = "";

      if (fromList === "#leftSelect") {
        toList = "#rightSelect";
      } else {
        toList = "#leftSelect";
      }

      if (selectedValues) {
        selectedValues.forEach(function(value) {
          var $element = $(fromList).find("option[value=" + value + "]");
          $element.removeAttr("selected");
          $(toList).append($element);
        });
      }
    });
  }

  function initialFill(data) {
    data.forEach(function(student) {
      var option = $("<option></option>");

      option.attr("value", student.id);
      option.text(student.name);

      $("#leftSelect").append(option);
    });
  }
});
