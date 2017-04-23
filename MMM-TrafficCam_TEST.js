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
        loadingText: "Loading..."
    },
    start: function () {
        self = this;
        this.url = 'http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/anzacbr.jpg';
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
        var image = document.createElement("img");

        image.src = this.url;
        image.className = 'MMM-TrafficCam';

        image.width = this.config.imageSize.toString();
        image.height = this.config.imageSize.toString();

        wrapper.appendChild(image);
        return wrapper;
    }
});