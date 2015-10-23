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

var lightmeter = require('lightmeter')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// set up the data file to be passed to the submission
exercise.addSetup(function (mode, callback) {
  process.nextTick(callback);
});

// Run a webserver with the submission so user
// can view it
exercise.addProcessor(serveUi);

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {
  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'mqtt': mqtt, 'lightmeter': lightmeter })

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
    var setLightLevelCall0 = lightmeter.Widget.prototype.setLightLevel.getCall(0);
    // widget was called with lightlevel
    expect(setLightLevelCall0.args[0], 'wrong argument value').to.equal(0.5);
  } catch(error) {

  }
})

module.exports = exercise
