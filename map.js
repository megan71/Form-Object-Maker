google.load("visualization", '1', {packages:['corechart']});  // This loads the Google "Visualization" API, which is needed to use Google Charts or Google Tables.  It's required code!  The arguments are API, Version, Packages (this one is not required)
google.setOnLoadCallback(readData);  // The google.setOnLoadCallback method will call the specified callback function once your document (including any specified Google APIs) have finished loading.
google.charts.load('current', {'packages':['geochart']}); //type of chart loaded
        
function readData() {
	var query = new google.visualization.Query(  // This Query is asking for the data from the Google Spreadsheet
	//This is the URL of the data source -- it must be public and shared (see the video on creating a form and sharing settings).  This link has our TV watching data
	'https://docs.google.com/spreadsheets/d/1QZgCOAdhF7HJ9Gmr65V4vgpXBZK-6r_1Y2asfNBDntE/edit?usp=sharing');
	// Send the query and when the query finishes, call the function "handleQueryResponse"
	query.send(handleQueryResponse);
}

function handleQueryResponse(response) { // This is enacted when the query response is returned.  If the query was successful, the response is the data table.  If the query failed, an error is returned, no table
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return; //Alert the user with the error code and return to the place where this function was called
	}
	var data = response.getDataTable();
	console.log(data);

	var options = { //sets parameters for the google chart api to use
        region: 'US',
        resolution: 'provinces',
        colorAxis: {colors: ['yellow', 'orange']}
    };
		 
	var csvData = google.visualization.dataTableToCsv(data); //put it into csv form

	//list of all possible map territories (states)
	var stateArray= ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"]; 
		  
	var mapData= [["State", "Members"]]; //Titles for the map data

	function countState(state) { //counts how many time each state appears
		count= null;
		ex= new RegExp(state, 'g');
		if (csvData.match(ex)!=null){ //how many matches, none= null
		  	count=csvData.match(ex).length;
		}
		return count;
	}

	//this is the part where the counting function is actually called
	for (ii=0; ii<stateArray.length; ii++){
		if (countState(stateArray[ii])!=null){
		  	var tempArray= [stateArray[ii], countState(stateArray[ii])]; //makes array [state, # of members]
		  	mapData.push(tempArray); //adds to total data
		}	
	}

	mapData= google.visualization.arrayToDataTable(mapData); //converts mapData array into something google maps can read
	var chart = new google.visualization.GeoChart(document.getElementById('regions_div')); 
	chart.draw(mapData, options);
} //This brace ends the function handleQueryResponse