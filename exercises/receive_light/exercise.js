var proxyquire = require('proxyquire')
var mqtt = require('../../stubs/mqtt')

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
  proxyquire(path.join(process.cwd(), exercise.args[0]), {'mqtt': mqtt})

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
    expect(connect0.args[0].port, 'mqtt connection to wrong port').to.equal(8080)
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

    // emit some example messages
    // TODO: Validate that the correct values are emitted to console.log
    client.emit('message', 'ciot/pinhole/light/value', new Buffer('50'))
    // TODO: expect the string '50' to be emitted

    broadcaster(exercise)(function (er) { notifier(exercise)(er, callback) })
  } catch(error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

module.exports = exercise
