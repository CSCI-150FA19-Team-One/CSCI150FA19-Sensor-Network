// 3rd Party modules
const http = require("http");	//For requests
const https = require("https");	//For requests to secure websites
const database_data = require('./models/data.models.js');

//local modules
const settings = require('./config.json');


//Function that will make GET requests to grab data
//Needs the authenticatoin token, device id, host, and what temp unit
//Farenheight tempF or celsuis tempC
function get_requests(token, deviceID, host, temp){
	var path_dir = "/v1/devices/" + deviceID + `/${temp}?access_token=` + token

	var options = {
	host: `${host}`,
	path: `${path_dir}`,
	method: "GET"
	};


	var req = https.request(options, (res) => {
		console.log(`connection status: ${res.statusCode}`);
		var response_data = ""

		//Getting the data from the get request
		res.on('data', (data) => {
			console.log("Grabbing data!");
			response_data += data;	//response_data is a string

		});//End of res.on('data')


		//All data has been grabbed from the response, store in DB
		res.on('end', () =>{
			var data = JSON.parse(response_data);	//turn data in JSON
			
			//Creating date object to find out current date information
			var current_date = new Date();


			var current_year = current_date.getFullYear(); //Gets current year i.e 2019
			var current_month = current_date.getMonth() + 1; //1-12
			var current_day = current_date.getDate(); //1-31
			var current_hour = current_date.getHours();  //gets the current hour 
			var current_minute = current_date.getMinutes() //gets the current minutes

			//Convert month and day to strings to use in gatheredAt field
			var timestamp = current_hour.toString() +":"+ current_minute.toString();



			//Primary keys used to find the document to update
			var filter = {
				year_timestamp: current_year,
				deviceID: data.coreInfo.deviceID,
				name: data.name
			}

			//options for the update - Upsert creates a document if none found
			//New returns the updated document
			var options = {upsert: true, new: true};


			//The path to update can not contain variables or string concats
			//must use object literal? to get around this issue
			var updateKey = "results.month."+current_month+".day."+current_day;
			var temp = {};
			temp[updateKey] = {gatheredAt: timestamp, value: data.result};


			//Will look for a document matching the filter. If none found, will insert
			//a new document with filter and update properties. Otherwise, update
			//the given property only	
			database_data.findOneAndUpdate(filter, {$push: temp}, options, (err, docs) => {
					if(err){
						console.log("Could not find or update the document");
					}
				});
			

			/*WORKING
			database_data.findOneAndUpdate(filter, {$push: {"results.month.3.day.2":  
				{gatheredAt: timestamp, value: data.result}}}, 
				options, (err, docs) => {
					if(err){
						console.log("Could not find or update the document");
					}
				});
			*/


			console.log('End of get Request!');
		});//End of res.on('end')


	});//End of https.request

	req.end();
}//End of function get_requests




//Double for loop. For loop 1 goes through all the devices in the config
//For loop 2 goes through all the sensors on those devices
exports.loop_through_devices = function() {
	for (var i = 0; i < settings.device_ID.length; i++){
		for(var k = 0; k < settings.sensor.length; k++ ){
			get_requests(settings.token, settings.device_ID[i], settings.host, settings.sensor[k]);
		}
	}
	return console.log("Finished making all requests");
}

