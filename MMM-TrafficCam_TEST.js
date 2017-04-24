/* Magic Mirror
 * Module: MMM-TrafficCams
 *
 * By Scott Kemble
 * Apache Licensed.
 */

Module.register('MMM-TrafficCam', {

    defaults: {
        updateInterval: 1*60*1000,
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
        this.imageUrls = {
            'natColor': 'http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/anzacbr.jpg',
            'geoColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_true_color.jpg',
            'airMass': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_rgb_airmass.jpg',
            'fullBand': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif',
            'europeDiscNat': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_LowResolution.jpg',
            'europeDiscSnow': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBSolarDay_CentralEurope.jpg',
            'centralAmericaDiscNat': 'http://goes.gsfc.nasa.gov/goescolor/goeseast/overview2/color_med/latestfull.jpg'

        }
        this.hiResImageUrls = {
            'natColor': 'http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/harbourbridge.jpg',
            'geoColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg',
            'airMass': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_rgb_airmass.jpg',
            'fullBand': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif',
            'europeDiscNat': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_LowResolution.jpg',
            'europePartSnow': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBSolarDay_CentralEurope.jpg',
            'centralAmericaDiscNat': 'http://goes.gsfc.nasa.gov/goescolor/goeseast/overview2/color_lrg/latestfull.jpg'
        }
        console.log(this.imageUrls[this.config.style]);
        this.imageList.push(this.imageUrls);
        this.imageList.push(this.hiResImageUrls);
        if (this.config.ownImagePath != '') {
            this.url = this.config.ownImagePath;
        } else {
            if (this.config.imageSize > 800) {
                this.url = this.hiResImageUrls[this.config.style];
            } else {
                if (this.activeItem >= imageList.length) {
                    this.activeItem = 0}
                this.url = this.imageList[this.activeItem][this.config.style];
            }
            setInterval(function () {
                this.activeItem++;
                self.updateDom(1000);
                console.log('update')
            }, this.config.updateInterval);
        }
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