/* globals $, Handlebars, alert*/

$(document).ready(function(){
  "use strict";
  // Get the info, draw the table and create the settings
  var tasks = JSON.parse(localStorage.getItem("tasks"));
  drawTable();
  createInitialSettings();
  // Add on click for buttons
  $("#addTask").click(addTask);
  $("#changeProfileSettings").click(changeSettings);
  $(".star-button").click(function(){
    $(this).toggleClass("btn-warning");
    changeStatus($(this).attr("name"), "stared");
  });
  $(".status-button").click(function(){
    $(this).toggleClass("btn-danger btn-success");
    $(this).find(".taskStatus").toggleClass("glyphicon-remove glyphicon-ok");
    changeStatus($(this).attr("name"), "status");
  });
  $(".remove-task").click(function(){
    removeTask($(this));
  });

  // Change the stared or status fields and save the info to localStorage
  function changeStatus(title, key){
    tasks.map(function(x){
      if (x.title === title) {
        if (x[key]) {
          x[key] = false;
        } else {
        x[key] = true;
        }
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function createInitialSettings(){
    // Create the modals settings
    $("img").attr("src", localStorage.getItem("pic"));
    $("input[name=pic]").val(localStorage.getItem("pic"));
    $(".main-container").css("background-color", localStorage.getItem("color"));
    $("input[name=backgroundColor]").val(localStorage.getItem("color"));
    $(".greeting-message > p").text("Hello " + localStorage.getItem("user"));
    $("input[name=username]").val(localStorage.getItem("user"));
    // Create the buttons settings
    $(".star-button").each(function(x, elem){
      if (tasks.filter(function(task){
        return task.title === elem.name;
      })[0].stared) {
        $(elem).addClass("btn-warning");
      }
    });
    $(".status-button").each(function(x, elem){
      if (tasks.filter(function(task){
        return task.title === elem.name;
      })[0].status) {
        $(elem).toggleClass("btn-danger btn-success");
        $(elem).find(".taskStatus").toggleClass("glyphicon-remove glyphicon-ok");
      }
    });
  }

  function drawTable(){
    // Draw table with Handlebars
    $("#tasksTable > tbody").empty();
    var source = $("#tasks-template").html();
    var template = Handlebars.compile(source);
    JSON.parse(localStorage.getItem("tasks")).forEach(function(task){
      var html = template(task);
      $("#tasksTable > tbody").append(html);
    });
    $(".load-modal").click(function(){
      $(".description-header").empty();
      $(".description-header").text($(this).attr("task-description"));
    });
  }

  function addTask(){
    // Create the new task object
    var task = {};
    task.title = $("input[name=title]").val();
    $("input[name=title]").val("");

    task.deadline = $("input[name=deadline]").val();
    $("input[name=deadline]").val("");

    task.description = $("textarea[name=discription]").val();
    $("textarea[name=discription]").val("");
    // Add it to the current tasks and localStorage and redraw
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    drawTable();
    createInitialSettings();
  }

  function removeTask(task) {
    tasks = tasks.filter(function(x){
      return x.title !== task.attr("name");
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    drawTable();
    createInitialSettings();
  }

  function changeSettings(){
    // Set color
    var color = $("input[name=backgroundColor]").val();
    localStorage.setItem("color", color);
    $(".main-container").css("background-color", color);
    $("input[name=backgroundColor]").val(color);
    // Set username
    var username = $("input[name=username]").val();
    localStorage.setItem("user", username);
    $(".greeting-message > p").text("Hello " + username);
    $("input[name=username]").val(username);
    // Set profile picture
    var value = $("input[name=pic]").val(),
        obj = new Image();
        obj.src = value;
    if (obj.complete && value !== "") {
      localStorage.setItem("pic", value);
      $("input[name=pic]").val(value);
      $("img").attr("src", value);
    } else {
        alert("Enter a valid image!");
    }
  }
});

