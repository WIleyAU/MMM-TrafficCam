/* Magic Mirror
 * Module: MMM-TrafficCams
 *
 * By Scott Kemble
 * Apache Licensed.
 */

Module.register('MMM-TrafficCam', {

    defaults: {
        updateInterval: 5*60*1000,
        animationSpeed: 0,
        header: '',
        maxlongedge: 300,
        camID: "",
        camRegion: "SYD_MET",
        apiKey: "",
        loadingText: "Loading..."
    },

getScripts: function() {
    return ["moment.js"];
},


//Define start sequence
start: function () {
    log.log('Starting module: ' + this.name);
    this.data.classes = 'bright medium';
    this.loaded = false;
    this.camList = {};
    this.activeItem = 0;
    this.camURL = "http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/anzacbr.jpg";
    //this.sendSocketNotification('CONFIG', this.config);
    this.socketNotificationReceived("CAMERA_IMAGE_LIST", this.camURL);
},

getStyles: function() {
    return ['trafficcam.css', 'font-awesome.css'];
},


// Override the dom generator
getDom: function() {
    var wrapper = document.createElement("div");
    var imageDisplay = document.createElement('div'); //support for config.changeColor

    if (!this.loaded) {
        wrapper.innerHTML = this.config.loadingText;
        return wrapper;
    }
  /*      
    // set the first item in the list...
    if (this.activeItem >= this.camList.cams.length) {
        this.activeItem = 0;
    }
        
    var tempimage = this.camList.cams[this.activeItem];
       */


    // image
    var imageLink = document.createElement('div');
    imageLink.id = "MMM-TrafficCam";
    //imageLink.innerHTML = "<img src='" + tempimage.camURL + "'>";
    imageLink.innerHTML = "<img src='" + this.camURL + "'>";
        
    imageDisplay.appendChild(imageLink);
    wrapper.appendChild(imageDisplay);
       
    return wrapper;
},

/* scheduleUpdateInterval()
 * Schedule visual update.
 */
scheduleUpdateInterval: function() {
    var self = this;

    Log.info("Scheduled update interval set up...");
    self.updateDom(self.config.animationSpeed);

    setInterval(function() {
        Log.info("incrementing the activeItem and refreshing");
        self.activeItem++;
        self.updateDom(self.config.animationSpeed);
    }, this.config.updateInterval);
},


// override socketNotificationReceived
socketNotificationReceived: function(notification, payload) {
    //Log.info('socketNotificationReceived: ' + notification);
    if (notification === 'CAMERA_IMAGE_LIST')
    {
        //Log.info('received CAMERA_IMAGE_LIST');
        //this.camList = payload;
            
        //Log.info("count: " +  this.camList.cams.length);
            
        // we want to update the dom the first time and then schedule next updates
        if (!this.loaded) {
            this.updateDom(1000);
            this.scheduleUpdateInterval();
        }
            
        this.loaded = true;
    }
}





/*
socketNotificationReceived: function(notification, payload) {
    log.log('MMM-TraficCams: socketNotificationReceived ' + notification);
    if (notification === 'CAMERA_IMAGE_LIST') {
        this.img_src = payload;
        this.updateDom(this.config.animationSpeed);
    }
};

// Override dom generator
getDom: function () {
    var wrapper = document.createElement('div');
    var header = document.createElement("header");
    var name = document.createElement("span");
    name.innerHTML = "" + this.config.header;
    header.appendChild(name);
    wrapper.appendChild(header);

    var img = document.createElement('img');
    img.style = "max-width: " + this.config.maxlongedge + "px; max-height: " + this.config.maxlongedge + "px";
    img.src = this.img_src;
    img.alt = this.img_src;
    wrapper.appendChild(img);

    return wrapper;
},

*/


});