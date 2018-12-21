class Device {

    constructor(deviceUuid) {
        logger.trace("constructing device");
        //Init Pub and Sub topic
        this.topicbase = "nexhome/";
        this.deviceUuid = "87bcf1d5-968e-44c9-a536-896b3f792b4" + deviceUuid; //TODO get some sort of id? maybe from zwave?
        this.pub_topic = this.topicbase + "data/" + this.deviceUuid;
        this.sub_topic = this.topicbase + "event/" + this.deviceUuid;
    }


    publish(topic, message) {
        mqttClient.publish(topic, message, function (error, success) {
            if (error) {
                logger.error(error);
                //TODO: ErrorHandling
            }
        });
    }

    subscribe(topic, onMsgFunc) {
        mqttClient.subscribe(topic, function (error) {
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