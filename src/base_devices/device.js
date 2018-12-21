const mqtt = require('mqtt');

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
            password: 'SMARTmeKANU123',
	    protocol: 'mqtts'
        };
       //this.mqttClient = mqtt.connect(this.brokerUrl, options);
        //Init Pub and Sub topic
        this.deviceUuid = deviceUuid; //TODO get some sort of id? maybe from zwave?
        this.pub_topic = this.topicbase + "data/" + this.deviceUuid;
        this.sub_topic = this.topicbase + "event/" + this.deviceUuid;
	/*this.mqttClient.on('error', function (err) {
		logger.error(err);
	});

        this.mqttClient.on('connect', function () {
            logger.debug("Successfully connected")
        });*/
    }


    publish(topic, message) {
        this.mqttClient.publish(this.pub_topic, message, function (error, success) {
            if (error) {
                logger.error(error);
                //TODO: ErrorHandling
            }
        });
    }

    subscribe(topic, onMsgFunc) {
        this.mqttClient.subscribe(this.sub_topic, function (error) {
            if (error) {
                logger.error(error);
                //TODO: ErrorHandling
            }
        });

        this.mqttClient.on('message', function (topic, message) {
            onMsgFunc(message);
        });
    }



}

module.exports = Device;
