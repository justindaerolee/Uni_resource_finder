const express = require('express');
const router = express.Router();
const request = require('request');

//const googleBooks = require('./public/javascripts/GoogleBooksAPI.js');

//google map API's
// google's geocoding
const geoCodeKey = 'INPUT_PRIVATE_KEY';
router.get('/geocode', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (req.query.address != null) {
		var apiCall = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + req.query.address + '&key=' + geoCodeKey;
	} else {
		console.log("hello");
		var apiCall = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + req.query.latlng + '&key=' + geoCodeKey;
	}
	request(apiCall, function(error, response, body) {
		console.log('error:', error); // Print the error if one occurred and handle it
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		var obj = JSON.parse(body);
		var address = obj.results[0].formatted_address;
		var latlng = obj.results[0].geometry.location;
		console.log({'latlng' : latlng}, {'address' : address});
		// might not be a json object.
	  	res.send( {'latlng' : latlng, 'address' : address} );
	});
});
// google's distance matrix api
const distMatKey = 'INPUT_PRIVATE_KEY';
router.get('/distanceMatrix', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var origin = req.query.origin;
	var destination = req.query.destination;
	var apiCall = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + destination + '&key=' + distMatKey;
	request(apiCall, function(error, response, body) {
		console.log('error:', error); // Print the error if one occurred and handle it
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		var obj = JSON.parse(body);
		// found out what we need
		// distance, duration??
		var dist = obj.rows[0].elements[0].distance.text;
		var duration = obj.rows[0].elements[0].duration.text;
		console.log(dist, "\n", duration);
	  	res.send( {'distance' : dist, 'duration' : duration } );
	});
});


const keyYoutube = 'INPUT_PRIVATE_KEY';
// send back a list of youtube search results to frontend
// youtube get request
//https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=relevance&q=unsw&type=video&key=AIzaSyDtajOWGLKdiCF1kWg8GDwNLSO4SngwaG0
router.get('/youtube', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  var searchString = req.query.search;
  var apiCall = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=relevance&q=' + searchString + '&type=video&key=' + keyYoutube;
  request(apiCall, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred and handle it
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      var data = JSON.parse(body);
	  var allObj = [];
	  for(var i = 0; i < data.items.length; i++) {
			//only need the link
			var link = 'https://www.youtube.com/embed/'+ data.items[i].id.videoId;
			allObj.push(link);
			/*
		  var obj = {};
		  obj['title'] = data.items[i].snippet.title;
		  obj['videoId'] = data.items[i].id.videoId;
		  obj['thumbnail'] = data.items[i].snippet.thumbnails.default.url;
		  obj['description'] = data.items[i].snippet.description;
		  allObj.push(obj);
			*/
	  }
	  res.send(allObj);
  });
});

// google get request
router.get('/googleBooks', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  var searchString = req.query.search;
	var apiCall = 'https://www.googleapis.com/books/v1/volumes?q=' + searchString +'&maxResults=40&startIndex=1';
  	request(apiCall, function (error, response, data) {
      	console.log('error:', error); // Print the error if one occurred and handle it
      	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  	var body = JSON.parse(data);
	  	var allBooks = [];
			if (body.items && body.items.length > 0) {
				for (var d = 0; d < body.items.length; d ++){
					var obj = {};
					if (body.items[d].saleInfo.isEbook==true) {
							obj['type'] = 'Ebook';
					} else {
						continue;	//lets just use ebooks from google for now
					}
					obj['title'] = body.items[d].volumeInfo.title;
					if (body.items[d].volumeInfo.authors) {
						obj['author'] = body.items[d].volumeInfo.authors.join(', ');
					} else {
						obj['author'] = "";
					}
					obj['description'] = body.items[d].volumeInfo.description;
					if (body.items[d].volumeInfo.publishedDate) {
						obj['publish'] = body.items[d].volumeInfo.publishedDate.substring(0,4);
					} else {
						obj['publish']="";
					}
					if (body.items[d].saleInfo.listPrice && body.items[d].saleInfo.listPrice.amount) {
						obj['price'] = body.items[d].saleInfo.listPrice.amount;
					} else {
						obj['price'] = 0;
					}
					if (body.items[d].volumeInfo.industryIdentifiers && body.items[d].volumeInfo.industryIdentifiers[1] && body.items[d].volumeInfo.industryIdentifiers[1].identifier) {
						obj['isbn'] = body.items[d].volumeInfo.industryIdentifiers[1].identifier;
					} else {
						obj['isbn']="";
					}
					if (body.items[d].volumeInfo.imageLinks && body.items[d].volumeInfo.imageLinks.smallThumbnail) {
						obj['img'] = body.items[d].volumeInfo.imageLinks.smallThumbnail;
					}
					obj['getit'] = body.items[d].saleInfo.buyLink;
					allBooks.push(obj);
				}
			}
      res.send(allBooks);
	});
});

// end of google API's

