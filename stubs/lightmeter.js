var inherits = require("util").inherits;
var sinon = require("sinon");

var instances = [];

var WidgetMock = function () {
  this.setLightLevel = sinon.spy();
  instances.push(this);
};

module.exports = {
  Widget: WidgetMock,
  instances: instances
};
