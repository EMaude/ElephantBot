//Elliot Maude
//Discord Bot
//September 2017
//------------//

//NPM Requires
const discord = require('discord.js');
const express = require('express');

//Custom Requires
const config = require('./configs/config.json');
const searcher = require('./imageSearcher.js');
const poll = require('./poll.js');


const client = new discord.Client();
// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  if(message.content.startsWith(config.prefix + "elephant")){

  	searcher.imageSearcher('elephant', function(reply) { 
  		if(reply === undefined)
  		{
  			reply = "Sorry, something went wrong!";
  		}
  		message.channel.send(reply);
  	});
  }
  else if(message.content.startsWith(config.prefix + "poll")){
    let str = poll.create(message.content);
    if(str === undefined)
    {
      str ='Sorry, something went wrong!';
    }
    message.channel.send(str);
  }
  else if(message.content.startsWith(config.prefix + "vote")){
    let str = poll.vote(message.content);
    if(str === undefined)
    {
      str ='Sorry, something went wrong!';
    }
    message.channel.send(str);
  }
  else if(message.content.startsWith(config.prefix + "close")){
    let str = poll.close(message.content);
    if(str === undefined)
    {
      str ='Sorry, something went wrong!';
    }
    message.channel.send(str);
  }
  else if(message.content.startsWith(config.prefix + "ping")){
    // Send "pong" to the same channel
    message.channel.send(`Pong!`);
  }

});


//web client for heroku to bind to a port
client.login(config.token);

const app = express();
app.all('/', (req, res) => res.send('Hello'));
app.listen(process.env.PORT,() => console.log('express listening'));

//keep alive by pinging this app on heroku
var http = require("http");
setInterval(function() {
    http.get("https://elephant-bot.herokuapp.com/");
}, 300000); // every 5 minutes (300000)