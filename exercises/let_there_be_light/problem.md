Our camera is smarter because it measures light levels in a space.

Let's learn to measure and publish light sensor readings.

We will use our newly acquired `MQTT` & `johnny-five` skills.

__Write a program that measures and publishes photoresistor readings.__

* Use a photoresistor
* Connect the photoresistor to **A0** 
* Ensure we get sensor readings every 250 ms
* Readings should be scaled between 0 and 1
* Publish photoresistor readings on the **ciot/pinhole/light/value** MQTT topic
* Ensure published readings are retained for guaranteed pick up

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