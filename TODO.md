# Features
* Generate room join link with easy copy instead of having to type room code.
* Add animations (simple fade)
* Add toast alerts when a user joins the room
* Build as PWA, with push notifications
* Add pagination to messages coming from room? Unsure if necessary.
* Import photos to draw on?

# Maintenance
* Fix bug where message doesn't show up directly after sending.
Maybe simplify the calls here? Only update front end after receiving new messages and saving to state?
* Fix bug where userName is not erased from localStorage when leaving a room.
* Think about refactoring all messages and errors to use a single 'messageEmit' function rather than tying to specific front-end states.
* General refactoring of components and pages
* Improve drawing responsiveness on slow devices
