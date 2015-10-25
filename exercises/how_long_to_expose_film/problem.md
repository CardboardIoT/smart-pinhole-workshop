Our LightMeter widget can use the light level reading to dynamically decide how long to leave the camera shutter open for. But since it's a web app, we can get it to do much more.

Let's learn how to set exposure readings for different daylight conditions.

__Extend your answer to the last problem to set 2 lighting condition readings.__

Using your solution to the previous problem, you can use the `addLightingCondition()` method to add lighting conditions. These allow you to map a light sensor reading to an exposure time.

It takes an object of the following format:

```js
{
  name: 'Direct sun', // the human readable name of the condition
  exposure: {         // a map of film types (ISO) to times in seconds
    400: 1.3,         // 400 ISO film needs 1.3s exposure time in direct sun
    800: 1.6
  },
  colour: {           // some fun colours for the UI (optional)
    start: '#f7ec86',
    stop : '#fdc753'
  },
  sensorRange: [0, 0.5] // min, max
                        // this lighting is selected when the sensor
                        // value is between 0 and just under 0.5
}
```

Add 2 lighting conditions:

    name: Direct sun
    ISO: 400, 1.3 seconds
    minimum light sensor: 0.6
    maximum light sensor: 1

    name: Indoors
    ISO: 400, 180 seconds
    minimum light sensor: 0
    maximum light sensor: 0.6

## Hints

You can pass an array of objects to `addLightingCondition()`.

The widget includes an array of default conditions, try `console.log(LightMeterWidget.defaults)`.

Don't forget, you can run your program in the browser using `ID=<your-id> lightmeter --port 11686 program.js` and loading the URL in your browser.
