const Log4js = require("log4js");
global.logger = Log4js.getLogger();
logger.level = 'trace';

const DiscoveryStick = require("./zwave_devices/discovery_stick.js");
const SwitchBinary = require("./zwave_devices/switch_binary.js");
const HumiditySensor = require("./zwave_devices/humidty_sensor.js");
const MqttClient = require("./base_devices/mqtt.js");


var discoveryStick = new DiscoveryStick('/dev/serial/by-id/usb-0658_0200-if00');
var deviceList = [];

global.mqttClient = new MqttClient().getMqttClient();

discoveryStick.addDeviceListener(function (nodeid, comclass, valueId) {
  logger.trace("Node valued id is." + valueId.value_id)
  searchStr = (valueId.value_id + '').split('-').splice(1).join('-')
  switch (searchStr) {
    case "37-1-0":
      deviceList[nodeid] = new SwitchBinary(nodeid, discoveryStick.getZwave());
      break;
    case "132-1-0":
      //132 is Class for devices that are in sleep mode 
      //Needs to be changed!!!!
      deviceList[nodeid] = new HumiditySensor(nodeid, discoveryStick.getZwave());
      break;
  }
});

discoveryStick.addValueListener(function (nodeid, comclass, value) {
  logger.trace("valued changed " + value.value_id)
  searchStr = (value.value_id + '').split('-').splice(1).join('-')
  switch (searchStr) {
    //Humitity
    case "49-1-5":
      deviceList[nodeid].publishValue(value['value']);
      break;
      //Temperature
    case "49-1-1":
      deviceList[nodeid].publishValue(value['value']);
    case "case":
      break;
  }
});