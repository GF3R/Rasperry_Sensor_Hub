# Raspberry Sensor Hub

Git clone thsi repo and run the test project as follows:
```
node startup.js
```
this will only work if you have the usb device configured correctly. 
Check below how this can be achieved.
The Z-Stick was used in this exmaple_proj

## How to intialize a new Project:
- first load the raspberry image to the raspberry pi ()
- create a new folder and get the NPM packages: 

```bash 
$ mkdir MyProject
$ cd MyProject
$ npm install openzwave-shared
```

- then the project is ready for your code
- dont forget to include the npm lib:

```javascript
var ZWave = require('./node_modules/openzwave-shared/lib/openzwave-shared.js');
//and set the driver Path!
var driverPath = '/dev/serial/by-id/usb-0658_0200-if00';
```
- to see what id your device has you can do the following:
```bash
$ lsusb
```