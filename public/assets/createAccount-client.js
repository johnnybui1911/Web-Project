$(document).ready(function(){
  $('#formCreateAccount').on('submit', function(){

    var fullName = $('#fullName');
    var phoneNumber = $('#phoneNumber');
    var emailAccount = $('#emailAccount');
    var usernameAccount = $('#usernameAccount');
    var password = $('#password');
    var typeAccount = $('#typeAccount');
    var studentNumber = $('#studentNumber');

    var todo = {fullName: fullName.val(), phoneNumber: phoneNumber.val(), email: emailAccount.val(), studentNumber: studentNumber.val(),
                username: usernameAccount.val(), password: password.val(), type: typeAccount.val(), array: [], history: []};

    $.ajax({
      type: 'POST',
      url: '/createAccount',
      data: todo,
      success: function(data){
        //do something with the data via fron-end framework

        location.href="/index";
      }
    });

    return false;
  });
});
