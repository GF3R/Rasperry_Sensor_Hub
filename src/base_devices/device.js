class Device {

    constructor() {
        this.topicbase = "nexhome/";
        this.brokerUrl = "";
        this.mqtt = require('mqtt');
        this.mqttClient = this.mqtt.connect(this.brokerUrl);
        //Init Pub and Sub topic
        this.deviceUuid = ""; //TODO get some sort of id? maybe from zwave?
        this.pub_topic = this.topicbase + "data/" + this.deviceUuid;
        this.sub_topic = this.topicbase + "event/" + this.deviceUuid;

        client.on('connect', function () {
            console.log("Successfully connected");
        });
    }


    publish(topic, message) {
        this.mqttClient.publish(topic, message, function (error, success) {
            if (error) {
                console.log(error);
                //TODO: ErrorHandling
            }
        });
    }

    subscribe(topic, onMsgFunc) {
        this.mqttClient.subscribe(topic, function (error) {
            if (error) {
                console.log(error);
                //TODO: ErrorHandling
            }
        });

        this.mqttClient.on('message', function (topic, message) {
            onMsgFunc(message);
        });
    }



}

module.exports = Device;