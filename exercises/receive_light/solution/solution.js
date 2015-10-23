var mqtt = require('mqtt');
var LightMeterWidget = require('lightmeter').Widget;

var lightTopic = 'ciot/pinhole/light/value';

var lightMeter = new LightMeterWidget();

var client  = mqtt.connect({
  protocol: 'ws',
  host: 'test.mosquitto.org',
  port: '8080' // WebSocket port
});

client.on('connect', function () {
  client.subscribe(lightTopic);
});

client.on('message', function (topic, payload) {
  var message = payload.toString();
  if (topic === lightTopic) {
    lightMeter.setLightLevel(message);
  }
});
