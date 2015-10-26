var mqtt = require('mqtt')
var five = require('johnny-five')

var client = mqtt.connect({
  host: 'test.mosquitto.org',
  port: 1883
})

var id = process.env.ID;

var topic = 'ciot/pinhole/' + id + '/light/value'

var board = new five.Board()

board.on('ready', function() {

  var photoresistor = new five.Sensor({
    pin: 'A0',
    freq: 250
  })

  photoresistor.scale(0, 1).on('data', function() {
    if(!this.value){ return; }

    var value = this.value.toString()
    client.publish(topic, value, { retain: true })
  })

})
