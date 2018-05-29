$(document).ready(function(){
  $('#formLogin').on('submit', function(){

    var username = $('#username');
    var password = $('#password');


    var todo = {username: username.val(), password: password.val(), type: "staff"};

    $.ajax({
      type: 'POST',
      url: '/loginStaff',
      data: todo,
      success: function(data){
        //do something with the data via fron-end framework

        //location.href="/staff";
        location.href="/staff";
      },
      error: function(){
        $('#exampleModalCenter2').modal('show')

      }
    });

    return false;
  });

  $('#formLoginStudent').on('submit', function(){

    var username = $('#username2');
    var password = $('#password2');


    var todo = {username: username.val(), password: password.val(), type: "student"};

    $.ajax({
      type: 'POST',
      url: '/loginStudent',
      data: todo,
      success: function(data){
        //do something with the data via fron-end framework

        //location.href="/staff";
        location.href="/student";
      },
      error: function(){
        $('#exampleModalCenter2').modal('show')
      }
    });

    return false;
  });


});
