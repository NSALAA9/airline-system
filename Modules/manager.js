'use strict';

const eventsPool = require('../eventspool');
const uuid = require('uuid');
const faker = require('@faker-js/faker');

// Trigger a 'new-flight' event every 10 seconds
setInterval(() => {
  let payload = {  event: 'new-flight',
  time:new Date(),
  details:
  {
    airLine: 'Royal Jordanian Airlines',
    flightID: uuid.v4(),
    pilot: faker.allFakers.en.person.firstName('male'),
    destination: faker.allFakers.en.location.city(),
  }}
 console.log(`Manager: New flight with ID '${payload.details.flightID}' has been scheduled`);

  // Emit 'new-flight' event with the flight details as payload
  eventsPool.emit('new-flight', payload );
}, 10000);

//Listen for 'flight-arrived' event
eventsPool.on('arrived', (flightDetails) => {

console.log(`Manager: We are greatly thankful for the amazing flight, ${flightDetails.details.pilot}`);
});
