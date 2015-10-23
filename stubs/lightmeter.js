var inherits = require("util").inherits;
var sinon = require("sinon");

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

module.exports = {
  Widget: WidgetMock,
  instances: instances
};
