class Device {
    topicbase = "nexhome/";

    constructor() {
        this.brokerUrl = "";
        this.mqtt = require('mqtt');
        this.mqttClient = this.mqtt.connect(this.brokerUrl);
        //Init Pub and Sub topic
        deviceUuid = ""; //TODO get some sort of id? maybe from zwave?
        pub_topic = topicbase + "data/" + this.deviceUuid;
        sub_topic = topicbase + "event/" + this.deviceUuid;

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