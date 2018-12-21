const Device = require("../base_devices/device.js");

class ZwaveDevice extends Device {
  constructor(deviceUuid){
    super(deviceUuid);
  }
}


module.exports = ZwaveDevice;