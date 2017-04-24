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

        request(options, function(error, response, body)
        {
            if (!error && response.statusCode == 200)
            {
                var items = JSON.parse(body);

                var camList = [];

                items.features.forEach(function (result) {
                    if (result.properties.region == this.config.camRegion) {
                        camList.push(items.features);
                    }
                });
                this.sendSocketNotification("TRAFFIC_CAM_LIST", camList);
            }
        });

});


