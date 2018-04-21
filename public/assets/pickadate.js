$(document).ready(function(){


  var $input = $('#date').pickadate()

  // Use the picker object directly.
  var picker = $input.pickadate('picker')
  var date = picker.get();

});
