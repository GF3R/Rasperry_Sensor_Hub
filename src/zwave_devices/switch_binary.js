var ZWave = require('../node_modules/openzwave-shared/lib/openzwave-shared.js');
var zwave = new ZWave({ConsoleOutput: false});
var driverPath = '/dev/serial/by-id/usb-0658_0200-if00';

zwave.on('notification', function(nodeid, notif) {
	console.log('message %d for node %d', notif, nodeid);
});

zwave.on('node added', function(nodeid) {
  nodes[nodeid] = {
    manufacturer: '',
    manufacturerid: '',
    product: '',
    producttype: '',
    productid: '',
    type: '',
    name: '',
    loc: '',
    classes: {},
    ready: false,
  };
});

zwave.on('node event', function(nodeid, data) {
  console.log('node%d event: Basic set %d', nodeid, data);
});

zwave.on('value added', function(nodeid, comclass, value) {
  if (!nodes[nodeid]['classes'][comclass])
    nodes[nodeid]['classes'][comclass] = {};
  nodes[nodeid]['classes'][comclass][value.index] = value;
});

zwave.on('value changed', function(nodeid, comclass, value) {
  if (nodes[nodeid]['ready']) {
    console.log('node%d: changed: %d:%s:%s->%s', nodeid, comclass,
      value['label'],
      nodes[nodeid]['classes'][comclass][value.index]['value'],
      value['value']);
  }
  nodes[nodeid]['classes'][comclass][value.index] = value;
});

zwave.on('value removed', function(nodeid, comclass, index) {
  if (nodes[nodeid]['classes'][comclass] &&
    nodes[nodeid]['classes'][comclass][index])
    delete nodes[nodeid]['classes'][comclass][index];
});

zwave.on('node ready', function(nodeid, nodeinfo) {
  nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
  nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
  nodes[nodeid]['product'] = nodeinfo.product;
  nodes[nodeid]['producttype'] = nodeinfo.producttype;
  nodes[nodeid]['productid'] = nodeinfo.productid;
  nodes[nodeid]['type'] = nodeinfo.type;
  nodes[nodeid]['name'] = nodeinfo.name;
  nodes[nodeid]['loc'] = nodeinfo.loc;
  nodes[nodeid]['ready'] = true;
  console.log('node%d: %s, %s', nodeid,
    nodeinfo.manufacturer ? nodeinfo.manufacturer : 'id=' + nodeinfo.manufacturerid,
    nodeinfo.product ? nodeinfo.product : 'product=' + nodeinfo.productid +
    ', type=' + nodeinfo.producttype);
  console.log('node%d: name="%s", type="%s", location="%s"', nodeid,
    nodeinfo.name,
    nodeinfo.type,
    nodeinfo.loc);
  for (comclass in nodes[nodeid]['classes']) {
    switch (comclass) {
      case 0x25: // COMMAND_CLASS_SWITCH_BINARY
      case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
        zwave.enablePoll(nodeid, comclass);
        break;
    }
    var values = nodes[nodeid]['classes'][comclass];
    console.log('node%d: class %d', nodeid, comclass);
    for (idx in values)
      console.log('node%d:   %s=%s', nodeid, values[idx]['label'], values[
        idx]['value']);
  }
});

zwave.connect(driverPath);
console.log("connected");
zwave.setValue(2,37,1,0,true);
