Now you have everything you need to use your light sensor to calculate exposure times.

You created a Johnny Five program that reads light sensor data from an Arduino and published it to an MQTT topic.

You then subscribed to that topic in a web browser and updated a widget containing exposure data.

__Launch both apps to see the exposure time change with light levels.__

In a new terminal window, run exercise 3. "Let there be light":

    ID=<your-id> node 03_let_there_be_light

Then, in this window run your program from the last exercise:

    ID=<your-id> lightmeter --port 11686 program.js

Cover the sensor with your hand to see the value change in the web UI.

## Tip

You can add the full range of lighting consitions in your web app like this:

    lightMeter.addLightingCondition( LightMeterWidget.defaults );
