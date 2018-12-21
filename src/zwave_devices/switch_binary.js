const ZwaveDevice = require("../base_devices/zwave_device.js");
class SwitchBinary extends ZwaveDevice {

	constructor(nodeid, zwave) {
		super();
		this.nodeid = nodeid;
		this.zwave = zwave;
		this._register();
		this.subscribe(this.topic, onMqttRreceived);
	}



	setValue(boolVal) {
		console.log("setting value: " + boolVal);
		this.zwave.setValue(this.nodeid, 37, 1, 0, boolVal);
	}

	onMqttRreceived(message) {
		console.log("revieved message from mqtt: " + message);
		this.setValue(message);
	}

	_register() {
		var req_post = require('request-promise');

		req_post({
				method: 'POST',
				uri: 'http://localhost:3000/',
				body: {
					thingId: this.deviceUuid,
					description: "binary switch",
					created: new Date().getTime(),
					updated: new Date().getTime(),
					data: [{
						name: "isrunning",
						valueType: "boolean",
						valueUnit: "running"
					}],
					events: [{
						name: "running",
						parameters: [{
							name: "value",
							type: "boolean"
						}]
					}]
				},
				json: true
			}).then(function (parsedBody) {
				console.log(parsedBody);
				// POST succeeded...
			})
			.catch(function (err) {
				console.log(parsedBody);
				// POST failed...
			});
	}
}

module.exports = SwitchBinary;