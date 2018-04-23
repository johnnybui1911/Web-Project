
$(document).ready(function(){
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

});
