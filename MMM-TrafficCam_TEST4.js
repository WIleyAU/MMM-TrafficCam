/* Magic Mirror
 * Module: MMM-TrafficCams
 *
 * By Scott Kemble
 * Apache 2.0 Licensed.
 */

var NodeHelper = require('node_helper');
var request = require('request');


module.exports = NodeHelper.create({


    start: function() {
        console.log('Starting node helper: ' + this.name);
    },

    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification) {
        if (notification === 'TRAFFIC_CAM_GET') {
            this.retrieveAndUpdate();
        }
    },

    retrieveAndUpdate: function () {
        var self = this;

        var tempList = [];
        var tempObject = {};
        var tempObject2 = {};
        tempObject = {
            "type": "Feature",
            "id": "d2e6035",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    151.205623,
                    -33.865088
                ]
            },
            "properties": {
                "region": "SYD_MET",
                "title": "York Street (Sydney)",
                "view": "York Street at Margaret Street looking north towards Sydney Harbour Bridge.",
                "direction": "N",
                "href": "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/yorkst_sydney.jpg"
            }
        };
        tempList.push(tempObject);
        tempObject2 = {
            "type": "Feature",
            "id": "d2e6036",
            "geometry": {
                "type": "Point",
                "coordinates": [
                        151.265661,
                    -33.788582
                ]
            },
            "properties": {
                "region": "SYD_NORTH",
                "title": "Burnt Bridge Creek (Balgowlah)",
                "view": "Burnt Bridge Creek at Condamine Street looking north towards Dee Why.",
                "direction": "N",
                "href": "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/burntbrdg_seaforth.jpg"
            }
        };
        tempList.push(tempObject2);
        this.sendSocketNotification("TRAFFIC_CAM_LIST", tempList);

    },

    testGrab: function () {
        var self = this;
        console.log('retrieveAndUpdate()');

        //set https options
        var options = {
            url: "https://api.transport.nsw.gov.au/v1/live/cameras",
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "apikey " + this.config.apiKey
            }
        };

        callback: function(error, response, body) {
            if (!error && response.statusCode == 200) {
                // get our images out of the INSTAGRAM JSON response
                var items = JSON.parse(body);

                // create our model, a dictionary with 
                var images = [];

                items.features.forEach(function (results) {
                    if (results.properties.region == this.config.camRegion) {
                        images.push(results);
                    };
                    
                });
                self.sendSocketNotification('TRAFFIC_CAM_LIST', images);
                
            }
            else {
                console.log(" Error: " + response.statusCode);
            }
        };

        //Get image URLs
        request(options, callback);

    }

});


