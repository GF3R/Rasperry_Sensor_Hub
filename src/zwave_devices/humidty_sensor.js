const ZwaveDevice = require("../base_devices/zwave_device.js");
class HumiditySensor extends ZwaveDevice {

  constructor(nodeid, zwave) {
    super(nodeid);
    this.nodeid = nodeid;
    this.zwave = zwave;
    //this._register();
  }

  publishValue(data) {
    this.publish(this.pub_topic + "/humidity", data);
  }

  _register() {
		var req_post = require('request-promise');

		req_post({
				method: 'POST',
				uri: 'https://commander.lab.nexhome.ch/api/Things/Register',
				body: {
					thingId: "87bcf1d5-968e-44c9-a536-896b3f792b4" + this.deviceUuid,
					description: "humidity and temp sensor",
					created: Date.now(),
					updated: Date.now(),
					data: [{
						name: "temperature",
						valueType: "double",
						valueUnit: "celcius"
					}],
					events: [{
					
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

module.exports = HumiditySensor;
