$(document).ready(function(){
  $('#formUpdateAccount').on('submit', function(){

    var fullName = $('#fullNameA');
    var phoneNumber = $('#phoneNumberA');
    var emailAccount = $('#emailAccountA');
    var studentNumber = $('#studentNumberA');


    var todo = {fullNameA: fullName.val(), phoneNumberA: phoneNumber.val(), emailA: emailAccount.val(), studentNumberA: studentNumber.val()};

    $.ajax({
      type: 'POST',
      url: '/updateAccount/'+user,
      data: todo,
      success: function(data){
        //do something with the data via fron-end framework

        location.href="/viewAccount";
      }
    });

    return false;
  });
});
