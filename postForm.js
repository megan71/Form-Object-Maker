$('#input-form').one('submit',function(){ //jQuery
  var inputq1 = encodeURIComponent($('#input-q1').val());
  var inputq2 = encodeURIComponent($('#input-q2').val());
  var inputq3 = encodeURIComponent($('#input-q3').val());
  var inputq4 = encodeURIComponent($('#input-q4').val());
  var q1ID = "entry_943744731"; //find entry id using old forms
  var q2ID = "entry_1462723952";
  var q3ID = "entry_1347661726";
  var q4ID = "entry_1548989161";
  var baseURL = 'https://docs.google.com/forms/d/1tEYSMKAIu4R8-tmgD1djjlxwINGGCG7i9ouauMdlg2k/formResponse?'; //link to google form
  var submitRef = '&submit=Submit';
  var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + "&" + q3ID + "=" + inputq3 + "&" + q4ID + "=" + inputq4 + submitRef);
  console.log(submitURL);
  $(this)[0].action=submitURL;
  $('#input-feedback').text('Thanks for posting!'); //changes the innerhtml of input-feedback
});
 