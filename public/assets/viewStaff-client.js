
$(document).ready(function(){
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


});
