require("dotenv").config();


var keys = require("./keys.js");

var Spotify =require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var spotifyThis = function(){
    
    var song = "";

    for (var i =3; i <process.argv.length; i++){
        if(i > 3 && i < process.argv.length){
            song= song+ "+"+process.argv[i];
        }
        else {
            song += process.argv[i];
        }
    }
    if (song===""){
        console.log("please enter a song name")
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
}

if(process.argv[2]==="spotify-this-song"){
    spotifyThis();
}

// concert-this 
//   spotify-this-song
// movie-this
// do-what-it-says
