# discordBot
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FRedline404%2FdiscordBot.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FRedline404%2FdiscordBot?ref=badge_shield)

## About

This is a simple Discord.js bot.

This querries a simple google custom search engine through the google API. //TODO: DOCS on setup process

The google search returns 10 results per querrey, and has a limit of 100 queries per day for free use.
A multi teird caching aproach is in development to reduce the number of queries. As well as to provide some level of backup if the
querrey limit is reached.

## Current Status

Search routines 											- Done
Cacheing of spare results 									- Done
Basic Discord Integration (fixed Search term)  				- Done

Allow any possible search term from users					- WIP
Tracking of used queries									- WIP
Queue filling of most common terms to use spare queries 	- WIP

## Planned

Larger cacheing system to account for running out of queries, while limiting repeat results.
remove or track the random page selection to reduce the chance of repeat results.
