$(document).ready(function(){
  $('#formCreateAccount').on('submit', function(){

    var fullName = $('#fullName');
    var phoneNumber = $('#phoneNumber');
    var emailAccount = $('#emailAccount');
    var usernameAccount = $('#usernameAccount');
    var password = $('#password');
    var passwordCheck = $('#password2');
    var typeAccount = $('#typeAccount');
    var studentNumber = $('#studentNumber');
    if(passwordCheck.val()!=password.val())
    {
      var todo = {fullName: fullName.val(), phoneNumber: phoneNumber.val(), email: emailAccount.val(), studentNumber: studentNumber.val(),
                  username: usernameAccount.val(), password: "error", type: typeAccount.val(), array: [], history: []};
    }
    else {
      var todo = {fullName: fullName.val(), phoneNumber: phoneNumber.val(), email: emailAccount.val(), studentNumber: studentNumber.val(),
                  username: usernameAccount.val(), password: password.val(), type: typeAccount.val(), array: [], history: []};
    }


    $.ajax({
      type: 'POST',
      url: '/createAccount',
      data: todo,
      success: function(text){
        //do something with the data via fron-end framework
        if(text=="error")
        {
          $('#exampleModalCenter8').modal('show');
          $('#formCreateAccount').get(0).reset();
        }
        else if(text=="done")
        {
          location.href="/index";
        }
        else if (text=="incorrect") {
          $('#exampleModalCenter7').modal('show');
          $('#formCreateAccount').get(0).reset();
        }

      }
    });

    return false;
  });
});
