class Zwave_Device extends Device {
  _register(){
    var rp = require('request-promise');

rp({
    method: 'POST',
    uri: 'http://localhost:3000/',
    body: {
        val1 : 1,
        val2 : 2
    },
    json: true // Automatically stringifies the body to JSON
}).then(function (parsedBody) {
        console.log(parsedBody);
        // POST succeeded...
    })
    .catch(function (err) {
        console.log(parsedBody);
        // POST failed...
    });
  }
}