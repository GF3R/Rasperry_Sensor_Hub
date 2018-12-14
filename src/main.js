var DiscoveryStick = require("./zwave_devices/discovery_stick");
var discoveryStick = DiscoveryStick('/dev/serial/by-id/usb-0658_0200-if00');
var deviceList = [];

discoveryStick.addDeviceListener(function(nodeid, comclass, valueId){
  searchStr = valueId.split('-').splice(1).join('-')
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

discoveryStick.addValueListener(function(nodeid, comclass, data){
  if(searchStr[nodeid]){
    searchStr[nodeid].setValueForMqtt(data);
  }
});