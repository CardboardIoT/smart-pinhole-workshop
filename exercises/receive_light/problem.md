YES! We sense and emit light readings.

The readings will help us take better pictures. But we need to know what they are.

Let's create a `LightMeter UI` to view our readings in real time.

`LightMeter` is a web UI widget. It visualizes light readings.

This solution will run in the browser. So, we'll use `web sockets` to connect to the `MQTT` broker.

__Write a program to visualize our photoresistor readings.__

- Connect to the `test.mosquitto.org` MQTT broker
- Use the WebSocket port (8080) and the 'ws' protocol
- Subscribe to the **ciot/pinhole/<your-id>/light/value** MQTT topic
- Create a new `LightMeterWidget` instance.
- Set the `LightMeterWidget`'s light level every time a message is received.

## Unique ID for topic

As before, set an ID in the MQTT topic that's unique to your light sensor.

**Make sure you use the same ID as before!**

Set **ID=<(twitter-handle)>** when you run your program. Read `ID` in your program using `process.env.ID`.

## For this you will need

1. Get lightmeter from npm: `npm install -g lightmeter`

In this solution you will need to:

- `require` the `lightmeter` module
- Instantiate a `LightMeter.Widget`
- `LightMeter.setLightLevel` when a message arrives on the `mqtt` connection.

## Docs

- MQTT - https://github.com/mqttjs/MQTT.js
- Subscribe - https://github.com/mqttjs/MQTT.js#subscribe
- Events - connect - https://github.com/mqttjs/MQTT.js#event-connect
- Events - message - https://github.com/mqttjs/MQTT.js#event-message
