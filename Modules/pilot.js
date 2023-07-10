'use strict';

const eventsPool = require('../eventspool');
require('./manager')
// Keep the pilot alerted when a new flight is scheduled
eventsPool.on('new-flight', (flightDetails) => {
  setTimeout(() => {
  //  const { flightID } = flightDetails;
    console.log(`Pilot: Flight with ID '${flightDetails.details.flightID}' took-off`);
    flightDetails.event='took-off'
    // Emit 'took-off' event with the flight details as payload
    eventsPool.emit('took-off', flightDetails);
  }, 4000);

  setTimeout(() => {
    //const { flightID } = flightDetails;
    console.log(`Pilot: Flight with ID '${flightDetails.details.flightID}' has arrived`);
    flightDetails.event='arrived'
    // Emit 'arrived' event with the flight details as payload
    eventsPool.emit('arrived', flightDetails);
  }, 7000);
});
