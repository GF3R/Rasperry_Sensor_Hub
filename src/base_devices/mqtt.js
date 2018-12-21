const mqtt = require('mqtt');

class MqttClient {

  constructor() {
    logger.trace("constructing device");
    this.brokerUrl = 'mqtts://broker.lab.nexhome.ch';
    var options = {
      port: 8883,
      host: 'broker.lab.nexhome.ch',
      clientId: 'iaaaaamAtESTdEVI8CE',
      username: 'superiot',
      password: 'SMARTmeKANU123',
      protocol: 'mqtts'

    };

    this.mqttClient = mqtt.connect(this.brokerUrl, options);

    this.mqttClient.on('error', function (err) {
      logger.error(err);
    });

    this.mqttClient.on('connect', function () {
      logger.debug("Successfully connected")
    });
  }

  getMqttClient(){
    return this.mqttClient;
  }

}

module.exports = MqttClient;