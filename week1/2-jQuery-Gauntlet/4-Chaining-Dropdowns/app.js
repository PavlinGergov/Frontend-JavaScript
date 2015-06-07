"use strict";

$(document).ready(function() {
  $.getJSON('http://localhost:3000/students')
    .success(start)
    .fail(function() {
        alert("You are probably not running server.js in the server folder.")
    });

  function start(data){
    $("[name='course-pick']").change(function() {
      var course = $("[name='course-pick']").val();
      createStudentsSelector(course, data);
      showGitHub(data);
    });
    $("#students").change(function() {
      showGitHub(data);
    });
  }

  function createStudentsSelector(course, data) {
    var $selector = $("#students");
    $selector.empty();
    data.forEach(function(item) {
      if (item.course === course) {
        var $option = $("<option></option>");
        $option.append(item.name);
        $selector.append($option);
      }
    });
    return $selector;
  }

  function showGitHub(data) {
    var gitHub = data.filter(function(x){
      return x.name === $("#students").val();
    })[0].github;
    $("#gitHubLink").attr("href", gitHub);
    $("#gitLink").empty();
    $("#gitLink").append(gitHub);
  }

});
