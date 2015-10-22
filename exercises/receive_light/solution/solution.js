var mqtt = require('mqtt');
var lightTopic = 'ciot/lightmeter/value';

var client  = mqtt.connect({
  host: 'test.mosquitto.org',
  port: '8080' // WebSocket port
});

client.on('connect', function () {
  client.subscribe(lightTopic);
});

client.on('message', function (topic, payload) {
  var message = payload.toString();
  if (topic === lightTopic) {
    console.log(message);
  }
});
