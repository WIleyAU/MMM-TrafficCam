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
        this.activeItem = 0;
        this.grabCams();
    },




    grabCams: function () {
        this.sendSocketNotification("TRAFFIC_CAM_GET");
    },


    socketNotificationReceived: function(notification, payload) {
        if (notification === "TRAFFIC_CAM_LIST") {
            this.imageList = payload;
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
        if (this.config.style == "europeDiscNat") {
            wrapper.style.height = 0.98 * this.config.imageSize - 1 + "px";
            wrapper.style.overflow = "hidden";
        }


        if (this.activeItem >= this.imageList.length) {
            this.activeItem = 0;
        }
        this.url = this.imageList[this.activeItem][this.config.style];
        this.activeItem++;

        var image = document.createElement("img");
        if (this.config.ownImagePath != '') {
            image.src = this.url;
        } else if (this.config.style == "centralAmericaDiscNat") {
            image.src = this.url + '?' + new Date().getTime();
            image.className = 'MMM-Globe-image-centralAmericaDiscNat';
        } else {
            image.src = this.url + '?' + new Date().getTime();
            image.className = 'MMM-Globe-image';
        }

        image.width = this.config.imageSize.toString();
        image.height = this.config.imageSize.toString();

        wrapper.appendChild(image);
        return wrapper;
    }
});