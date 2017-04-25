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
        loadingText: "Loading..."
    },

    start: function () {
        self = this;
        this.url = '';
        this.imageList = [];
        this.tempList = [];
        this.activeItem = 0;
        this.loaded = false;
        this.grabCams();
    },



    grabCams: function () {
        this.sendSocketNotification("TRAFFIC_CAM_GET", this.config.apiKey);
    },

    filterImages: function () {
        var tempListf = [];
        tempListf = this.tempList;
        for (var i = 0, len = tempListf.length; i < len; i++) {
            if (tempListf[i]["properties"]["region"] == this.config.camRegion) {
                this.imageList.push(tempListf[i])
            };
        };
        this.updateDom(this.config.animationSpeed);
        this.scheduleUpdate();
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "TRAFFIC_CAM_LIST") {
            this.tempList = payload;
            if (!this.loaded) {
                this.updateDom(this.config.animationSpeed);
                this.filterImages();
            }
            this.loaded = true;
        }
    },




    scheduleUpdate: function () {
        setInterval(function () {
            self.updateDom(this.config.animationSpeed);
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
        var imgTitle = "";
        var imgDir = "";

        if (!this.loaded) {
            wrapper.innerHTML = "Loading...";
            return wrapper;
        }


        if (this.activeItem >= this.imageList.length) {
            this.activeItem = 0;
        }
        this.url = this.imageList[this.activeItem]["properties"]["href"];
        imgTitle = this.imageList[this.activeItem]["properties"]["title"];
        imgDir = this.imageList[this.activeItem]["properties"]["direction"];

        this.activeItem++;

        var image = document.createElement("img");
        image.src = this.url;
        image.className = 'MMM-TrafficCam';
        image.width = this.config.imageSize.toString();
        image.height = this.config.imageSize.toString();

        //name.innerHTML = "" + this.url;
        name.innerHTML = "" + imgTitle + "    View: " + imgDir;


        header.appendChild(name);
        wrapper.appendChild(header);
        wrapper.appendChild(image);

        return wrapper;
    }
});
