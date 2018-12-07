class Device   {

    constructor() {
        this.mqtt = require('mqtt');
        this.mqttClient = this.mqtt.connect('url to broker');

        client.on('connect', function() {
            console.log("Successfully connected");
        });
    }


    publish(topic, message) {
        this.mqttClient.publish(topic, message, function(error, success) {
                if(error) {
                    console.log(error);
                    //TODO: ErrorHandling
                }
        });
    }

    subscribe(topic, onMsgFunc) {
        this.mqttClient.subscribe(topic, function(error) {
            if(error) {
                console.log(error);
                  //TODO: ErrorHandling
            }
        });

        this.mqttClient.on('message', function(topic, message) {
            onMsgFunc(message);
        });
    }



}

 
