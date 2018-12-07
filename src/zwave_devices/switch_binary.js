var ZWave = require('../node_modules/openzwave-shared/lib/openzwave-shared.js');
var zwave = new ZWave({ConsoleOutput: false});
var driverPath = '/dev/serial/by-id/usb-0658_0200_if00';

zwave.on('notification', function(nodeid, notif) {
	console.log('message %d for node %d', notif, nodeid);
});

zwave.connect(driverPath);
console.log("connected");
zwave.setValue(2,37,1,0,true);
