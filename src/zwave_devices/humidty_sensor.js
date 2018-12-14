class HumidtySensor extends Zwave_Device {
  
  constructor(nodeid, zwave) {
    this.nodeid = nodeid;
    this.zwave = zwave;
  }

  publisHumidtyValueForMqtt(data) {
    this.publish(this.pub_topic+"/humidty", data.humidty); //TODO! needs fixing, dont know how data looks
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
          data: [
            {
              name: "humidity",
              valueType: "double",
              valueUnit: "percent"
            }
          ]
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