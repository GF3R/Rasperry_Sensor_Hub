const ZwaveDevice = require("../base_devices/zwave_device.js");
class HumiditySensor extends ZwaveDevice {

  constructor(nodeid, zwave) {
    super(nodeid);
    this.nodeid = nodeid;
    this.zwave = zwave;
   // this._register();
  }

  publishValue(data) {
    this.publish(this.pub_topic + "/humidity", data);
  }

  _register() {
    var req_post = require('request-promise');

    req_post({
        method: 'POST',
        uri: 'http://localhost:3000/',
        body: {
          thingId: this.deviceUuid,
          description: "humidity device",
          created: Date.getTime(),
          updated: Date.getTime(),
          data: [{
            name: "humidity",
            valueType: "double",
            valueUnit: "percent"
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
        console.log(err);
        // POST failed...
      });
  }
}

module.exports = HumiditySensor;
