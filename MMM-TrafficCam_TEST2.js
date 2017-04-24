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


    //TESTING
    /*
    grabCams: function() {
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

        this.imageList = tempList;
        this.scheduleUpdate();
    },
    */

    
    grabCams: function () {
        this.sendSocketNotification("TRAFFIC_CAM_GET",this.config.apiKey, this.config.camRegion);
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
        var header = document.createElement("header");
        var name = document.createElement("span");

        if (this.activeItem >= this.imageList.length) {
            this.activeItem = 0;
        }
        this.url = this.imageList[this.activeItem]["properties"]["href"];
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