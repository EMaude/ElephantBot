//Elliot Maude
//September 2017
//
// This function gets search results (10 results) from google and caches the results.
// The file caching reduces api querry requests as they are limited to 100
//
//-----------------------------------------------------------------------------------//

const config = require("./configs/config.json");
const GoogleImages = require('google-images');
const search = new GoogleImages(config.CSE_ID, config.CSE_API_KEY);
const ds = require('./data-service');

exports.imageSearcher = function (searchTerm) {
	return new Promise((resolve, reject)=>{
		ds.getNextURL().then(data => {
			console.log(data);
			if (data) {
				ds.removeURL(data.id);
				resolve(data.url);
			}
			else {
				//no data in database
				var randSelect = Math.floor(Math.random() * 100);
				console.log("Pulling Page " + randSelect);
				search.search('elephant', { page: randSelect })
					.then(images => {	

						//write data to database
						for (var i = 0; i < 9; i++) {
							ds.storeURL(i, images[i].url);
						}
						resolve(images[9].url);
					}).catch(err =>{
						reject("Something went wrong");
					});
			}
		}).catch(err => {
			reject("Something went wrong");
		})
	
	});
};