var proxyquire = require('proxyquire')
var five = require('../../stubs/five')
var expect = require('chai').expect

var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var path = require('path')

var notifier = require('../../lib/notifier')
var broadcaster = require('../../lib/broadcaster')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {
  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'johnny-five': five.spyOn('Led')})

  setTimeout(function() {
    console.log('Please wait while your solution is tested...')
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 4000)
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  try {
    var io = five.stubs.firmata.singleton

    expect(io, 'no board instance created').to.exist

    var led = five.Led.instances[0]

    expect(led, 'no led instance created').to.exist

    expect(led.pin, 'led expected to be connected to pin 13').to.equal(13)

    if (!led.strobe.called && !led.blink.called) {
      expect(led.strobe.called, 'led.strobe was not called').to.be.true
    }

    if (led.blink.called) {
      expect(led.blink.getCall(0).args[0], 'led.blink was not called with 1000').to.equal(1000)
    } else {
      expect(led.strobe.getCall(0).args[0], 'led.strobe was not called with 1000').to.equal(1000)
    }

    // should have set pin 13 into digital output mode
    expect(io.pinMode.calledWith(13, io.MODES.OUTPUT)).to.be.true

    // should have turned pin 13 on and off
    expect(io.digitalWrite.calledWith(13, io.HIGH)).to.be.true
    expect(io.digitalWrite.calledWith(13, io.LOW)).to.be.true

    broadcaster(exercise)(function (er) { notifier(exercise)(er, callback) })
  } catch(error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

module.exports = exercise
