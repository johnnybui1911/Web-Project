var $input = $('#dateA').pickadate();

// Use the picker object directly.
var picker = $input.pickadate('picker');
picker.set('select', new Date($('#dateA').data('date')));


$(document).ready(function(){

  $('#resetBtn').click(() => {
    console.log('123')
    console.log(  document.getElementById('formAdjust'))
    document.getElementById('formAdjust').reset();
    picker.set('select', new Date($('#dateA').data('date')));
  });


$('#formAdjust').on('submit', function(){

    var name = $('#nameA');
    var des = $('#desA');
    var start = $('#startA');
    var end = $('#endA');
    var max = $('#maxA');
    var price = $('#priceA');
    var address = $('#addressA');
    var code = $('#codeA').val();
    if(code==null)
    {
      code = "";
    }

    var percent = $('#percentA').val();
    if(percent==null)
    {
      percent = 0;
    }
    else {
      percent = Number(percent);
    }

    var day = picker.get();
    var date = new Date(day);

    var todo = {numA: 0, nameA: name.val(), desA: des.val(), dateA: date,
                startA: start.val(), endA: end.val(), maxA: parseInt(max.val()), priceA: Number(price.val()),
                addressA: address.val(), codeA: code, percentA: percent, creator: "s", booked: 0};

    $.ajax({
      type: 'POST',
      url: '/adjustEvent/' + num,
      data: todo,
      success: function(data){
        //do something with the data via fron-end framework
        location.href="/viewEvent";
      }
    });

    return false;
  });
});
