const ZwaveDevice = require("../base_devices/zwave_device.js");
class HumidtySensor extends ZwaveDevice {

  constructor(nodeid, zwave) {
    super();
    this.nodeid = nodeid;
    this.zwave = zwave;
  }

  publisHumidtyValueForMqtt(data) {
    this.publish(this.pub_topic + "/humidty", data.humidty); //TODO! needs fixing, dont know how data looks
  }

  _register() {
    var req_post = require('request-promise');

    req_post({
        method: 'POST',
        uri: 'http://localhost:3000/',
        body: {
          thingId: this.deviceUuid,
          description: "humdity device",
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
        logger.trace(parsedBody)
        // POST succeeded...
      })
      .catch(function (err) {
        logger.error(parsedBody);
        // POST failed...
      });
  }
}

module.exports = HumidtySensor;
