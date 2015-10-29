**A [nodeschool][1] type workshop to create an IoT Smart Pinhole Camera**

```shell
# Install
npm install -g smart-pinhole-workshop
# Run
smart-pinhole-workshop
```

Learn __core Internet of Things__ principles by hacking a [__Pinhole Camera__](https://en.wikipedia.org/wiki/Pinhole_camera).

Our Camera will sense brightness. And, inform us of the optimal film exposure time for a photo.

**The workshop will pose a challenge, and test your solution.**

Each of your solutions can be run directly as a `node` program.

**To start fast, _NO_ Arduino OR Pinhole Camera is needed for this workshop.**

But wire up an [Arduino UNO][2], connect the USB and you can see your solution run for real.

For the `Pinhole Camera`, [either make your own]() or [get one from here][3].

## Exhaustive bill of materials

Here's the list of all the materials to run your solution 100% end to end.

- LED - http://node-ardx.org/electronics-primer#led
- Photoresistor - http://node-ardx.org/electronics-primer#photoresistor
- Resistor - ...
- Breadboard
- 3 Jump wires
- Arduino UNO
- Pinhole Camera (make one / buy one)

## Pre-requisites for the Arduino

Tested with node.js v0.12. You may have problems with v4 and native modules.

### Flash your Arduino with Standard Firmata:

1 - Connect the Arduino UNO to your PC using the USB Cable
2 - Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
3 - Click the "Upload" button.
4 - The text "Done Uploading" will appear once the upload is complete.

### Having problems? Perhaps adjust one of the following.

* Select : Tools > Board and ensure that "Arduino UNO" is selected.
* Select : Tools > Serial Port and select another serial port.
    ** On a Mac the correct port may look like "/dev/tty.usbmodem:1411" or "/dev/cu.usbmodem:1411".
* Check the USB Cable is connected - consider also trying a different cable.
* You can also try pressing the Reset Button on the UNO.

They try the upload process one more time.

## What the solution looks like

Pictures of the setup.

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
[3]: http://thepopuppinholecompany.com/viddy