//Elliot Maude
//September 2017
//
// This function gets search results (10 results) from google and caches the results.
// The file caching reduces api querry requests as they are limited to 100
//
//-----------------------------------------------------------------------------------//

const fs = require('fs');
const config = require("./configs/config.json");
const GoogleImages = require('google-images');
const search = new GoogleImages(config.CSE_ID, config.CSE_API_KEY);

exports.imageSearcher = function(searchTerm, cb)
{
	var filename = "./searches/" + searchTerm + ".json";
	var output = "Sorry, something went wrong!";
  	//read file of search term
  	fs.readFile(filename, "utf-8", (err, data) => {
		//if the file does not exist, search for the term with a random page, and pull out the resulting images to a file
		if(err)
		{
			var randSelect = Math.floor(Math.random() * 100);
			console.log("Pulling Page " + randSelect);

		  	search.search('elephant', {page: randSelect})
		  	.then(images => {

		  		output = images[9].url;
		  		//write data to file
		  		for(var i = 9; i > 0; i--)
		  		{
		  			if(i === 1)
		  			{
		  				fs.appendFileSync(filename, images[i].url).catch(err => {console.log(err)});
		  			}
		  			else
		  			{
		  				fs.appendFileSync(filename, images[i].url + "\n").catch(err => {console.log(err)}); 
		  			}
		  		}
	  		});
	  	} 
	  	else 
	  	{ 	
	  		console.log("File Found");
	  		//send message and write file without it
	  		var sdata = data.split('\n');
	  		output = sdata[0];

	  		//remove the file
	  		fs.unlink(filename, (err) => {
	  			if(err) throw err;
	  		});

	  		//if more data exists write to file
	  		if(sdata.length > 1)
	  		{
	  			for(var i = sdata.length - 1; i > 0; i--)
	  			{
	  				if(i === 1)
	  				{
	  					fs.appendFileSync(filename, sdata[i]).catch(err => {console.log(err)});
	  				}
	  				else
	  				{
		  				fs.appendFileSync(filename, sdata[i] + "\n").catch(err => {console.log(err)}); 
	  				}
	  			}
	  		}
	  	}
	  	cb(output);
  	});
};