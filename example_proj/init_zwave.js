var ZWave = require('./node_modules/openzwave-shared/lib/openzwave-shared.js');
var zwave = new ZWave({ConsoleOutput: false});
var driverPath = '/dev/serial/by-id/usb-0658_0200-if00';

zwave.on('notification', function(nodeid, notif){
	console.log('message %d for node %d', notif, nodeid);
});

zwave.connect(driverPath);



