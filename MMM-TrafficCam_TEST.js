/* Magic Mirror
 * Module: MMM-TrafficCams
 *
 * By Scott Kemble
 * Apache Licensed.
 */

Module.register('MMM-TrafficCam', {

    defaults: {
        updateInterval: 3*60*1000,
        animationSpeed: 0,
        header: '',
        imageSize: 400,
        camID: "",
        camRegion: "SYD_MET",
        apiKey: "",
        loadingText: "Loading...",
    },

    start: function () {
        console.log("Starting module MMM-TrafficMirror...");
        var self = this;
        this.activeItem = 0;
        this.CamList = {}
        camList.cams = new array();
        grabCams();

        /*
        self.updateDom(1000);
        setInterval(function () {
            self.updateDom(1000);
        }, 90000);
        */
       
    },

    getStyles: function () {
        return ["trafficcams.css"]
    },

    grabCams: function () {
        console.log("MMM-TrafficCam grabbing photos...");
        camList.cams.push({
            "camID": "d2e649",
            "camTitle": "Anzac Bridge",
            "camView": "Intersection of Victoria Road and Anzac Bridge looking east towards the Sydney CBD.",
            "camDirection": "E",
            "camURL": "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/anzacbr.jpg"
        });
        camList.cams.push({
            "camID": "d2e6035",
            "camTitle": "York Street (Sydney)",
            "camView": "York Street at Margaret Street looking north towards Sydney Harbour Bridge.",
            "camDirection": "N",
            "camURL": "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/yorkst_sydney.jpg"
        });
        camList.cams.push({
            "camID": "d2e38",
            "camTitle": "Sydney Harbour Bridge",
            "camView": "Sydney Harbour Bridge deck looking south towards the Sydney CBD.",
            "camDirection": "S",
            "camURL": "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/harbourbridge.jpg"
        });
        this.updateDom();
        this.scheduleUpdateInterval();
    },

    /* scheduleUpdateInterval()
     * Schedule visual update.
     */
    scheduleUpdateInterval: function () {
        //var self = this;

        console.log("MMM-TrafficCam Scheduled update interval set up...");
        self.updateDom();

        setInterval(function () {
            console.log("MMM-TrafficCam incrementing the activeItem and refreshing");
            self.activeItem++;
            self.updateDom();
        }, 5000);
    },

    // Override dom generator.

    getDom: function () {
        var wrapper = document.createElement("div");
        var image = document.createElement("img");

        if (this.activeItem >= this.camList.cams.length) {
            this.activeItem = 0;
        }

        var tempimage = this.camList.cams[this.activeItem].camURL;

        image.src = tempimage;
        image.className = 'MMM-TrafficCam';

        image.width = this.config.imageSize.toString();
        image.height = this.config.imageSize.toString();

        wrapper.appendChild(image);
        return wrapper;
    }

   

});