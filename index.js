module.exports = init

var Emitter = require('events').EventEmitter

function init(callback) {
  callback(null, 'timers', Timers)
}

function Timers(automait) {
  Emitter.call(this)
  this.automait = automait
  this.timers = {}
}

Timers.prototype = Object.create(Emitter.prototype)

Timers.prototype.start = function (name, timeout, callback) {
  setTimeout(function () {
    this.emit(name)
    callback()
  }.bind(this), timeout * 1000)
}

Timers.prototype.startOrExtend = function (name, timeout, callback) {
  var timer = this.timers[name]
  if (timer) {
    clearTimeout(timer)
  }
  this.timers[name] = setTimeout(function () {
    this.emit(name)
    callback()
  }.bind(this), timeout * 1000)
}
