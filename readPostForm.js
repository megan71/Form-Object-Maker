google.load("visualization", '1', {packages:['corechart']});  //needed for API tables
google.setOnLoadCallback(readData);  //will call the specified callback function once the document loads

function readData() {
	var query = new google.visualization.Query( //asking for the data from the Google Spreadsheet
	'https://docs.google.com/spreadsheets/d/19AeNg1v8PFJqSTDMTI2KkhqiV1-yaNYiuBlLdYkXW1U/edit?usp=sharing');
  
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
	console.log(data3);

	var posts=[];

	for (i=0; i<data3.length; i++){
		makeObject(data3[i][0],data3[i][1],data3[i][2],data3[i][3],data3[i][4]);
	}

	console.log(posts);
	//console.log(posts[0].rating);
	//makePost();

	function makeObject(date1, title1, rating1, descrition1, image1) {
		var obj = {
			date: date1,
			showtitle: title1,
			rating: rating1,
			showdescription: descrition1,
			image: image1
		};
		posts.push(obj);
	}

	for (i=0; i<posts.length; i++){
		makePost(posts[i]);
	}

} //This brace ends the function handleQueryResponse


		

function makePost(obj){ //makes the post oject into an element on the page
	var post = document.createElement("DIV");
	post.className= "newPost"; //assigning a class allows the css to apply to multiple things

	var center= document.createElement("CENTER"); //centers everything

	var showTitle = document.createElement("H2");
	showTitle.className= "showTitle";
	var showTitleText = document.createTextNode("Title: "+obj.showtitle);

	var showImg= document.createElement("IMG")
	showImg.src= obj.image;
	showImg.className= "showImg";

	var rating= document.createElement("H1")
	var ratingText= document.createTextNode("Rating: "+obj.rating+"/10");
	if(Number(obj.rating)>7){ //allows different formatting depending on high, low, or okay rating
		rating.className= "ratingGood";
	} else if (Number(obj.rating)>3){
		rating.className= "ratingOkay";
	} else {
		rating.className= "ratingBad";
	}

	var description = document.createElement("P");
	description.className= "description";
	var descriptionText = document.createTextNode("Description: "+obj.showdescription);    

	//append the children!!
	showTitle.appendChild(showTitleText); 
	center.appendChild(showTitle);  

	center.appendChild(showImg); 

	rating.appendChild(ratingText);
	center.appendChild(rating);

	description.appendChild(descriptionText); 
	center.appendChild(description);    
	post.appendChild(center);                          
	document.getElementById("total").appendChild(post);

	var br= document.createElement("BR");                                  
	document.getElementById("total").appendChild(br); //put it on the document
}
