google.load("visualization", '1', {packages:['corechart']});  //needed for API tables
google.setOnLoadCallback(readData);  //will call the specified callback function once the document loads

function readData() {
	var query = new google.visualization.Query( //asking for the data from the Google Spreadsheet
	'https://docs.google.com/spreadsheets/d/1QZgCOAdhF7HJ9Gmr65V4vgpXBZK-6r_1Y2asfNBDntE/edit?usp=sharing');
  
	query.send(handleQueryResponse); //call the response
}
		
function handleQueryResponse(response) { //enacted when the query response is returned
	if (response.isError()) {
	alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return; //Alert the user with the error code and return to the place where this function was called
	}

	var data = response.getDataTable(); //format data
	var csvData = google.visualization.dataTableToCsv(data); //make csv
	var data2=csvData.split("\n"); //split by line breaks

	var data3= [];
	for (i=0; i<data2.length-1; i++){ //gets rid of extra place
		data3.push(data2[i]);
	}
		  
	for(i=0; i<data3.length; i++){
		data3[i]= data3[i].split(","); //create 2d array by splitting by commas
	}

	var members=[]; //array of all member objects

	for (i=0; i<data3.length; i++){
		makeObject(data3[i][0],data3[i][1],data3[i][2],data3[i][3],data3[i][4]);
	}

	function makeObject(date1, first, last, email, state) { //object creater
		var obj = {
			date: date1,
			firstName: first,
			lastName: last,
			email: email,
			state: state
		};
		members.push(obj);
	}

	var email= prompt("Once you have registered on the membership page, enter your email address to access your profile page.")

	var member;

	function findMember(email){ //searches spreadsheet file for email address and returns object loaction as "member"
		for (ii=0; ii<members.length; ii++){
			if (members[ii].email===email){
				member=ii;
			}
		}
	}

	findMember(email); //cal function


	//fills elements on page using object data
	document.getElementById("name").innerHTML="Name: "+members[member].firstName+" "+members[member].lastName; 
	document.getElementById("email").innerHTML="Email Address: "+members[member].email;
	document.getElementById("state").innerHTML="State: "+members[member].state
	document.getElementById("date").innerHTML="Date & Time Joined: "+members[member].date;
} //This brace ends the function handleQueryResponse