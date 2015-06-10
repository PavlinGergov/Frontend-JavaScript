/* globals $, alert, Handlebars */

$(document).ready(function(){
  "use strict";

  var students = [];
  getStudents();

  $("#select-course").change(function() {
    var course = $("#select-course").val();
    if ($("#course-input").val() !== "") {
      $("#course-input").val($("#course-input").val() + ", " + course);
    } else {
      $("#course-input").val(course);
    }
  });

  $("#create-student").click(function(){
    if (checkInputs()){
      alert("Please fill all fields.");
    }
    var student = {
      "name": $("#name-input").val(),
      "facultyNumber": $("#faculty-number-input").val(),
      "courses": $("#course-input").val().split(", ")
    };
    addStudent(student);
  });

  function addStudent(student){
    $.ajax({
      type: "POST",
      url: "http://localhost:3030/student",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(student)
    })
      .done(function() {
        getStudents();
      })
      .fail(function() {
        alert("Panic error, run away!");
      });
  }

  function getStudents(){
    $.ajax({
      type: "GET",
      url: "http://localhost:3030/students",
      dataType: "json"
    }).done(function(data) {
        students = data;
        createAccordion(data);
      }).fail(function() {
        alert("Try runing node server.js in the server folder!");
      });
  }

  function addSingleStudentToDom(student){
    var $dl = $(".accordion");
    var $a = $("<a></a>");
    var $dt = $("<dt></dt>");
    var $dd = $("<dd></dd>");
    $a.attr("href", "");
    $a.text(student.name);
    $dt.append($a);
    $dl.append($dt);
    $dd.text("Faculty Number: " + student.facultyNumber + "; Courses: " + student.courses);
    $dl.append($dd);
    return $dl;
  }

  function createAccordion(data){
    $(".accordion").empty();
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    data.forEach(function(student){
      console.log(student);
      var context = student;
      var html = template(context);
      console.log(html);
      $(".accordion").append(html);
      // addSingleStudentToDom(student);
    });
    $(".accordion").accordion();
  }

  function checkInputs(){
    return $(".create-students > input").filter(function() {
      return $(this).val() === "";
    }).length !== 0;
  }

});

