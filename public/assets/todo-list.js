
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

////////////////////////////////////////////////////////////////////////////////////////////////////////Staff

  $('li').on('click', function(){
    //console.log($(this).text());
      var num = $(this).text().replace(/ /g, "-");

      $.ajax({
        type: 'DELETE',
        url: '/selectEvent/' + num,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });


  $('p3').on('click', function(){
    //console.log($(this).text());
      var n = $('#numA').text();

      $.ajax({
        type: 'DELETE',
        url: '/adjustEvent/' + n,
        success: function(data){
          //do something with the data via front-end framework
          location.href="/viewEvent";
        }
      });
  });

  $('.buttDel').on('click', function(){
    //console.log($(this).text());
      var n = $(this).attr("name");

      //window.location.href="/adjustEvent/" + num;
      $.ajax({
        type: 'DELETE',
        url: '/viewEvent/' + n,
        success: function(data){
          //do something with the data via front-end framework
          location.href="/viewEvent";
        },
        error: function()
        {

          $('#exampleModalCenter1').modal('show')
        }
      });
  });


  $('p').on('click', function(){
    //console.log($(this).text());
      var num = $(this).text().replace("ID - EV", "");
      //window.location.href="/adjustEvent/" + num;
      $.ajax({
        type: 'GET',
        url: '/viewEvent/' + num,
        success: function(data){
          //do something with the data via front-end framework
          location.href="/adjustEvent/" + data.num;
        },
        error: function()
        {
          alert("You are not creator of this event !");
          location.reload();
        }
      });
  });

  $('.butt').on('click', function(){
    //console.log($(this).text());
      var num = $(this).attr("name");

      //window.location.href="/adjustEvent/" + num;
      $.ajax({
        type: 'GET',
        url: '/viewEvent/' + num,
        success: function(data){
          //do something with the data via front-end framework
          location.href="/adjustEvent/" + data.num;
        },
        error: function()
        {
          $('#exampleModalCenter1').modal('show')

        }
      });
  });


    $('#showEvent').on('change', function() {
      console.log(this.value);
      $('#show').submit();

  });





///////////////////////////////////////////////////////////////////////////////Student

  $('.buttBooking').on('click', function(){
    //console.log($(this).text());
      var num = $(this).attr("name");

      $.ajax({
        type: 'GET',
        url: '/viewEventStudent/' + num,
        success: function(data){
          //do something with the data via front-end framework
          console.log(data);
          if(data == "book")
          {
            location.href="/viewBooking";
          }
          else if (data == "booked")
          {
            alert("Event has booked !");
            location.reload();
          }
          else if (data == "capacity")
          {

            location.reload();
          }
          else {
            location.href="/paymentBooking/" + num;
          }
        }
      });
  });

  $('.buttCancel2').on('click', function(){
    //console.log($(this).text());
      var n = $(this).attr("name");

      $.ajax({
        type: 'DELETE',
        url: '/viewEventStudent/' + n,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });


  $('p1').on('click', function(){
    //console.log($(this).text());
      var num = $(this).text().replace("ID - EV", "");

      $.ajax({
        type: 'GET',
        url: '/viewEventStudent/' + num,
        success: function(data){
          //do something with the data via front-end framework
          console.log(data);
          if(data == "book")
          {
            location.href="/viewBooking";
          }
          else if (data == "booked")
          {
            alert("Event has booked !");
            location.reload();
          }
          else if (data == "capacity")
          {
            alert("Event has no capacity !");
            location.reload();
          }
          else {
            location.href="/paymentBooking/" + num;
          }
        }
      });
  });


    $('p8').on('click', function(){
      //console.log($(this).text());
        var n = $(this).text().replace("ID - EV", "");

        $.ajax({
          type: 'DELETE',
          url: '/viewBooking/' + n,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
    });

    $('.buttCancel').on('click', function(){
      //console.log($(this).text());
        var n = $(this).attr("name");

        $.ajax({
          type: 'DELETE',
          url: '/viewBooking/' + n,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
    });





  /*$('p4').on('click', function(){
    //console.log($(this).text());
      var num = $(this).text().replace(/ /g, "-");

      $.ajax({
        type: 'DELETE',
        url: '/deleteEvent/' + num,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });*/
});