//trove API for national library of Australia.
const troveKey = 'INPUT_PRIVATE_KEY';
router.get('/nla', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  	var searchString = req.query.search;
  	// would we want to include newspapers, pictures??
  	var zone = 'book'
  	// we can further refine the search if needed: http://help.nla.gov.au/trove/building-with-trove/api-technical-guide for more info.
  	var apiCall = 'http://api.trove.nla.gov.au/result?key=' + troveKey + '&zone=' + zone + '&q=' + searchString + "&encoding=json";
  	request(apiCall, function (error, response, body) {
      	console.log('error:', error); // Print the error if one occurred and handle it
      	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		var data = JSON.parse(body);
	 	var allObj = [];
		data = data.response.zone[0].records.work;
		if (data && data.length>0) {
			for(var i = 0; i < data.length; i++) {
				 var obj = {};
				 if (data[i].holdingsCount < 1) {
					 continue;
				 }
				 obj['title'] = data[i].title;
				 if (data[i].contributor) {
					 obj['author'] = data[i].contributor.join(', ');
				 } else {
					 continue;
				 }
				 if (data[i].issued) {
					 obj['publish'] = data[i].issued.toString().substring(0,4);
				 } else {
					 obj['publish'] = "";
				 }
				 obj['isbn'] = data[i].id;
				 obj['description'] = data[i].snippet;
				 obj['type'] = 'Borrowable';
				 obj['price'] = 0;
				 obj['getit'] = data[i].troveUrl;
				 obj['findit'] = 'National Library of Australia';
				 allObj.push(obj);
			 }
		}
	 	res.send(allObj);
  	});
});

const goodReadKey = 'INPUT_PRIVATE_KEY';
router.get('/goodRead', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
  	var searchString = req.query.search;
	//https://www.goodreads.com/search.xml?key=BOQWZZsLSGxJd657QTkW7A&q=Ender%27s+Game
  	var apiCall = 'https://www.goodreads.com/search.xml?key=' + goodReadKey + '&q=' + searchString;
  	request(apiCall, function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode);
		var parseString = require('xml2js').parseString;
		var allObj = [];
		parseString(body, function (err, result) {
			var data = result.GoodreadsResponse.search[0].results[0].work;
			if (data && data.length>0) {
				for(var i = 0; i < data.length; i++) {
					 var obj = {};
					 if (data[i].books_count < 1) {
						 continue;
					 }
					 obj['title'] = data[i].best_book[0].title[0];
					 if (data[i].best_book[0].author[0].name[0]) {
						 obj['author'] = data[i].best_book[0].author[0].name[0];
					 } else {
						 continue;
					 }
					 if(data[i].original_publication_year[0]) {
						 var day = '';
						 var month = ''
						 if (data[i].original_publication_day[0].$.nil != "true") {
							 day = data[i].original_publication_day[0]._ + '/';
						 }
						 if (data[i].original_publication_month[0].$.nil != "true") {
							 month = data[i].original_publication_month[0]._ + '/';
						 }
						 obj['publish'] = data[i].original_publication_year[0]._;
					 } else {
						 obj['publish'] = "";
					 }
					 obj['isbn'] = data[i].id[0]._;
					 obj['type'] = 'Borrowable';
					 obj['price'] = 0;
					 obj['getit'] = 'https://www.goodreads.com/book/show/'+data[i].best_book[0].id[0]._;
					 obj['rating'] = data[i].average_rating[0];
					 obj['img'] = data[i].best_book[0].image_url[0]
					 allObj.push(obj);
				 }
			}
		 	res.send(allObj);
		});
  	});
});

const ebayAppId = 'INPUT_PRIVATE_KEY';
router.get('/ebay', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	var searchString = req.query.search;

    var apiCall = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SECURITY' +
        '-APPNAME=JackMcCl-Ventures-PRD-ae3fbf170-2d856284&GLOBAL-ID=EBAY-AU&RESPONSE-DATA-FORMAT=JSON&keywords=' + searchString + " textbook";
    request(apiCall, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var data = JSON.parse(body);
        data = data.findItemsByKeywordsResponse[0].searchResult[0].item;
        var allBooks = [];
        if (data) {
					for (var i = 0; i < data.length; i++) {
	            var book = {};
	            book['title'] = data[i].title[0];

	            if (data[i].condition[0].conditionDisplayName[0] == 'Brand new') {
	            	book['type'] = 'New';
							} else {
	              book['type'] = 'Used';
	            }

	            book['price'] = data[i].sellingStatus[0].currentPrice[0].__value__;
	            if (data[i].galleryURL) {
	                book['img'] = data[i].galleryURL[0];
	            } else {
	                book['img'] = '';
	            }
	            book['getit'] = data[i].viewItemURL[0];
	            book['author'] = '';
	            book['publish'] = '';
	            book['isbn'] = '';
	            book['description'] = '';

	            allBooks.push(book);
	        }
				}
        res.send(allBooks);
    });
});


module.exports = router;
