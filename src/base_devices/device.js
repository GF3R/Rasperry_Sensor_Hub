const mqtt = require('mqtt');
var mqttClient;
class Device {

    constructor(deviceUuid) {
        logger.trace("constructing device");
        this.topicbase = "nexhome/";
        this.brokerUrl = 'mqtts://broker.lab.nexhome.ch';
        var options = {
            port: 8883,
            host: 'broker.lab.nexhome.ch',
            clientId: 'iaaaaamAtESTdEVI8CE',
            username: 'superiot',
            password: '***',
            protocol: 'mqtts'
        };
        if (!mqttClient) {
            mqttClient = mqtt.connect(this.brokerUrl, options);
        }
        //Init Pub and Sub topic
        this.deviceUuid = deviceUuid; //TODO get some sort of id? maybe from zwave?
        this.pub_topic = this.topicbase + "data/" + this.deviceUuid;
        this.sub_topic = this.topicbase + "event/" + this.deviceUuid;
        mqttClient.on('error', function (err) {
            logger.error(err);
        });

        mqttClient.on('connect', function () {
            logger.debug("Successfully connected")
        });
    }


    publish(topic, message) {
        mqttClient.publish(this.pub_topic, message, function (error, success) {
            if (error) {
                logger.error(error);
                //TODO: ErrorHandling
            }
        });
    }

    subscribe(topic, onMsgFunc) {
        mqttClient.subscribe(this.sub_topic, function (error) {
            if (error) {
                logger.error(error);
                //TODO: ErrorHandling
            }
        });

        mqttClient.on('message', function (topic, message) {
            onMsgFunc(message);
        });
    }



}

module.exports = Device;