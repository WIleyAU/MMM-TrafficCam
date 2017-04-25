/* Magic Mirror
 * Module: MMM-TrafficCams
 *
 * By Scott Kemble
 * Apache Licensed.
 */

Module.register('MMM-TrafficCam', {

    defaults: {
        updateInterval: 10000,
        animationSpeed: 0,
        header: '',
        imageSize: 400,
        camID: "",
        camRegion: "SYD_MET",
        apiKey: "",
        loadingText: "Loading...",
        style: 'natColor',
        ownImagePath: '',
        test: false
    },

    start: function () {
        self = this;
        this.url = '';
        this.imageList = [];
        this.tempList = [];
        this.activeItem = 0;
        this.grabCams();
    },


     
    grabCams: function () {
        var options = {
            "apiKey": this.config.apiKey,
            "camRegion": this.config.camRegion
        };
        this.sendSocketNotification("TRAFFIC_CAM_GET",options);
    },

    filterImages: function() {
        this.tempList.forEach(function (results) {
            console.log("MMM-TrafficCam forEach start check...");
            console.log("MMM-TrafficCam results.properties.region: " + results.properties.region);
            if (results.properties.region == this.config.camRegion) {
                console.log("MMM-TrafficCam this.config.camRegion: " + this.config.camRegion);
                this.imageList.push(results);
                console.log("MMM-TrafficCam images length working: " + this.imageList.length);
            };
        });
        //this.updateDom(1000);
        //this.scheduleUpdate();
        this.url = "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/anzacbr.jpg";
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "TRAFFIC_CAM_LIST") {
            console.log("MMM-TrafficCam Payload RECEIVED");
            console.log("MMM-TrafficCam Payload Length: " + payload.length);
            this.tempList = payload;
            this.filterImages();
            this.updateDom(1000);
            this.scheduleUpdate();
        }
    },
    



    scheduleUpdate: function () {
        setInterval(function () {
            self.updateDom(1000);
            console.log('update')
        }, this.config.updateInterval);
    },
    


    getStyles: function () {
        return ["trafficcams.css"]
    },

    // Override dom generator.

    getDom: function () {
        var wrapper = document.createElement("div");
        var header = document.createElement("header");
        var name = document.createElement("span");

        if (this.activeItem >= this.imageList.length) {
            this.activeItem = 0;
        }
        //this.url = this.imageList[this.activeItem]["properties"]["href"];
        
        this.activeItem++;

    
        var image = document.createElement("img");
        image.src = this.url;
        image.className = 'MMM-TrafficCam';
        image.width = this.config.imageSize.toString();
        image.height = this.config.imageSize.toString();

        name.innerHTML = "" + this.url;

        header.appendChild(name);
        wrapper.appendChild(image);
        wrapper.appendChild(header);

        return wrapper;
    }
});