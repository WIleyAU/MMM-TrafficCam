MMM-TrafficCam
===================
This is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror). It displays live images from traffic cameras throughout NSW Australia. It can also display a custom subset of traffic camera images (yet to be implemented).

## Installation
Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/WIleyAU/MMM-TrafficCam.git`.
Install the module with 'npm install'.

## Config
The entry in `config.js` can include the following options:

|Option|Description|
|---|---|
|`apiKey`|api key used to retrieve the live traffic camera images, available from tfNSW.<br><br>**Type:** `String`<br>This value is **REQUIRED**|
|`camRegion`|NSW Region to display traffic camera images from.<br>Valid values are ALL, SYD_MET, SYD_SOUTH, SYD_NORTH, SYD_WEST, REG_NORTH, REG_SOUTH<br><br>**Type:** `String`<br>**Default value:** SYD_MET<br>This value is OPTIONAL|
|`camCust`|Array of individual camera IDs to display INSTEAD of the default regional group.<br>A value entered here will OVERWRITE `camRegion`<br><br>**Type:** `Array`<br>**Default value:** []<br>This value is OPTIONAL|
|`imageSize`|Display size of the image<br><br>**Type:** `Integer`<br>**Default value:** 400<br>This value is OPTIONAL|
|`animationSpeed`|Fade in and fade out speed of the individual camera images<br><br>**Type:** `Integer`<br>**Default value:** 1000<br>This value is OPTIONAL|
|`updateInterval`|How often the the images are updated.<br><br>**Type:** `Integer`<br>**Default value:** 300000<br>This value is OPTIONAL|


Here is an example of an entry in `config.js`
```
{
	module: 'MMM-TrafficCam',
	position: 'top_center',
	config: {
		apiKey: 'abcd1234',
		camRegion: 'SYD_MET',
		imageSize: 400,
	}
},
```


## Notes
This is my very first module and first time using node and JavaScript, so any feedback and/or suggestions would be welcomed.

## Special Thanks
- [Michael Teeuw](https://github.com/MichMich) for creating the awesome [MagicMirror2](https://github.com/MichMich/MagicMirror/tree/develop) project that made this module possible.
- [Jim Kapsalis](https://github.com/kapsolas) for creating the [MMM-Instagram](https://github.com/kapsolas/MMM-Instagram) module that I used extensively to create this module.
- [Luke Scheffler](https://github.com/LukeSkywalker92) for creating the [MMM-Globe](https://github.com/LukeSkywalker92/MMM-Globe) module that I also used to create this module.
