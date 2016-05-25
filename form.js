$('#input-form').one('submit',function(){ //jQuery
  var inputq1 = encodeURIComponent($('#input-q1').val());
  var inputq2 = encodeURIComponent($('#input-q2').val());
  var inputq3 = encodeURIComponent($('#input-q3').val());
  var inputq4 = encodeURIComponent($('#input-q4').val());
  var q1ID = "entry_522619567"; //find entry id using old forms
  var q2ID = "entry_1034540516";
  var q3ID = "entry.1643713139";
  var q4ID = "entry_556230430";
  var baseURL = 'https://docs.google.com/forms/d/1BqD-EWC0B_MfOH3XSkmFzMj9XstJchW9MULzcuDKl0o/formResponse?';
  var submitRef = '&submit=Submit';
  var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + "&" + q3ID + "=" + inputq3 + "&" + q4ID + "=" + inputq4 + submitRef);
  console.log(submitURL);
  $(this)[0].action=submitURL;
  $('#input-feedback').text('Thanks for signing up! Your data has been recorded'); 
});
 