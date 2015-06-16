/* globals $, alert, Handlebars */

$(document).ready(function(){
  "use strict";

  var students = [];
  getStudents(refreshStudents);
  getStudents(drawTable);

  $("#select-course").change(addCourse);
  $("#create-student").click(addStudent);
  $("#update-student").click(updateStudent);
  $("#delete-student").click(deleteStudent);

  function refreshStudents(data){
    students = data;
  }

  function drawTable(data){
    $("#students-table > tbody").empty();
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    data.forEach(function(student){
      var html = template(student);
      $("#students-table > tbody").append(html);
    });
  }

  function addCourse(){
    var course = $("#select-course").val();
    if ($("#course-input").val() !== "") {
      $("#course-input").val($("#course-input").val() + ", " + course);
    } else {
      $("#course-input").val(course);
    }
  }

  function addStudent(){
    if (!checkInputs(".create-students")){
      var student = {
        "name": $("#name-input").val(),
        "facultyNumber": $("#faculty-number-input").val(),
        "courses": $("#course-input").val().split(", ")
      };
      $("#name-input").val("");
      $("#faculty-number-input").val("");
      $("#course-input").val("");
      createStudent(student);
      }
  }

  function createStudent(student){
    $.ajax({
      type: "POST",
      url: "http://localhost:3030/student",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(student)
    })
      .done(function(){
        getStudents(drawTable);
      })
      .fail(function() {
        alert("Error! Student was not added!");
      });
  }

  function getStudents(callBackFunction){
    $.ajax({
      type: "GET",
      url: "http://localhost:3030/students",
      dataType: "json"
    }).done(callBackFunction)
      .fail(function() {
        alert("Try runing node server.js in the server folder!");
      });
  }

  function updateStudent(){
    var facultyNumber = $("#update-facultyNumber").val();

    checkForStudent(facultyNumber, function(result) {
      if (!checkInputs(".update-students") && result) {
        var student = {
          "name": $("#update-name").val(),
          "facultyNumber": $("#update-facultyNumber").val(),
          "courses": $("#update-course").val().split(", ")
        };
        $("#update-name").val("");
        $("#update-facultyNumber").val("");
        $("#update-course").val("");
        createStudent(student);
      } else {
          alert("No student with this number.");
      }
    });
  }

  function deleteStudent(){
    var facultyNumber = $("#delete-facultyNumber").val();

    checkForStudent(facultyNumber, function(result) {
      if(result) {
        $.ajax({
          type: "DELETE",
          url: "http://localhost:3030/student/" + facultyNumber,
        })
        .done(function() {
          getStudents(drawTable);
          $("#delete-facultyNumber").val ("");
        });
      } else {
        alert("No student with this number.");

      }
    });
  }

  function checkForStudent(facultyNumber, cb){
    getStudents(function(data) {
      refreshStudents(data);
      cb(students.filter(function(student){
        return student.facultyNumber === facultyNumber;
      }).length !== 0);
    });
  }

  function checkInputs(cls){
    var result = $(cls + " > input").filter(function() {
      return $(this).val() === "";
    }).length !== 0;
    if (result) {
      alert("Please fill all fields.");
    }
    return result;
  }
});

