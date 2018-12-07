class SwitchBinary extends Zwave_Device {

let nodeid;
let zwave;

	constructor(nodeid, zwave) {
		this.nodeid = nodeid;
		this.zwave = zwave;
		this.subscribe(topic, onMqttRreceived);

		//signal to rest that we are here
	}
}


function setValue(boolVal) {
	zwave.setValue(nodeid,37,1,0,boolVal);
}

function onMqttRreceived(message) {
	this.setValue(message);
}
