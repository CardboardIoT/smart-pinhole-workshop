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
    expect(connect0.args[0].port, 'mqtt connection to wrong port').to.equal(1883)

    // client listens to two events
    var client = mqtt.clients[0];
    expect(client.on.calledTwice, 'client does not listen to connect and message events').to.be.true;

    var onConnect = client.on.getCall(0);
    var onMessage = client.on.getCall(client.on.callCount - 1);
    var subscribe0 = client.subscribe.getCall(0);
    var publish0 = client.publish.getCall(0);
    var end0 = client.end.getCall(0);

    // client listens to connect event
    expect(onConnect.args[0], 'client does not listen to connect event').to.equal('connect')

    // client listens to message event
    expect(onMessage.args[0], 'client does not listen to message event').to.equal('message')

    // client subscribes and publishes
    expect(subscribe0, 'client did not subscribe').to.exist
    expect(publish0, 'client did not publish').to.exist

    // client subscribes and publishes only after connecting
    expect(onConnect.calledBefore(subscribe0), 'client unexpectedly subscribed before connecting').to.be.true
    expect(onConnect.calledBefore(publish0), 'client unexpectedly published before connecting').to.be.true

    // client subscribes to 'ciot/hello/world' topic
    expect(subscribe0.args[0], 'client does not subscibe to correct topic').to.equal('ciot/hello/world')

    // client publishesd Hello mqtt to 'ciot/hello/world' topic
    expect(publish0.args[0], 'client does not publish to correct topic').to.equal('ciot/hello/world')
    expect(publish0.args[1], 'client does not publish to correct payload').to.equal('Hello mqtt')

    // client ends after message is received
    expect(onMessage.calledBefore(end0), 'client unexpectedly ended before receiving a message').to.be.true

    broadcaster(exercise)(function (er) { notifier(exercise)(er, callback) })
  } catch(error) {
    broadcaster(exercise)(error, function (er) { notifier(exercise)(er, callback) })
  }
})

module.exports = exercise
