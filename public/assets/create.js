$(document).ready(function(){
  var $input = $('#date').pickadate();
  // var picker = $input.pickadate('picker');
  console.log('hello');

  $('#formCreate').on('submit', function(){

    var name = $('#name');
    var des = $('#des');

    var start = $('#start');
    var end = $('#end');
    var max = $('#max');
    var price = $('#price');
    var address = $('#address');


    var code = $('#code').val();
    if(code==null)
    {
      code = "";
    }


    var percent = $('#percent').val();
    if(percent==null)
    {
      percent = 0;
    }
    else {
      percent = Number(percent);
    }


    var $input = $('#date').pickadate();

    // Use the picker object directly.
    var picker = $input.pickadate('picker');
    var day = picker.get();
    var date = new Date(day);
    var d = new Date(2000,01,01);
    if(date == "Invalid Date")
    {

          var todo = {num: 0, name: name.val(), des: des.val(), date: d,
                      start: start.val(), end: end.val(), max: parseInt(max.val()), price: Number(price.val()),
                      address: address.val(), code: code, percent: percent, creator: "s", booked: 0};
    }
    else {

          var todo = {num: 0, name: name.val(), des: des.val(), date: date,
                      start: start.val(), end: end.val(), max: parseInt(max.val()), price: Number(price.val()),
                      address: address.val(), code: code, percent: percent, creator: "s", booked: 0};
    }



    $.ajax({
      type: 'POST',
      url: '/createEvent',
      data: todo,
      success: function(name){
        //do something with the data via fron-end framework
        if(name=="good")
        {
          location.href="/viewEvent";
        }
        else if (name=="bad") {
          $('#exampleModalCenterCreate2').modal('show');
          $('#formCreate').get(0).reset();
        }
        else {
          $('#exampleModalCenterCreate').modal('show');
          $('#formCreate').get(0).reset();
        }

      },
      error: function()
      {
        $('#exampleModalCenterCreate2').modal('show');
        $('#formCreate').get(0).reset();
      }

    });

    return false;
  });
});
