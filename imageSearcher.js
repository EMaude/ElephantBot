const fs = require('fs');
const GoogleImages = require('google-images');

function imageSearcher(searchTerm)
{
	var filename = "./searches/" + searchTerm + ".json";
  	//read file of search term
  	fs.readFile(filename, "utf-8", (err, data) => {
		//if the file does not exist, search for the term with a random page, and pull out the resulting images to a file
		if(err)
		{
			var randSelect = Math.floor(Math.random() * 100);
			console.log("Pulling Page " + randSelect);

		  	search.search('elephant', {page: randSelect})
		  	.then(images => {
		  		message.channel.send(images[9].url)
		  		//write data to file
		  		for(var i = 0; i < 9; i++)
		  		{
		  			fs.appendFile(filename, images[i].url + ",",(err) => {
						if (err) throw err;
						console.log('The "data to append" was appended to file!');
					}); 
		  		}
	  		});
	  	} 
	  	else 
	  	{ 	
	  		console.log("File Found");
	  		//send message and write file without it
	  		var sdata = data.split(",");
	  		message.channel.send(sdata[sdata.length]);
	  		console.log(sdata.length);
	  		//remove file
	  		fs.unlink(filename, (err) => {
	  			if(err) throw err;
	  		});

	  		//if more data exists write to file
	  		if(sdata.length > 1)
	  		{
	  			for(var i = 0; i < sdata.length; i++)
	  			{
	  				if(i == sdata.length - 1)
	  				{
	  					fs.appendFile(filename, sdata[i],(err) => {
							if (err) throw err;
							console.log('The "data to append" was appended to file!');
						});
	  				}
	  				else
	  				{
		  				fs.appendFile(filename, sdata[i] + ",",(err) => {
							if (err) throw err;
							console.log('The "data to append" was appended to file!');
						}); 
	  				}
	  			}
	  		}
	  	}
  	});
}