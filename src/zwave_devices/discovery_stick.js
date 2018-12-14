class DiscoveryStick {
  constructor(path) {
    var driverPath = path;
    var ZWave = require(path);
    var zwave = new ZWave({
      ConsoleOutput: false
    });
    zwave.connect(driverPath);
  }

  getZwave() {
    return zwave;
  }

  addDeviceListener(listener){
    zwave.on('value added', listener);
  }

  addValueListener(listener){
    zwave.on('value changend', listener);
  }

}