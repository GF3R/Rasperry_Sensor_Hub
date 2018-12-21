const ZwaveDevice = require("../base_devices/zwave_device.js");
class SwitchBinary extends ZwaveDevice {


	constructor(nodeid, zwave) {
		super(nodeid);
		this.deviceUuid = nodeid;
		this.nodeid = nodeid;
		this.zwave = zwave;
		this._register();
		this.subscribe(this.topic,(message) => { this.onMqttRecieved(message) });
	}



	setValue(boolVal) {
		logger.trace("setting value: " + boolVal);
		this.zwave.setValue(this.nodeid, 37, 1, 0, boolVal);
	}


	onMqttRreceived(message) {
		logger.trace("revieved message from mqtt: " + message);
		this.setValue(message == 1);
	}

	_register() {
		var req_post = require('request-promise');

		req_post({
				method: 'POST',
				uri: 'https://commander.lab.nexhome.ch/api/Things/Register',
				body: {
<<<<<<< HEAD
					thingId: "uid"+this.deviceUuid,
=======
					thingId: "87bcf1d5-968e-44c9-a536-896b3f792b4" + this.deviceUuid,
>>>>>>> d8b06e92080c71a8f6bb5fcf9cb32003211f2e73
					description: "binary switch",
					created: "2018-12-21T11:25:52.919Z",
					updated: "2018-12-21T11:25:52.919Z",
					data: [{
						name: "isrunning",
						valueType: "boolean",
						valueUnit: "running"
					}],
					events: [{
						name: "running",
						parameters: {
							key: "value",
							value: "boolean",
						}
					}]
				},
				json: true
			}).then(function (parsedBody) {
				logger.trace(parsedBody);
				// POST succeeded...
			})
			.catch(function (err) {
				logger.error(err);
				// POST failed...
			});
	}
}

module.exports = SwitchBinary;
