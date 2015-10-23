Now that our browser app can receive MQTT sensor readings over WebSockets, we can create a dynamic UI to display the data.

We've already created a browser widget for you called LightMeter that you can include into the page using Browserify. This lets you use the familiar `require('module-name')` style of calls from node.js, but in the browser.

__Write some browser code that displays a made-up light value reading of '0.5' using our LightMeter widget.__

* Install the widget using npm, it's called `cardboardiot/lightmeter`
* Require the widget
* Instantiate the widget
* Use the widget's `setLightLevel()` method

You'll just see the light value for now, we'll add exposure time in the next exercise.

Running the solution using `smart-pinhole-workshop run program.js` will start a local server that you can open in your browser. Your code will be injected into the application. Reloading the page will load the latest version of your code.

```js
  var LightMeterWidget = require('lightmeter').Widget;

  // Your solution here!
```
