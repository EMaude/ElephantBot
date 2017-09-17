//Elliot Maude
//Discord Bot
//September 2017
//------------//

//NPM Requires
const discord = require('discord.js');
const GoogleImages = require('google-images');
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
  	search.search('elephant', {page: 2})
  	.then(images => {
  		var randSelect = Math.floor(Math.random(0, 100));
  		console.log(images.length);
  		for(var i = 0; i < 10; i++)
  		{
  			message.channel.send(images[i].url);
  		}
  	});
  }
  else if(message.content.startsWith(config.prefix + "ping")){
    // Send "pong" to the same channel
    message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
  }

});


client.login(config.token);