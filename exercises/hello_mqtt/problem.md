# Welcome to the smart-pinhole-workshop

Let's learn ```core Internet of Things``` principles by hacking a ```Pinhole Camera```.

Our Camera will sense brightness. And, inform us of the optimal film exposure time for a photo.

**The workshop will pose a challenge, and test your solution.**

Each of your solutions will be run directly as a `node` program or loaded into a browser.

-------------------------------------------------------------------------------

# Hello MQTT >> IOT Messaging...

MQTT (MQ Telemetry Transport) is a publish/subscribe messaging protocol.

Useful for constrained devices and low-bandwidth, high-latency or unreliable networks.

It has a small footprint. It is quickly becoming the de-facto IoT messaging standard.

**Write a program to subscribe and publish to an MQTT topic**

- Connect an MQTT client to `host: 'test.mosquitto.org'`, and `port: 1883`.
- On connect, use the client's `subscribe` method to subscribe to `Topic: ciot/hello/world`.
- On connect, use the client's `publish` method to publish `Hello mqtt` to `Topic: ciot/hello/world`.
- Listen to incoming messages.
- Quit session after a message is received using the clients `end` method.

## For this you will need

1. A directory for your answers.
2. Get mqtt from npm: `npm install mqtt`
3. Add a file for your solution (e.g. answers/01-hello-mqtt.js)

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
- Publish - https://github.com/mqttjs/MQTT.js#publish
- Subscribe - https://github.com/mqttjs/MQTT.js#subscribe
- End - https://github.com/mqttjs/MQTT.js#end
- Events - connect - https://github.com/mqttjs/MQTT.js#event-connect
- Events - message - https://github.com/mqttjs/MQTT.js#event-message

---
