var proxyquire = require('proxyquire')
var mqtt = require('../../stubs/mqtt')
var five = require('../../stubs/five')

var expect = require('chai').expect
var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var path = require('path')

var notifier = require('../../lib/notifier')
var broadcaster = require('../../lib/broadcaster')

// checks that the submission file actually exists
exercise = filecheck(exercise)

var topicId = 'unique-id-' + Math.round(Math.random() * 100000),
    mqttTopicWithId = 'ciot/pinhole/' + topicId + '/light/value';

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {

  // Inject ID into subsmission
  process.env.ID = topicId;

  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {
    'mqtt': mqtt,
    'johnny-five': five.spyOn('Sensor')
  })

  setTimeout(function() {
    console.log('Please wait while your solution is tested...')
  }, 1000)

  // need a better way of detecting when we are done..
  setTimeout(function() {
    callback(null)
  }, 2000)
})

// add a processor only for 'verify' calls
exercise.addVerifyProcessor(function (callback) {
  try {

    // mqtt client was connected
    expect(mqtt.connect, 'no mqtt connection').to.be.called;

    // mqtt client was connected to correct server
    var connect0 = mqtt.connect.getCall(0);
    expect(connect0.args[0].host, 'mqtt connection to wrong host').to.equal('test.mosquitto.org')
    expect(connect0.args[0].port, 'mqtt connection to wrong port').to.equal('1883')

    // Board was created
    var io = five.stubs.firmata.singleton
    expect(io, 'no board instance created').to.exist

    // Get the listener that is listening for reads on pin A0
    var analogReadListener = null

    for (var i = 0; i < io.analogRead.callCount; i++) {
      var call = io.analogRead.getCall(i)
      if (call.args[0] === 0) {
        analogReadListener = call.args[1]
        break
      }
    }

    expect(analogReadListener, 'No values were read from A0').to.not.be.null

    var sensor = five.Sensor.instances[0]

    // User may have set a high value for analog noise filtering
    var freq = sensor ? sensor.freq : 100

    // Ensure frequency has been set at 250 ms
    expect(freq, 'sensor frequency was not set correctly').to.be.equal(250)

    // Ensure light sensor readings are scaled between 0 - 1
    expect(sensor.scale.calledWith(0, 1), 'sensor readings need to be scaled between 0 - 1').to.be.true

    //send random data to sensor
    analogReadListener(random(600, 900))

    setTimeout(function () {
      try {

        // client listens to two events
        var mqttClient = mqtt.clients[0];
        var publish0 = mqttClient.publish.getCall(0);

        expect(publish0.args[0], 'mqtt client does not publish to correct topic').to.equal(mqttTopicWithId)
        expect(publish0.args[1], 'mqtt client does not publish to correct payload').to.not.be.null
        expect(publish0.args[2], 'mqtt client does not indicate reading is retained').to.not.be.null

      } catch (err) {
        broadcaster(exercise)(err, function (er) {
          notifier(exercise)(er, callback);
        })
      }
    }, freq)

    broadcaster(exercise)(function (er) { notifier(exercise)(er, callback) })
  } catch (error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

function random (min, max) {
  return Math.random() * (max - min + 1) + min
}

module.exports = exercise
