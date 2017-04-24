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
var callTest = "";
var imagesWorking = {};


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
        } else {
            this.filterImages();
        }
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
        var reqRegion = this.camRegion;
        console.log("MMM-TrafficCam REQUEST reqRegion: " + reqRegion);
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("MMM-TrafficCam statusCode: " + response.statusCode);
                // get our images out of the INSTAGRAM JSON response
                this.callTest = "CALL TEST SUCCESS";
                console.log("MMM-TrafficCam starting call test...");
                console.log("MMM-TRAFFICCAM CALL TEST: " + this.callTest);
                var items = JSON.parse(body);
                var tempRegion = "";
                console.log("MMM-TrafficCams IN REQUEST camRegion: " + this.camRegion);
                console.log("MMM-TrafficCam items: " + items);
                // create our model, a dictionary with

                var images = [];
                console.log("MMM-TrafficCam new image array length: " + images.length);
                items.features.forEach(function (results) {
                    console.log("MMM-TrafficCam forEach start check...");
                    console.log("MMM-TrafficCam results.properties.region: " + results.properties.region);
                    tempRegion = results.properties.region;
                    console.log("MMM-TrafficCam tempRegion: " + tempRegion);
                    console.log("MMM-TrafficCam IN REQUEST tempRegion(" + tempRegion + ") = camRegion(" + this.camRegion + ")");
                    images.push(results);

                    /*
                    if (tempRegion == this.camRegion) {
                        console.log("MMM-TrafficCam this.config.camRegion: " + this.camRegion);
                        images.push(results);
                        console.log("MMM-TrafficCam images length working: " + images.length);
                    };
                    */

                });
                console.log("MMM-TrafficCam images length final: " + images.length);
                console.log("MMM-TrafficCam: Sending Socket Notification");
                self.sendSocketNotification('TRAFFIC_CAM_LIST', images);
                //console.log(images)

            }
            else {
                console.log(" Error: " + response.statusCode);
            }
        }.bind({camRegion:reqRegion}));
    }
    
});


