Our camera is smarter because it measures light levels in a space.

Let's learn to measure and publish light sensor readings.

We will use our newly acquired `MQTT` & `johnny-five` skills.

__Write a program that measures and publishes photoresistor readings.__

- Use a photoresistor
- Connect the photoresistor to **A0**
- Ensure we get sensor readings every 250 ms
- Readings should be scaled between 0 and 1
- Connect an MQTT client to `host: test.mosquitto.org`, and `port: 1883`
- Publish photoresistor readings on the **ciot/pinhole/<id>/light/value** MQTT topic
- Ensure published readings are retained for guaranteed pick up

## Unique ID for topic

The ID in the MQTT topic should be unique to your light sensor otherwise you could overwrite others' values.

Make sure you set an environment variable of ID=<yourname> when you run your program and when you verify:

    ID=<your-id> smart-pinhole-workshop verify program.js

And:

    ID=<your-id> node program.js

You can read this id in your program using `process.env.ID`.

## Schematic

- Sensor - Photoresistor - https://github.com/rwaldron/johnny-five/blob/master/docs/photoresistor.md

## Components

- Photoresistor - http://node-ardx.org/electronics-primer#photoresistor

> Produces a variable resistance dependant on the amount of incident light.

## Docs

- Board - https://github.com/rwaldron/johnny-five/wiki/Board
- Sensor - https://github.com/rwaldron/johnny-five/wiki/Sensor#usage

## Hints

`johnny-five` has a generic Sensor object for handling various analog inputs.
It fires a data event with the current reading of the sensor.
The sensor value is available to the callback as `this.value`

---
