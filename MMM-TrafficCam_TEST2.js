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
        this.updateDom(1000);
        this.scheduleUpdate();
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "TRAFFIC_CAM_LIST") {
            this.tempList = payload;
            this.filterImages();
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
        var header2 = document.createElement("header");
        var name2 = document.createElement("span");
        var name = document.createElement("span");
        var table = document.createElement("table");
        var imgTitle = "";
        var imgDir = "";
        var imgReg = "";
        var imgDesc = "";

        if (this.activeItem >= this.imageList.length) {
            this.activeItem = 0;
        }
        this.url = this.imageList[this.activeItem]["properties"]["href"];
        imgTitle = this.imageList[this.activeItem]["properties"]["title"];
        imgDir = this.imageList[this.activeItem]["properties"]["direction"];
        imgReg = this.imageList[this.activeItem]["properties"]["region"];
        imgDesc = this.imageList[this.activeItem]["properties"]["view"];


        table.innerHTML = '<tr>' +
                        '<td class="title" style="text-align:Right;">' + this.translate("CAM DIRECTION") + ':&nbsp;</td>' +
                        '<td class="value" style="text-align:left;">' + camDir + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="title" style="text-align:Right;">' + this.translate("CAM REGION") + ':&nbsp;</td>' +
                        '<td class="value" style="text-align:left;">' + camReg + '</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="title" style="text-align:Right;">' + this.translate("CAM DESCRIPTION") + ':&nbsp;</td>' +
                        '<td class="value" style="text-align:left;">' + camDesc + '</td>' +
                        '</tr>';


        this.activeItem++;

        var image = document.createElement("img");
        image.src = this.url;
        image.className = 'MMM-TrafficCam';
        image.width = this.config.imageSize.toString();
        image.height = this.config.imageSize.toString();

        //name.innerHTML = "" + this.url;
        name.innerHTML = "" + imgTitle;
        name2.innerHTML = "View: " + imgDir;

        /*
        header.appendChild(name);
        header2.appendChild(name2);
        wrapper.appendChild(image);
        wrapper.appendChild(header);
        wrapper.appendChild(header2);
        */
        /*
        header.appendChild(name);
        wrapper.appendChild(image);
        wrapper.appendChild(header);
        wrapper.appendChild(table);
        */

        //return wrapper;
        return table;
    }
});