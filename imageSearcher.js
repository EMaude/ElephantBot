const fs = require('fs');
const config = require("./configs/config.json");
const GoogleImages = require('google-images');
const search = new GoogleImages(config.CSE_ID, config.CSE_API_KEY);

exports.imageSearcher = function(searchTerm)
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
		  				fs.appendFile(filename, images[i].url,(err) => {
							if (err) throw err;
							console.log('The url was appended to file!');
						});
		  			}
		  			else
		  			{
		  				fs.appendFile(filename, images[i].url + "\n",(err) => {
							if (err) throw err;
							console.log('The url was appended to file!');
						}); 
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
	  		//remove file
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
	  					fs.appendFile(filename, sdata[i],(err) => {
							if (err) throw err;
							console.log('The url was appended to file!');
						});
	  				}
	  				else
	  				{
		  				fs.appendFile(filename, sdata[i] + "\n",(err) => {
							if (err) throw err;
							console.log('The url was appended to file!');
						}); 
	  				}
	  			}
	  		}
	  	}
	  	return output;
  	});
};