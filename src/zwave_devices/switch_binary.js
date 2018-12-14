class SwitchBinary extends Zwave_Device {

	constructor(nodeid, zwave) {
		
		this.nodeid = nodeid;
		this.zwave = zwave;
		this.subscribe(this.topic, onMqttRreceived);
	}



	setValue(boolVal) {
		zwave.setValue(this.nodeid, 37, 1, 0, boolVal);
	}

	onMqttRreceived(message) {
		this.setValue(message);
	}
}