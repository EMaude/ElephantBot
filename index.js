//Elliot Maude
//Discord Bot
//September 2017
//------------//

//NPM Requires
const discord = require('discord.js');
const GoogleImages = require('google-images');
const fs = require('fs'); 
//Custom Requires
const config = require("./configs/config.json");

const client = new discord.Client();
const search = new GoogleImages(config.CSE_ID, config.CSE_API_KEY);
// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "(prefix)ping"

  if(message.content.startsWith(config.prefix + "elephant")){

  	var filename = "./elephant.json"
  	//read file of search term
  	fs.readFile(filename, function(err){
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
		  			fs.appendFile(filename, images[i].url, function(err){
		  				if(err)
		  				{
		  					return console.error(err);
		  				}
		  			});
		  		}
	  		});

	  	} 
	  	else 
	  	{
	  	
	  		console.log("File Found");
	  		//pull message and remove from file

	  	}

  	});
  }
  else if(message.content.startsWith(config.prefix + "ping")){
    // Send "pong" to the same channel
    message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
  }

});


client.login(config.token);