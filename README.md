###MMM-TrafficCam
==========================
This a module for the MagicMirror. It pulls images from live traffic camera feeds around NSW Australia (requires API_KEY). The photos are then rotated and animated in the screen.

##Installation

Navigate into your MagicMirror's modules folder and execute git clone https://github.com/WIleyAU/MMM-TrafficCam.git A new folder will appear, navigate into it.
Execute npm install to install the node dependencies.

##Config

The entry in config.js can include the following options:



|Option|Description|
|---|---|
|apiKey|Access token which is received from tfNSW

Type: string
This value is REQUIRED|
|camRegion|NSW Region to display traffic camera images from.
Valid values are ALL, SYD_MET, SYD_SOUTH, SYD_WEST, SYD_NORTH, REG_NORTH, REG_SOUTH
Default: SYD_MET
This value is OPTIONAL|
camGroup	Array of camera IDs to display. Overwrites camRegion
Default: []
This value is OPTIONAL
imageSize	How large the traffic camera image should be displayed.
Default: 400
This value is OPTIONAL
updateInterval	How long before refreshing image list.
Default: 10000
This value is OPTIONAL
animationSpeed	How long the fade out and fade in of photos should take.
Default: 1000
This value is OPTIONAL
Here is an example of an entry in config.js

{
	module: 'MMM-TrafficCam',
	position: 'top_center',
	config: {
		apiKey: 'API_KEY from instagram',
		camRegion: 'SYD_MET',  
		imageSize: 400,
		animationSpeed: 1000,
		updateInterval: 10000
	}
},
Dependencies

request (installed via npm install)
Important Notes

This is my very first project using Node, so feel free to submit pull requests or post on the issues/wiki and I will do my best to improve the project.
Special Thanks

Michael Teeuw for creating the awesome MagicMirror2 project that made this module possible.
Jim Kapsalis for creating the MMM-Instagram module that I used as guidance in creating this module.
Luke Scheffler for creating the MMM-Globe module that I also used as guidance in creating this module.
