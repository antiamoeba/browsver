express = require('express');
http = require('http');
fs = require('fs');
if (typeof fs.existsSync === 'undefined') {
  // mocking text file system :)
  const __files = {};
  fs.existsSync = function existsSync (path) {
    return typeof __files[path] !== 'undefined'
  }
  fs.writeFileSync = function writeFileSync (path, text) {
    // assuming utf8
    __files[path] = text
  }
  fs.readFileSync = function readFileSync (path) {
    return __files[path]
  }
}
if (typeof setImmediate === 'undefined') {
  global.setImmediate = function setImmediate (cb, param) {
    setTimeout(cb.bind(null, param), 0)
  }
}