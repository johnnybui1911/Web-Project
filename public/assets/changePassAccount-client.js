$(document).ready(function(){
  $('#formUpdatePassword').on('submit', function(){

    var oldPass = $('#oldPass');
    var newPass = $('#newPass');
    var newPass = $('#newPass2');
    var user = $(this).attr("name");

    var todo = {oldPass: oldPass.val(), newPass: newPass.val()};

    $.ajax({
      type: 'POST',
      url: '/changePassAccount/'+user,
      data: todo,
      success: function(data){
        //do something with the data via fron-end framework
        if(data=="Error")
        {
          $('#exampleModalCenter3').modal('show')
          $('#formUpdatePassword').get(0).reset();
        }
        else if(data=="Not")
        {
          $('#exampleModalCenter4').modal('show')
          $('#formUpdatePassword').get(0).reset();
        }
        else {
          location.href="/viewAccount";
        }

      }
    });

    return false;
  });
});
