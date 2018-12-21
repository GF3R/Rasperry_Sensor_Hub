const ZWave = require('../node_modules/openzwave-shared/lib/openzwave-shared.js');
const Log4js = require("log4js");
const logger = Log4js.getLogger();


class DiscoveryStick {
  constructor(path) {
    logger.trace("initializing DiscoveryStick");
    var driverPath = path;
    this.zwave = new ZWave({
      ConsoleOutput: false
    });
    this.zwave.connect(driverPath);
  }

  getZwave() {
    return this.zwave;
  }

  addDeviceListener(listener){
   this.zwave.on('value added', listener);
  }

  addValueListener(listener){
    this.zwave.on('value changend', listener);
  }

}

module.exports = DiscoveryStick;
