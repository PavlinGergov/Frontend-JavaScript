"use strict";

$(document).ready(function() {

  accordion(".accordion");

  function accordion(element){
    $("a").click(function(x){
      x.preventDefault();
    });

    var elements = [];
    $(element).find("dd").each(function(){
        var ddId = $(this).attr("class");
        elements.push(ddId);
    });

    initialView(elements);

    $("dt").click(function() {
      var currentDd = $(this).attr("class");
      $("dd." + currentDd).show();
      elements.filter(function(item){
        return item !== currentDd;
      }).forEach(function(item){
        $("dd." + item).hide();
      });
    });

    function initialView(arr){
      arr.filter(function(element, index){
        return index !== 0;
      }).forEach(function(element, index){
        $("dd." + element).hide();
        });
    }
  }
});
