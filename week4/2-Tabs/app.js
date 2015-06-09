"use strict";

$(document).ready(function(){
  tabs("ul");

  function tabs(element){
    $("a").click(function(x){
      x.preventDefault();
    });

    var elements = [];
    $(element).find("a").each(function(){
        var aHref = $(this).attr("href");
        elements.push(aHref);
    });

    initialView(elements);

    $("a").click(function() {
      var currentLi = $(this).attr("href");
      $(currentLi).show();
      elements.filter(function(item){
        return item !== currentLi;
      }).forEach(function(item){
        $(item).hide();
      });
    });

    function initialView(arr){
      arr.filter(function(element, index){
        return index !== 0;
      }).forEach(function(element){
        $(element).hide();
        });
    }
  }
});
