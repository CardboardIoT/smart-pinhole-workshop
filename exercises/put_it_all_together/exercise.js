var proxyquire = require('proxyquire')
var mqtt = require('../../stubs/mqtt')
var lightmeter = require('../../stubs/lightmeter')

var expect = require('chai').expect
var exercise = require('workshopper-exercise')()
var filecheck = require('workshopper-exercise/filecheck')
var path = require('path')

var serveUi = require('../../lib/serve-ui')

// checks that the submission file actually exists
exercise = filecheck(exercise)

// Serve UI
exercise.addProcessor(serveUi)

module.exports = exercise
