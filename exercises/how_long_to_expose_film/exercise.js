var proxyquire = require('proxyquire')
var lodash = require('lodash')
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

// Serve UI
exercise.addProcessor(serveUi)

// this actually runs the solution
exercise.addProcessor(function (mode, callback) {
  // includes the solution to run it
  proxyquire(path.join(process.cwd(), exercise.args[0]), {
    'mqtt': mqtt,
    'lightmeter': lightmeter
  });

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

    // mqtt client was connected
    expect(mqtt.connect, 'no mqtt connection').to.be.called;

    // mqtt client was connected to correct server
    var connect0 = mqtt.connect.getCall(0);
    expect(connect0.args[0].host, 'mqtt connection to wrong host').to.equal('test.mosquitto.org')
    expect(connect0.args[0].port, 'mqtt connection to wrong port').to.equal('8080')
    expect(connect0.args[0].protocol, 'mqtt connection using wrong protocol').to.equal('ws')

    // client listens to two events
    var client = mqtt.clients[0];
    expect(client.on.calledTwice, 'client does not listen to connect and message events').to.be.true;

    // Fire fake 'connect' event
    client.emit('connect');

    var onConnect = client.on.getCall(0);
    var onMessage = client.on.getCall(client.on.callCount - 1);
    var subscribe0 = client.subscribe.getCall(0);

    expect(client.publish.called, 'client should not call publish').to.be.false
    expect(client.end.called, 'client should not call end').to.be.false

    // client listens to connect event
    expect(onConnect.args[0], 'client does not listen to connect event').to.equal('connect')

    // client listens to message event
    expect(onMessage.args[0], 'client does not listen to message event').to.equal('message')

    // client subscribes and publishes only after connecting
    expect(onConnect.calledBefore(subscribe0), 'client unexpectedly subscribed before connecting').to.be.true

    // client subscribes to 'ciot/pinhole/light/value' topic
    expect(subscribe0.args[0], 'client does not subscibe to correct topic').to.equal('ciot/pinhole/light/value')

    expect(lightmeter.instances.length, 'expected 1 widget instance').to.equal(1);

    // emit some example messages
    client.emit('message', 'ciot/pinhole/light/value', new Buffer('0.5'))
    client.emit('message', 'ciot/pinhole/light/value', new Buffer('0.9'))

    expect(lightmeter.instances[0].setLightLevel.called, 'setLightLevel should be called').to.be.true;

    var setLightLevelCall0 = lightmeter.instances[0].setLightLevel.getCall(0);
    expect(setLightLevelCall0.args[0], 'wrong argument value').to.equal('0.5');

    var setLightLevelCall1 = lightmeter.instances[0].setLightLevel.getCall(1);
    expect(setLightLevelCall1.args[0], 'wrong argument value').to.equal('0.9');

    // Check conditions
    var conditions = lightmeter.instances[0]._conditions;

    var sunny = lodash.find(conditions, { name: 'Direct sun' });
    expect(sunny, 'a condition called "Direct sun" was not added').to.exist;
    expect(sunny.exposure, 'Direct sun exposure object not found').to.exist;
    expect(sunny.exposure['400'], 'Direct sun exposure value not correct').to.equal(1.3);
    expect(sunny.sensorRange, 'Direct sun sensorRange values not correct').to.deep.equal([0.6, 1]);

    var indoors = lodash.find(conditions, { name: 'Indoors' });
    expect(indoors, 'a condition called "Indoors" was not added').to.exist;
    expect(indoors.exposure, 'indoors exposure object not found').to.exist;
    expect(indoors.exposure['400'], 'indoors exposure value not correct').to.equal(180);
    expect(indoors.sensorRange, 'indoors sensorRange values not correct').to.deep.equal([0, 0.6]);

    broadcaster(exercise)(function (er) { notifier(exercise)(er, callback) })
  } catch(error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

module.exports = exercise
