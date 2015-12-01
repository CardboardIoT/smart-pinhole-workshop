**A [nodeschool][1] workshop to learn how smart (iot) things work.**

## General Prerequisites

* A working knowledge of JavaScript.
* No knowledge of hardware/Arduino is assumed.
* A Unix based environment - Mac OSX or a Linux flavour.
* Node.js v0.12. - you may have problems with v4 & native modules.

### Install & run

```shell
# Install
npm install -g smart-pinhole-workshop

# Run
smart-pinhole-workshop
```

## Overview

The mission is to create a smart [__Pinhole Camera__][4] while covering __core Internet of Things__ principles.

You can start hacking right away. **You dont need an Arduino or a Pinhole Camera**. The challenges can be completed in 1 - 2 hours. 

Also, when you have all the bits & bobs you don't have to hack the [__Pinhole Camera__][4] directly. The hardware can be placed alongside the camera. Enough to showcase what a smart camera can do.

As Cardboard IOT, we will be using this teaching format to bring you fun DIY smart product kits. [Register here to find out more](http://cardboardiot.com).

[Do let us know](mailto:hello@cardboardiot.com?subject=problems) if you're having any problems with the workshop. We really want to make this a pleasant learning experience.

### How smart?

Our objective is to detect the level of brighness in a space. Then use some basic calculations to tell a photographer how long the camera film should be exposed for.

### The end result

![Camera, arduino and lightmeter setup](docs/smart-pinhole-camera-setup.gif)

### How will it work?

We will sense brightness using [Johnny Five](http://johnny-five.io) and a cheap light sensor on the Arduino. Then publish that data over the internet and create a real time UI to showcase the optimal film exposure time for a photo.

![Sensors, messaging, user interface ](https://rawgit.com/CardboardIoT/smart-pinhole-workshop/master/docs/smart-pinhole-flow.svg)

**The workshop will pose a challenge, and test your solution.**

You can use your favourite text editor to create a solution.

Each of your solutions can be run directly as a `node` program like this:

[![Running the workshop](https://asciinema.org/a/7j43i5cvd3upi90aagharrfcz.png)](https://asciinema.org/a/7j43i5cvd3upi90aagharrfcz?autoplay=1&speed=1.5)

**Again, to start fast _NO_ Arduino OR Pinhole Camera is needed for this workshop.**

Sample data is pushed through the solution to simulate the experience.

But wire up an [Arduino UNO][2], connect the USB and you can see your solution run for real.

For the `Pinhole Camera`, [either make your own][3] or [get one from here][4].

## Exhaustive bill of materials

Here's the list of all the materials to run your solution 100% end to end.

- LED - http://node-ardx.org/electronics-primer#led [[buy][5]]
- Photoresistor - http://node-ardx.org/electronics-primer#photoresistor [[buy][6]]
- Resistor - http://node-ardx.org/electronics-primer#resistor [[buy][7]]
- Breadboard - http://node-ardx.org/electronics-primer#breadboard [[buy][8]]
- 3 Jump wires - https://en.wikipedia.org/wiki/Jump_wire [[buy][9]]
- [Arduino UNO][2] [[buy][10]]
- Pinhole Camera - [make one][3] / [[buy one][4]]

## Pre-requisites for the Arduino

### Flash your Arduino with Standard Firmata:

- Connect the Arduino UNO to your PC using the USB Cable
- Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
- Click the "Upload" button.
- The text "Done Uploading" will appear once the upload is complete.

### Having problems? Perhaps adjust one of the following.

* Select : Tools > Board and ensure that "Arduino UNO" is selected.
* Select : Tools > Serial Port and select another serial port.
   On a Mac the correct port may look like "/dev/tty.usbmodem:1411" or "/dev/cu.usbmodem:1411".
* Check the USB Cable is connected - consider also trying a different cable.
* You can also try pressing the Reset Button on the UNO.

They try the upload process one more time.

## Feedback

Again, we love feedback! [Let us know what you thought, good or bad](mailto:hello@cardboardiot.com?subject=Demo+workshop+feedback).

## Code style

To move towards a consistent style for nodeschool projects we use the .jshintrc
as defined in learnyounode: https://github.com/rvagg/learnyounode/blob/master/.jshintrc

Your favourite jshint runner will work. And, a gulpfile is provided.

```shell
npm install -g gulp
gulp
```


[1]: http://nodeschool.io/
[2]: https://www.arduino.cc/en/Main/ArduinoBoardUno
[3]: http://www.instructables.com/id/How-To-Make-A-Pinhole-Camera/
[4]: http://thepopuppinholecompany.com/viddy
[5]: https://www.adafruit.com/products/299
[6]: https://www.adafruit.com/products/161
[7]: http://www.amazon.com/E-Projects-10k-Resistors-Watt-Pieces/dp/B00BWYS9BA
[8]: https://www.adafruit.com/products/64
[9]: http://www.amazon.com/Breadboard-Jumper-Wire-75pcs-pack/dp/B0040DEI9M
[10]: https://www.adafruit.com/products/50
