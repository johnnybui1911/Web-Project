$(document).ready(function(){
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
});
