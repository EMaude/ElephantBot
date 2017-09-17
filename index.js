//Elliot Maude
//Discord Bot
//September 2017
//------------//

//NPM Requires
const discord = require('discord.js');
const imageSearch = require("node-google-image-search");

//Custom Requires
const config = require("./configs/config.json");


const client = new discord.Client();

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "(prefix)ping"
  if(message.content.startsWith(config.prefix + "elephant")){
  	var randomOffset = Math.floor(Math.random(0, 100));
  	var results = imageSearch('elephant', callback, randomOffset, 1);

	function callback(results) {
		message.channel.send(results);
	}
  }
  else if(message.content.startsWith(config.prefix + "ping")){
    // Send "pong" to the same channel
    message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
  }

});


client.login(config.token);