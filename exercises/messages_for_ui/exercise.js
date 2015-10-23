var proxyquire = require('proxyquire')
var mqtt = require('../../stubs/mqtt')
var lightmeter = require('../../stubs/lightmeter')

var expect = require('chai').expect
var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var path = require('path')

var notifier = require('../../lib/notifier')
var broadcaster = require('../../lib/broadcaster')
var serveUi = require('../../lib/serve-ui')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// Run a webserver with the submission so user
// can view it
exercise.addProcessor(serveUi);

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {
  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {
    lightmeter: lightmeter
  })

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

    expect(lightmeter.instances.length, 'expected 1 widget instance').to.equal(1);

    expect(lightmeter.instances[0].setLightLevel.called, 'setLightLevel should be called').to.be.true;

    var setLightLevelCall0 = lightmeter.instances[0].setLightLevel.getCall(0);
    expect(setLightLevelCall0.args[0], 'wrong argument value').to.equal(0.5);

    broadcaster(exercise)(function (er) { notifier(exercise)(er, callback) })
  } catch(error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

module.exports = exercise
