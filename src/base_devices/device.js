class Device {

    constructor(deviceUuid) {
        logger.trace("constructing device");
        //Init Pub and Sub topic
        this.deviceUuid = deviceUuid; //TODO get some sort of id? maybe from zwave?
        this.pub_topic = this.topicbase + "data/" + this.deviceUuid;
        this.sub_topic = this.topicbase + "event/" + this.deviceUuid;
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