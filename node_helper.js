/* Magic Mirror
 * Module: MMM-TrafficCams
 *
 * By Scott Kemble
 * Apache 2.0 Licensed.
 */

const NodeHelper = require('node_helper');
var async = require('async');
var https = require('https');
const request = require('request');


module.exports = NodeHelper.create({

    start: function() {
        console.log('Starting node helper: ' + this.name);
    },

    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        if (notification === 'CONFIG') {
            console.log('trafficCam helper: config received');
            var self = this;
            this.config = payload;
            self.retrieveAndUpdate();
            setInterval(function() {
                console.log("trafficCam helper retrieveAndUpdate()");
                self.retrieveAndUpdate();
            }, this.config.updateInterval);
        }
    },

    retrieveAndUpdate: function() {
        var self = this;
        console.log('retrieveAndUpdate()');

        
        /* commenting out for testing purposes
        //set https options
        var options = {
            hostname: "api.transport.nsw.gov.au",
            port: 443,
            path: "/v1/live/cameras",
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": "apikey " + this.config.apiKey
            }
        };

        //Get image URLs
        var req = https.request(options, function(res) {
            //console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);

            res.setEncoding("utf-8");
            var responseString = "";
            res.on('data', function(data) {
                responseString += data;
            });

            res.on('end', function() {
                //console.log(responseString);
                var responseObject = JSON.parse(responseString);
                var camList = {};
                camList.cams = new Array();
        
                responseObject.features.forEach(function (result) {
                    if (result.properties.region == this.config.camRegion) {
                        //console.log("TestOutput: ", result);
                        camList.cams.push({
                            "camID": result.id,
                            "camTitle": result.properties.title,
                            "camView": result.properties.view,
                            "camDirection": result.properties.direction,
                            "camURL": result.properties.href
                        });
                    };
                });
                self.sendSocketNotification('CAMERA_IMAGE_LIST', camList);
            });
        });

        req.end();
        */
        var camList = {};
        camList.cams = new Array ();
        camList.cams.push({
            "camID": "d2e649",
            "camTItle": "Anzac Bridge",
            "camView": "Intersection of Victoria Road and Anzac Bridge lookingeast towards the Sydney CBD.",
            "camDirection": "E",
            "camURL": "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/anzacbr.jpg"
        });
        camList.cams.push({
            "camID": "d2e3350",
            "camTItle": "City West Link",
            "camView": "City West Link at Lilyfield looking east towards Victoria Road intersection.",
            "camDirection": "E",
            "camURL": "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/citywestlink.jpg"
        });
        camList.cams.push({
            "camID": "d2e6035",
            "camTItle": "York Street (Sydney)",
            "camView": "York Street at Margaret Street looking north towards Sydney Harbour Bridge.",
            "camDirection": "N",
            "camURL": "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/yorkst_sydney.jpg"
        });
        self.sendSocketNotification('CAMERA_IMAGE_LIST', camList);
        console.log("CamList",camList);
    }
});
