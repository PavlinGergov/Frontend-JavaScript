/* globals $ */

$(document).ready(function(){
  "use strict";
  $("#myModal").on("shown.bs.modal", function () {
    $("#myInput").focus();
  });
});

