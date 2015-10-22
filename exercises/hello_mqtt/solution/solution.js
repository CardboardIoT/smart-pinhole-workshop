var mqtt = require('mqtt');
var helloTopic = 'ciot/hello/world';

var client  = mqtt.connect({
  host: 'test.mosquitto.org',
  port: '1883'
});

client.on('connect', function () {
  client.subscribe(helloTopic);
  client.publish(helloTopic, 'Hello mqtt');
});

client.on('message', function (topic, payload) {
  var message = payload.toString();
  console.log('Incoming message[' + message + ']');
  client.end();
});