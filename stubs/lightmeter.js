var inherits = require("util").inherits;
var sinon = require("sinon");
var lightmeter = require("lightmeter");

var instances = [];

var WidgetMock = function () {
  var self = this;
  self._conditions = [];
  self.setLightLevel = sinon.spy();
  self.addLightingCondition = function (c) {
    if (!c.length) {
      c = [c];
    }
    self._conditions = self._conditions.concat(c);
  }
  instances.push(self);
};

WidgetMock.defaults = lightmeter.Widget.defaults;

lightmeter.instances = instances;
lightmeter.Widget = WidgetMock;

module.exports = lightmeter;
