$('#input-form').one('submit',function(){ //jQuery
    var varify=false;
    var title= encodeURIComponent($('#input-q1').val());
    var rate= encodeURIComponent($('#input-q2').val());
    var desc = encodeURIComponent($('#input-q3').val());
    var img = encodeURIComponent($('#input-q4').val());

    if(title==="" || rate==="" || desc==="" || img===""){ //if the feilds are not filled out, alert user
        alert("You must fill in all fields in order to submit");
        location.reload(); //reloads page and resets feilds
    } else if (isNaN(rate)==true||Number(rate)>=10 || Number(rate)<=0){ //validates that the rating is a # between 0 and 10 (inclusive)
        alert("The rating must be a number from 0 to 10");
        location.reload();
    }else{ //if none of these problems exist, allow user to confirm
        verify= confirm("Please Confirm the following entry.\nTitle: "+title+"\nRating: "+rate+"\nDescription: "+desc+"\nImage: "+img);
    }

    if(verify){ //only submits to database if user has confirmed and the submission has been validated
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
        location.reload(); //allows for another submission
    }
});
 