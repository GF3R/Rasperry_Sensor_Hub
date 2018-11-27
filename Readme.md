# Raspberry Sensor Hub


this will only work if you have the usb device configured correctly. 
Check below how this can be achieved.
The Z-Stick was used in this exmaple_proj

## First time initialisation:

This Project is created for the raspberry pi therefore we recommend the following steps:

- first get [the raspberry stretch lite](https://www.raspberrypi.org/downloads/raspbian/)
- install Git clone this repo
```bash
$ sudo apt-get install git
$ git clone https://github.com/GF3R/Rasperry_Sensor_Hub.git
$ cd Raspberry_Sensor_Hub
```
- run the **[init script](https://github.com/GF3R/Rasperry_Sensor_Hub/tree/master/initalize)**
- this enables the following features:
  - Installs all the required packages
  - Runs the init_zwave as a service
  - Enables an auto_update function, which runs at 23:30
- or get the packages yourself:
```bash
$ apt-get update
$ apt-get install nodejs npm
$ apt-get install libopenzwave-doc libopenzwave1.5 libopenzwave1.5-dev
```
- if all was done correctly you can run the test project as follows:
```bash
$ cd example_proj
$ node init_zwave.js
```

## How to intialize a new Project:

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
