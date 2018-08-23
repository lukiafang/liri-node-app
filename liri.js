require("dotenv").config();

var keys = require("./keys.js");

var arg = process.argv;

var fs = require("fs");

var moment = require('moment');

var liri = {

	// this will take data from a text file and then calls the functionality (spotify in this case) as defined in the file
	says() {
		console.log("=============");
		console.log("says function");
		console.log("=============");
		fs.readFile("random.txt", "utf-8", function(error, data) {
			if (error) {
				return console.log(error);
			}
			console.log("Reading stored file and redirecting to the music function");
			var command = data.split(",");
			arg[2] = command[0];
			arg[3] = command[1];
			liri.runtime();
		})
  },
  movieThis(){

    // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
    var request = require("request");

    // Store all of the arguments in an array
    var nodeArgs = process.argv;

    // Create an empty variable for holding the movie name
    var movieName = "";

    // Loop through all the words in the node argument
    for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        movieName = movieName + "+" + nodeArgs[i];

    }

    else {

        movieName += nodeArgs[i];

    }
    }
    if (movieName===""){
        movieName="mr nobody"
    }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    
    console.log(queryUrl);

        request(queryUrl, function(error, response, body) {
           

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            
            var info = JSON.parse(body);
            console.log("Movie Title: "+ info.Title)
            console.log("Release Year: " + info.Year);
            console.log("IMDB Rating: "+ info.Rated);
            console.log("Rotten Tomatoes Rating: "+info.Ratings[1].Value);
            console.log("Country: "+info.Country);
            console.log("Language: "+info.Language);
            console.log("Plot: "+info.Plot);
            console.log("Actors: "+info.Actors);
        }
        });
  },
  concertThis(){

    var request = require("request");

    // Store all of the arguments in an array
    var path = process.argv;

    // Create an empty variable 
    var band = "";

        // Loop through all the words in the node argument
        // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < path.length; i++) {

            if (i > 3 && i < path.length) {

                band = band + "+" + path[i];

            }

            else {

               band += path[i];

            }
        }


    queryUrl="https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

    console.log(queryUrl)

    request(queryUrl, function(error, response, body) {

        // If the request is successful

        if (!error && response.statusCode === 200) {
            var info = JSON.parse(body);
            console.log(info[0].venue.name)
            console.log(info[0].venue.city);
            console.log(moment(info[0].datetime).format("MM/DD/YYYY"));}
        else{
            console.log(error)
        }
    })
  },
  spotifyThis(){
    var Spotify =require('node-spotify-api');
    var song = "";
    var spotify =new Spotify(keys.spotify);

    for (var i =3; i <process.argv.length; i++){
        if(i > 3 && i < process.argv.length){
            song= song+ "+"+process.argv[i];
        }
        else {
            song += process.argv[i];
        }
    }
    if (song===""){
        song="The Sign"
        console.log(song)
    }
    spotify.search({type:'track',query:song},function(err,data){
        
        if(err){
            console.log("Error: "+err);
            return;
        }else{
            console.log("Album Name: "+data.tracks.items[0].album.name);
            console.log( "Artist Name: " + data.tracks.items[0].album.artists[0].name);
            console.log("Preview: " + data.tracks.items[0].album.external_urls.spotify);
        }
    })
  },



  runtime() {
		if (arg[2] === "concert-this") {
			liri.concertThis();
		} else if (arg[2] === "spotify-this-song") {
			liri.spotifyThis();
		} else if (arg[2] === "movie-this") {
			liri.movieThis();
		} else if (arg[2] === "do-what-it-says") {
			liri.says();
		}
	},




}
liri.runtime();
