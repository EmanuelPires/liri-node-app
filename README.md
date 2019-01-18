# liri-node-app
Node app similar to SIRI.
The biggest challenge I encountered with this application was doing the default searches when the user doesn't pass the 4th argument for what they're searching in either the spotify search or the movie search.

While checking the length of process.argv was a good way to default to a particular search term it did not work with the "do-what-it-says command because in that case even though I was assigning the search term from the text file to the search variable the system was reading that there wasn't a 4th argument for process.argv[3] and because of that it was defaulting to "The Sign" by ace of base instead of using "I Want It That Way". 

To get around this problem I changed my if statement to be if(search===undefined) and that stopped it from defaulting to "The Sign" and accepting "I want it that way" from the array as the search term.

Watch the video of the command line below!

https://drive.google.com/file/d/1BvsdNUZ7Rr5k6DSftafye3opNEPZOCWn/view?usp=sharing
