var activePoll = false;
const config = require('./configs/config.json');
let question;
let options;
let results;

exports.create = function(msg){ 

    if(activePoll)
    {
        return "There is already a active poll, close it with " + config.prefix + "close" ;
    }

    //Remove prefix & commmand part of string
    msg = msg.substr(msg.indexOf(" ") + 1, msg.length);

    //Pull out question 
    question = msg.substr(0, msg.indexOf("?") + 1);
    msg = msg.substr(msg.indexOf("?") + 1, msg.length);
    
    //pull out options
    options = msg.split("|");

    //format options and result tracking data structure

    let str = "Q: " + question;

    for(let i = 0; i < options.length; i++) 
    {
        str += "\n\t" + i + ": " + options[i].trim();
    }
    results = new Array(options.length).fill(0);
    activePoll = true;

    return str;
};

exports.vote = function(msg)
{
    //Remove prefix & commmand part of string
    msg = msg.substr(msg.indexOf(" ") + 1, msg.length);

    if(!activePoll)
    {
        return "There is no active poll to vote on";
    }

    let choice = parseInt(msg);

    if(choice > options.length)
    {
        return "Could not find option " + choice;
    }
    
    results[choice]++;

    str = "Voted!  Current Results: "
    for(let i = 0; i < options.length; i++) 
    {
        str += "\n\t" + i + ": " + options[i].trim() + " has " + results[i] + " votes";
    }

    return str;

};

exports.close = function()
{
    //return results and close poll
    if(!activePoll)
    {
        return "There is no active poll to close";
    }

    str = "Poll closed! Final Results: "
    for(let i = 0; i < options.length; i++) 
    {
        str += "\n\t" + i + ": " + options[i].trim() + " got " + results[i] + " votes";
    }

    activePoll = false;
    question = [];
    results = [0];

    return str;
};