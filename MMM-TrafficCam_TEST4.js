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
            console.log("MMM-TrafficCam Notification Received: ", notification);
            console.log("MMM-TrafficCam apiKey: " + options["apiKey"]);
            this.apiKey = options["apiKey"];
            console.log("MMM-TrafficCam this.apiKey: " + this.apiKey);
            console.log("MMM-TrafficCam camRegion: " + options["camRegion"]);
            this.camRegion = options["camRegion"];
            console.log("MMM-TrafficCam this.camRegion: " + this.camRegion);
            this.testGrab();
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
        this.sendSocketNotification("TRAFFIC_CAM_LIST2", tempList);

    },
    
    testGrab: function () {
        var self = this;
        console.log('MMM-TrafficCam: testGrab()');

        //set https options
        var options = {
            url: "https://api.transport.nsw.gov.au/v1/live/cameras",
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "apikey " + this.apiKey
            }
        };

        console.log("MMM-TrafficCam url: " + options["url"]);

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("MMM-TrafficCam statusCode: " + response.statusCode);
                // get our images out of the INSTAGRAM JSON response
                var items = JSON.parse(body);
                console.log("MMM-TrafficCam items: " + items);
                // create our model, a dictionary with 
                var images = [];
                console.log("MMM-TrafficCam new image array length: " + images.length);
                items.features.forEach(function (results) {
                    console.log("MMM-TrafficCam forEach start check...");
                    console.log("MMM-TrafficCam results.properties.region: " + results.properties.region);
                    if (results.properties.region == this.camRegion) {
                        console.log("MMM-TrafficCam this.config.camRegion: " + this.camRegion);
                        images.push(results);
                        console.log("MMM-TrafficCam images length working: " + images.length);
                    };

                });
                console.log("MMM-TrafficCam images length final: " + images.length);
                console.log("MMM-TrafficCam: Sending Socket Notification");
                self.sendSocketNotification('TRAFFIC_CAM_LIST', images);
                //console.log(images)

            }
            else {
                console.log(" Error: " + response.statusCode);
            }
        });
    }
    
});


