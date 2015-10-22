A smart Pinhole Camera relies on sensors. This means we need to get comfortable with `Hardware`.

For this we'll use an `Arduino` and `johnny-five`.

`johnny-five` is an api for working with Arduino and other rapid prototyping boards.

For our Hardware `Hello World` lets blink an LED.

__Write a program that blinks an LED attached to pin 13 once every second.__

- When the board is ready, create a new `Led` instance.
- Pass a number to the `Led` constructor to tell it which pin to attach to.
- `Led` has a `strobe` method; it takes an interval in milliseconds.

## For this you will need

1. Get johnny-five from npm: `npm install johnny-five`

In this solution you will need to:

- `require` the `johnny-five` module
- Create a `new Board` instance
- Add a callback to the board's **ready** event
- Your solution goes inside that callback...

```js
  var five = require('johnny-five')
  var board = new five.Board()
  board.on('ready', function () {

    // Your solution here!

  })
```

## Circuit diagram

```
           LED     330
 Pin 13 o--->|----/\/\/----o GND
```

## Components

- LED - http://node-ardx.org/electronics-primer#led

> Emits light when a small current is passed through it (only in one direction).

## Docs

- Board - https://github.com/rwaldron/johnny-five/wiki/Board
- Led - https://github.com/rwaldron/johnny-five/wiki/Led#api

---
