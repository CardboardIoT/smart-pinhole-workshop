var inherits = require("util").inherits;
var sinon = require("sinon");
var lightmeter = require("lightmeter");
var Widget = lightmeter.Widget;

sinon.spy(Widget.prototype, 'setLightLevel');

module.exports = lightmeter;
