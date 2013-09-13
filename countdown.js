/*
 * countdown.js
 * ============
 *
 * Because NIH & I wanted a pure Javascript, pure data countdown.
 *
 * Usage::
 *
 *    var count = new Countdown({
 *      target_date: new Date(2013, 8, 12, 6, 0, 0)
 *    })
 *    count.start()
 *
 * Code that needs to know what's going on with the countdown can listen for
 * ``countdowntick`` events.
 *
 * For an example, look at the ``test.html`` file included.
 */

// Our own event.
var countdowntick = new Event('countdowntick')


var Countdown = function(options) {
  var opts = options || {}
  this.__author__ = 'Daniel Lindsley'
  this.__license__ = 'BSD'
  this.__version__ = '0.8.0'

  this.current_date = new Date()
  this.target_date = opts.target_date || null

  this.running = false
  this._timer = null

  this.days_left = 0
  this.hours_left = 0
  this.minutes_left = 0
  this.seconds_left = 0

  // This is naive, but good enough.
  this.day_length = opts.day_length || (60 * 60 * 24)
  this.hour_length = opts.day_length || (60 * 60)
  this.minute_length = opts.day_length || 60
}


var cons = Countdown
  , proto = cons.prototype


proto.start = function() {
  var self = this
  self.running = true
  // Update ourself.
  self.recalculate()
  // Periodically update every 500 milliseconds.
  self._timer = window.setInterval(function() {
    self.recalculate()
  }, 500)
}


proto.stop = function() {
  this.running = false
  window.clearInterval(this._timer)
}


proto.recalculate = function() {
  this.current_date = new Date()

  // parseInt ALL THE THINGS!
  var diff = parseInt((this.target_date - this.current_date) / 1000)
  this.days_left = parseInt(diff / this.day_length)

  diff = parseInt(diff % this.day_length)
  this.hours_left = parseInt(diff / this.hour_length)

  diff = parseInt(diff % this.hour_length)
  this.minutes_left = parseInt(diff / this.minute_length)
  this.seconds_left = parseInt(diff % this.minute_length)

  // FIXME: Fire an event that says we updated.
  document.dispatchEvent(countdowntick)
  return true
}


proto.toString = function() {
  return '' +
         this.days_left + ' days, ' +
         this.hours_left + ' hours, ' +
         this.minutes_left + ' minutes, ' +
         this.seconds_left + ' seconds'
}
