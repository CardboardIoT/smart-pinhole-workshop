Now that our light sensor is publishing values via MQTT, we can set up a user interface to subscribe to those readings.

MQTT clients can also publish and subscribe via WebSockets which makes it easy to make real-time interfaces that run in a web browser.

Our MQTT client library also runs in the browser so we can use a lot of the same code.

__Write some browser code that subscribes to our MQTT photoresistor readings.__

* Connect to the `test.mosquitto.org` MQTT broker
* Use the WebSocket port (8080) and the 'ws' protocol
* Subscribe to readings on the **ciot/pinhole/light/value** MQTT topic
* Log the readings via `console.log`

Running the solution will start a local server that you can open in your browser. Your code will be injected into the application. Reloading the page will load the latest version of your code.

## For this you will need

In this solution you will need to:

- `require` the `mqtt` module
- Use `mqtt.connect({..})` to connect to an MQTT server
- Add callbacks to the client's **connect** & **message** events
- Your solution goes inside the callbacks...

```js
  var mqtt = require('mqtt');
  var client  = mqtt.connect({
    //host and port config here
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
