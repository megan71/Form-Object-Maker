$('#input-form').one('submit',function(){ //jQuery
  var varify=false;
  var first= encodeURIComponent($('#input-q1').val());
  var last= encodeURIComponent($('#input-q2').val());
  var email = (encodeURIComponent($('#input-q3').val())).replace("%","@"); //for some reason the JQuery turns the @ into a %, this fixes it
  var state= encodeURIComponent($('#input-q4').val());

  if(first==="" || last==="" || email==="" || state===""){
      alert("You must fill in all fields in order to submit");
      location.reload(); //reloads page and resets feilds
  } else if(email.search("@")=== -1){ // validates that email contains @ symbol
      alert("Your email address must contain an '@' symbol");
      location.reload();
  } else if (state.length!=2||state!=state.toUpperCase){ //validates that state is in correct format (2 capital letters)
      alert("Please enter your state in abreviated format.\nEXAMPLE: FL");
      location.reload();
  }
  else{
      verify= confirm("Please Confirm the following entry.\nFirst Name: "+first+"\nLast Name: "+last+"\nEmail: "+email+"\nState: "+state);
  }

  if(verify){ //only submits to database if user has confirmed and the submission has been validated
    var inputq1 = encodeURIComponent($('#input-q1').val());
    var inputq2 = encodeURIComponent($('#input-q2').val());
    var inputq3 = encodeURIComponent($('#input-q3').val());
    var inputq4 = encodeURIComponent($('#input-q4').val());
    var q1ID = "entry_522619567"; //find entry id using old forms
    var q2ID = "entry_1034540516";
    var q3ID = "entry.1643713139";
    var q4ID = "entry_556230430";
    var baseURL = 'https://docs.google.com/forms/d/1BqD-EWC0B_MfOH3XSkmFzMj9XstJchW9MULzcuDKl0o/formResponse?'; //link to google form
    var submitRef = '&submit=Submit';
    var submitURL = (baseURL + q1ID + "=" + inputq1 + "&" + q2ID + "=" + inputq2 + "&" + q3ID + "=" + inputq3 + "&" + q4ID + "=" + inputq4 + submitRef);
    console.log(submitURL);
    $(this)[0].action=submitURL;
    $('#input-feedback').text('Thanks for signing up! Your data has been recorded'); //changes the innerhtml of input-feedback
    location.reload(); //allows for another submission
  }
});
 