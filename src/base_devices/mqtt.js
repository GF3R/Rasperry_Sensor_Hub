const mqtt = require('mqtt');

class MqttClient {

  constructor() {
    logger.trace("constructing device");
    this.topicbase = "nexhome/";
    this.brokerUrl = 'mqtts://broker.lab.nexhome.ch';
    var options = {
      port: 8883,
      host: 'broker.lab.nexhome.ch',
      clientId: 'iaaaaamAtESTdEVI8CE',
      username: 'superiot',
      password: 'SMARTmeKANU123',
      protocol: 'mqtts'

    };

    var mqttClient = mqtt.connect(this.brokerUrl, options);

    mqttClient.on('error', function (err) {
      logger.error(err);
    });

    mqttClient.on('connect', function () {
      logger.debug("Successfully connected")
    });
  }

}

module.exports = MqttClient;