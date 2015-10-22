var inherits = require("util").inherits;
var sinon = require("sinon");
var mqtt = require('mqtt');

var originalConnect = mqtt.connect;

mqtt.clients = [];
mqtt.connect = function wrapper(url, options) {
  var wrapped = originalConnect(url, options);

  for (var key in wrapped) {
    if (wrapped[key] instanceof Function) {
      wrapped[key] = sinon.spy(wrapped[key]);
    }
  }

  mqtt.clients.push(wrapped);

  return wrapped;
};

mqtt.connect = sinon.spy(mqtt, 'connect');

module.exports = mqtt;