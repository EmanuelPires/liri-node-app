require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search = process.argv[3];

if (command == "movie-this") {
  axios
    .get("http://www.omdbapi.com/?t=" + search + "&apikey=trilogy")
    .then(function(response) {
      console.log("Movie Title: " + response.data.Title);
      console.log("Release Date: " + response.data.Released);
      console.log("IMDB Rating: " + response.data.Ratings[0].Value);
      console.log(
        "Rotten Tomatoes Movie Rating: " + response.data.Ratings[1].Value
      );
      console.log("Country: " + response.data.Country);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    });
} else if (command == "concert-this") {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        search +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log("Venue: " + response.data[0].venue.name);
      console.log(
        "Location: " +
          response.data[0].venue.city +
          " " +
          response.data[0].venue.country
      );
      var formatDate = response.data[0].datetime;
      console.log(moment(formatDate).format("MM/DD/YYYY"));
    });
} else if (command == "spotify-this-song") {
  spotify.search({ type: "track", query: search }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Preview Link: " + data.tracks.items[0].preview_url);
    console.log("Album Name; " + data.tracks.items[0].album.name);
  });
}
