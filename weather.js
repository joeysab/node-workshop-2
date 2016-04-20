var prompt = require("prompt");
var request = require("request");
var colors = require('colors');
var util = require("util");
var unixtime = require("unix-timestamp");


console.log((unixtime.toDate(1461049200)).toString().substring(0, 15));



var promptObj = {
    description: 'Enter city', // Prompt displayed to the user. If not supplied name will be used. 
    type: 'string', // Specify the type of input to expect. 
    pattern: /^\w+$/, // Regular expression that input must be valid against. 
    message: 'Password must be letters', // Warning message to display if validation fails. 
    hidden: true, // If true, characters entered will either not be output to console or will be outputed using the `replace` string. 
    replace: '*', // If `hidden` is set it will replace each hidden character with the specified string. 
    default: 'lamepassword', // Default value to use if no value is entered. 
    required: true // If true, value entered must be non-empty. 
}




prompt.start()

prompt.get([promptObj.description], function(err, result) {

    var city = result[promptObj.description];
    var addressGoogle = "https://maps.googleapis.com/maps/api/geocode/json?address=" + city;

    request(addressGoogle, function(err, result) {
        var resultObject0 = JSON.parse(result.body);
        var googleLat = resultObject0.results[0].geometry.location.lat;
        var googleLng = resultObject0.results[0].geometry.location.lng;


        var addressWeather = "https://api.forecast.io/forecast/0600a90c202a8c1212fcc0fdd16b8823/" + googleLat + "," + googleLng;
        request(addressWeather, function(err, result) {

            var days = {};
            var resultObject = JSON.parse(result.body);

            for (var i = 0; i < 4; i++) {
                var theDay = (unixtime.toDate(resultObject.daily.data[i].time)).toString().slice(0, 3);
                days[theDay] = {
                    description: resultObject.daily.data[i].summary,
                    min: resultObject.daily.data[i].temperatureMin + "F",
                    max: resultObject.daily.data[i].temperatureMax + "F"
                };


            };
            console.log(days)
            console.log("The current weather in " + city + " is: " + resultObject.currently.summary);
            console.log("The current temperature is " + resultObject.currently.temperature + "F");
        });
    });
})
