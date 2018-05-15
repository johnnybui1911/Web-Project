$(document).ready(function(){
  $('#resetBtnAcc').click(() => {
    document.getElementById('formUpdateAccount').reset();
  });

  $('#formUpdateAccount').on('submit', function(){

    // var fullName = $('#fullNameA');
    var phoneNumber = $('#phoneNumberA');
    var emailAccount = $('#emailAccountA');
    // var studentNumber = $('#studentNumberA');


    var todo = {phoneNumberA: phoneNumber.val(), emailA: emailAccount.val()};

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
