#!/usr/bin/env node

const workshopper = require('workshopper')
    , path        = require('path');

function fpath (f) {
  return path.join(__dirname, f)
}

workshopper({
    name        : 'smart-pinhole-workshop'
  , title       : 'Smart Pinhole Camera IoT Workshop'
  , subtitle    : '\x1b[23mSelect an exercise and hit \x1b[3mEnter\x1b[23m to begin'
  , exerciseDir : fpath('./exercises/')
  , appDir      : __dirname
  , helpFile    : fpath('help.txt')
  , prerequisitesFile : fpath('prerequisites.txt')
  , menuItems   : []
  , menu        : {fg: 'black', bg: /^win/.test(process.platform) ? 'yellow' : 220}
});