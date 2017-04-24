/* Magic Mirror
 * Module: MMM-TrafficCams
 *
 * By Scott Kemble
 * Apache 2.0 Licensed.
 */

var NodeHelper = require('node_helper');



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

    retrieveAndUpdate: function() {
        var imageUrls = {
            'natColor': 'http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/anzacbr.jpg',
            'geoColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_true_color.jpg',
            'airMass': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/full_disk_ahi_rgb_airmass.jpg',
            'fullBand': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif',
            'europeDiscNat': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_LowResolution.jpg',
            'europeDiscSnow': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBSolarDay_CentralEurope.jpg',
            'centralAmericaDiscNat': 'http://goes.gsfc.nasa.gov/goescolor/goeseast/overview2/color_med/latestfull.jpg'

        };
        var hiResImageUrls = {
            'natColor': 'http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/harbourbridge.jpg',
            'geoColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg',
            'airMass': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_rgb_airmass.jpg',
            'fullBand': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif',
            'europeDiscNat': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_LowResolution.jpg',
            'europePartSnow': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBSolarDay_CentralEurope.jpg',
            'centralAmericaDiscNat': 'http://goes.gsfc.nasa.gov/goescolor/goeseast/overview2/color_lrg/latestfull.jpg'
        };
        var loResImageUrls = {
            'natColor': 'http://www.rms.nsw.gov.au/trafficreports/cameras/camera_images/yorkst_sydney.jpg',
            'geoColor': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_true_color.jpg',
            'airMass': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest_hi_res/himawari-8/full_disk_ahi_rgb_airmass.jpg',
            'fullBand': 'http://rammb.cira.colostate.edu/ramsdis/online/images/latest/himawari-8/himawari-8_band_03_sector_02.gif',
            'europeDiscNat': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBNatColour_LowResolution.jpg',
            'europePartSnow': 'http://oiswww.eumetsat.org/IPPS/html/latestImages/EUMETSAT_MSG_RGBSolarDay_CentralEurope.jpg',
            'centralAmericaDiscNat': 'http://goes.gsfc.nasa.gov/goescolor/goeseast/overview2/color_lrg/latestfull.jpg'
        };
        var imageList = [];

        imageList.push(imageUrls);
        imageList.push(hiResImageUrls);
        imageList.push(loResImageUrls);

        this.sendSocketNotification("TRAFFIC_CAM_LIST",imageList)

    }

});


