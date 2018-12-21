const Log4js = require("log4js");
global.logger = Log4js.getLogger();
logger.level = 'trace';

const DiscoveryStick = require("./zwave_devices/discovery_stick.js");
const SwitchBinary = require("./zwave_devices/switch_binary.js");


var discoveryStick = new DiscoveryStick('/dev/serial/by-id/usb-0658_0200-if00');
var deviceList = [];


discoveryStick.addDeviceListener(function(nodeid, comclass, valueId){
  logger.trace("valued id is." + valueId.value_id)
  searchStr = (valueId.value_id+'').split('-').splice(1).join('-')
  switch(searchStr){
    case "37-1-0": 
      deviceList[nodeid] = new SwitchBinary(nodeid, discoveryStick.getZwave());
      break;
    case "case": 
      break;
    case "case": 
      break;
  }
});

discoveryStick.addValueListener(function(nodeid, comclass, valueId){
  logger.trace("valued changed " + valueId.value_id)
  searchStr = (valueId.value_id+'').split('-').splice(1).join('-')
  switch(searchStr){
    case "37-1-0": 
      deviceList[nodeid] = new SwitchBinary(nodeid, discoveryStick.getZwave());
      break;
    case "case": 
      break;
    case "case": 
      break;
  }
});
