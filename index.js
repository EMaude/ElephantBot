//Elliot Maude
//Discord Bot
//September 2017
//------------//

const discord = require('discord.js');
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
  	console.log("Coming Soon!");
  }
  else if(message.content.startsWith(config.prefix + "ping")){
    // Send "pong" to the same channel
    message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp} ms\``);
  }

});


client.login(config.token);