var mqtt = require('mqtt');
var LightMeterWidget = require('lightmeter').Widget;

var lightTopic = 'ciot/pinhole/light/value';

var lightMeter = new LightMeterWidget();

lightMeter.addLightingCondition({
  name: 'Sunny',
  exposure: {
    400: 1.3
  },
  colour: {
    start: '#f7ec86',
    stop : '#fdc753'
  },
  sensorRange: [0.6, 1]
});

lightMeter.addLightingCondition({
  name: 'Cloudy',
  exposure: {
    400: 180
  },
  colour: {
    start: '#27bbf4',
    stop : '#6340bc'
  },
  sensorRange: [0, 0.6]
});


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
