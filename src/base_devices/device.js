const ZWave = require('../node_modules/mqtt/mqtt.js');

class Device {

    constructor() {
        this.topicbase = "nexhome/";
        this.brokerUrl = "broker.lab.nexhome.ch";
        this.mqtt = require('mqtt');
        var options = {
            port: 1883,
            host: this.brokerUrl,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            username: 'superiot',
            password: 'xxxxxxxxxxxxxxxxxx',
            keepalive: 60,
            reconnectPeriod: 1000,
            protocolId: 'MQIsdp',
            protocolVersion: 3,
            clean: true,
            encoding: 'utf8'
        };
        this.mqttClient = this.mqtt.connect(this.brokerUrl);
        //Init Pub and Sub topic
        this.deviceUuid = ""; //TODO get some sort of id? maybe from zwave?
        this.pub_topic = this.topicbase + "data/" + this.deviceUuid;
        this.sub_topic = this.topicbase + "event/" + this.deviceUuid;

        this.mqttClient.on('connect', function () {
            console.log("Successfully connected");
        });
    }


    publish(topic, message) {
        this.mqttClient.publish(this.pub_topic, message, function (error, success) {
            if (error) {
                console.log(error);
                //TODO: ErrorHandling
            }
        });
    }

    subscribe(topic, onMsgFunc) {
        this.mqttClient.subscribe(this.sub_topic, function (error) {
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
