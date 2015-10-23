var lightmeter = require('lightmeter'),
    path = require('path');

module.exports = function (mode, callback) {
  var port = 11686,
      submissionPath;

  if (mode === 'run') {
    submissionPath = path.resolve(this.args[0]);
    lightmeter.serve(port, submissionPath, { quiet: true });

    console.log('\nVisit http://localhost:' + port + ' in your browser to view your UI');
    console.log('Press Ctl+C to stop the server');
  } else {
    callback(null);
  }
}
