countdown.js
============

Because NIH & I wanted a pure Javascript, pure data countdown.


Usage
-----

Creating & starting a countdown looks like...::

   var count = new Countdown({
     target_date: new Date(2013, 8, 12, 6, 0, 0)
   })
   count.start()

Code that needs to know what's going on with the countdown can listen for
``countdowntick`` events.::

    document.addEventListener('countdowntick', function() {
      console.log("Countdown: " + count.toString())
    }, false)

For an example, look at the ``test.html`` file included.


Author/License/Version
----------------------

:author: Daniel Lindsley
:license: BSD
:version: 0.8.0
