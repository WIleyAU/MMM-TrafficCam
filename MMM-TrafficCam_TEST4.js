/* Magic Mirror
 * Module: MMM-TrafficCams
 *
 * By Scott Kemble
 * Apache 2.0 Licensed.
 */

var NodeHelper = require('node_helper');
var request = require('request');
var apiKey = "";
var camRegion = "";


module.exports = NodeHelper.create({


    start: function() {
        console.log('Starting node helper: ' + this.name);
    },

    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, options) {
        if (notification === 'TRAFFIC_CAM_GET') {
            this.apiKey = options["apiKey"];
            this.camRegion = options["camRegion"];
            this.grabCams();
        } 
    },
    
    grabCams: function () {
        var self = this;

        //set https options
        var options = {
            url: "https://api.transport.nsw.gov.au/v1/live/cameras",
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "apikey " + this.apiKey
            }
        };

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // get our images out of the tfNSW JSON response
                var items = JSON.parse(body);

                // create our model, a dictionary with
                var images = [];
                items.features.forEach(function (results) {
                    images.push(results);
                });
                self.sendSocketNotification('TRAFFIC_CAM_LIST', images);
                //console.log(images)
            }
            else {
                console.log(" Error: " + response.statusCode);
            }
        });
    }
    
});


