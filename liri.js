require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

var dataArr = [];

var command = process.argv[2];
var search = process.argv[3];

// if (command == "movie-this") {
//   if (process.argv.length < 4) {
//     search = "Mr Nobody";
//   }
//   axios
//     .get("http://www.omdbapi.com/?t=" + search + "&apikey=trilogy")
//     .then(function(response) {
//       console.log("Movie Title: " + response.data.Title);
//       console.log("Release Date: " + response.data.Released);
//       console.log("IMDB Rating: " + response.data.Ratings[0].Value);
//       console.log(
//         "Rotten Tomatoes Movie Rating: " + response.data.Ratings[1].Value
//       );
//       console.log("Country: " + response.data.Country);
//       console.log("Plot: " + response.data.Plot);
//       console.log("Actors: " + response.data.Actors);
//     });
// } else if (command == "concert-this") {
//   axios
//     .get(
//       "https://rest.bandsintown.com/artists/" +
//         search +
//         "/events?app_id=codingbootcamp"
//     )
//     .then(function(response) {
//       console.log("Venue: " + response.data[0].venue.name);
//       console.log(
//         "Location: " +
//           response.data[0].venue.city +
//           " " +
//           response.data[0].venue.country
//       );
//       var formatDate = response.data[0].datetime;
//       console.log(moment(formatDate).format("MM/DD/YYYY"));
//     });
// } else if (command == "spotify-this-song") {
//   if (process.argv.length < 4) {
//     search = "All the Small things";
//   }
//   spotify.search({ type: "track", query: search }, function(err, data) {
//     if (err) {
//       return console.log("Error occurred: " + err);
//     }

//     console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
//     console.log("Song Name: " + data.tracks.items[0].name);
//     console.log("Preview Link: " + data.tracks.items[0].preview_url);
//     console.log("Album Name; " + data.tracks.items[0].album.name);
//   });
// } else if (command == "do-what-it-says") {
//   fs.readFile("random.txt", "utf8", function(error, data) {
//     if (error) {
//       return console.log(error);
//     } else {
//       dataArr = data.split(",");

//       process.argv[2] = dataArr[0];
//       process.argv[3] = dataArr[1];
//       spots();
//     }
//   });
// }

//Setting up each function for commands

var doIt = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    } else {
      dataArr = data.split(",");
      command = dataArr[0];
      search = dataArr[1];

      spots();
    }
  });
};

var spots = function() {
  if (search === undefined) {
    search = "The Sign Ace of Base";
  }
  spotify.search({ type: "track", query: search }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Preview Link: " + data.tracks.items[0].preview_url);
    console.log("Album Name; " + data.tracks.items[0].album.name);
  });
};

var mov = function() {
  if (process.argv.length < 4) {
    search = "Mr Nobody";
  }
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
};

var conc = function() {
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
      console.log("Date: " + moment(formatDate).format("MM/DD/YYYY"));
    });
};

switch (command) {
  case "movie-this":
    mov();
    break;
  case "concert-this":
    conc();
    break;
  case "spotify-this-song":
    spots();
    break;
  case "do-what-it-says":
    doIt();
    break;
}
