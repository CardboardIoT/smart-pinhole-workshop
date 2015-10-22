var LightMeterWidget = require('lightmeter').Widget;

var lightMeter = new LightMeterWidget();

lightMeter.addLightingCondition({
  id: 'direct-sun',
  name: 'Direct sun',
  exposure: {
    400: 1.3,
    800: 1.6,
    200: 2.5,
    100: 5,
    50: 10
  },
  min: 0.5,
  max: 1
});

lightMeter.addLightingCondition({
    id: 'indoors',
    name: 'Indoors',
    exposure: {
      400: 180,
      800: 90,
      200: 300,
      100: 600,
      50: 1200
    },
    min: 0,
    max: 0.5
  });
