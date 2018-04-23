
$(document).ready(function(){

  var newPrice = document.getElementById('codeC').innerHTML

  $('.checkCode').on('submit', function(){

    var code = $('#codeInput');
    var n = $('#codeInput').attr("name");


    $.ajax({
      type: 'GET',
      url: '/paymentBooking/' + code.val() +'/' +n,
      success: function(data){
        //do something with the data via fron-end framework

        //location.href="/staff";

        var p = data.price - ((data.price * data.percent) /100);
        var per = data.percent;
        $('#more').append("<li class='list-group-item d-flex justify-content-between bg-light'><div class='text-success'><h6 class='my-0'>Promo code</h6><small>Discount</small></div><span class='text-success'>-"+per+"%</span></li>");
        document.getElementById('codeC').innerHTML = p;
        setTimeout(() => {
          $('#alertShow').alert('close');

        }, 500);

      },
      error: function()
      {

        document.getElementById('more').innerHTML = " ";
        document.getElementById('codeC').innerHTML = newPrice;
        document.getElementById('checkRedeem').reset();
        console.log("123");
        $('#alertShow').show();

      }
    });

    return false;
  });
});
