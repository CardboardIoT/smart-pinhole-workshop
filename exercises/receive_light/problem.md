Now that our light sensor is publishing values via MQTT, we can set up a user interface to subscribe to those readings.

MQTT brokers and clients can also publish and subscribe via WebSockets which makes it easy to make real-time interfaces that run in a web browser.

Our MQTT client library also runs in the browser so we can use a lot of the same code.

We've already created a browser widget for you called LightMeter that you can include into the page using Browserify. This lets you use the familiar `require('module-name')` style of calls from node.js, but in the browser.

__Write some browser code that subscribes to our MQTT photoresistor readings and sets the widget's light level.__

* Connect to the `test.mosquitto.org` MQTT broker
* Use the WebSocket port (8080) and the 'ws' protocol
* Subscribe to readings on the **ciot/pinhole/light/value** MQTT topic

## Running the solution

Use `lightmeter --port 11686 program.js` to start a local server that you can open in your browser. Your browser code will be injected into the application so you can view it.

Reloading the page will load the latest version of your code.

## For this you will need

In this solution you will need to:

- Install the `lightmeter` npm module: `npm install cardboardiot/lightmeter`
- `require` the `mqtt` module and `lightmeter` modules
- Use `mqtt.connect({..})` to connect to an MQTT server
- Add callbacks to the client's **connect** & **message** events
- Instantiate the LightMeterWidget
- Pass the light level reading using the widget's `setLightLevel()` method
- Your solution goes inside the callbacks...

```js
  var mqtt = require('mqtt');
  var LightMeterWidget = require('lightmeter').Widget;

  var lightMeter = new LightMeterWidget();

  var client  = mqtt.connect({
    //host, port and protocol config here
  });

  client.on('connect', function () {
    // Your solution here!
  });

  client.on('message', function (topic, payload) {
    // Your solution here!
  });
```

## Docs

- MQTT - https://github.com/mqttjs/MQTT.js
- Subscribe - https://github.com/mqttjs/MQTT.js#subscribe
- Events - connect - https://github.com/mqttjs/MQTT.js#event-connect
- Events - message - https://github.com/mqttjs/MQTT.js#event-message
