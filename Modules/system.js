'use strict';

const eventsPool = require('../eventspool');
require('./pilot');
require('./manager');

// Listen for the events and print the details
eventsPool.on('new-flight', (flightDetails) => {
 //console.log('Manager: new flight with ID', flightDetails.details.flightID, 'has been scheduled');
  console.log('Flight:', flightDetails);
});

eventsPool.on('took-off', (flightDetails) => {
  //console.log('Pilot: flight with ID', flightDetails.flightID, 'took-off');
  console.log('Flight:', flightDetails);
});

eventsPool.on('arrived', (flightDetails) => {
  //console.log('Pilot: flight with ID', flightDetails.flightID, 'has arrived');
  console.log('Flight:', flightDetails);

  //console.log('Manager: we are greatly thankful for the amazing flight,', flightDetails.details.pilot);
});
