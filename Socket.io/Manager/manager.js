
'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
const host = `http://localhost:${port}`;
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const io = require('socket.io-client');
const socket = io.connect(host);




// Schedule new flights every 10 seconds
setInterval(() => {
    const flight=  {
    airline: 'Royal Jordanian Airlines',
    flightID: uuidv4(),
    pilot:faker.person.firstName(),
    destination: faker.location.city(),
  }
  
    socket.emit('new-flight', flight);

    socket.on('new-flight', (flight) => {
        console.log(`Manager: new flight with ID '${flight.details.flightID}' has been scheduled`);
    
    });
}, 10000);
// Event handler for new flight

//Event handler for flight arrived
socket.on('arrived', (flight) => {
    console.log(`Manager: we are greatly thankful for the amazing flight, ${flight.details.pilot}`);
});






