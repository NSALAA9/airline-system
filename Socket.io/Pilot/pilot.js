

'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
let host = `http://localhost:${port}/`;
const { v4: uuidv4 } = require('uuid');
const {faker} = require('@faker-js/faker');
const ioClient = require('socket.io-client');
const airlineSocket = ioClient.connect(`http://localhost:${port}/airline`);
const socket = ioClient.connect(`http://localhost:${port}`);





socket.on('new-flight', (flight) => {
    setTimeout(() => {
        console.log(`Pilot: flight with ID '${flight.flightID}' took-off`);
        airlineSocket.emit('took-off', flight);
    }, 4000);
});

setTimeout(() => {
    const flight = {
        airline: 'Royal Jordanian Airlines',
        flightID: uuidv4(),
        pilot: faker.person.firstName(),
        destination: faker.location.city(),
    };
    socket.emit('new-flight', flight);
}, 7000);


// setInterval(() => {
//     const flight = {
//         airline: 'Royal Jordanian Airlines',
//         flightID: uuidv4(),
//         pilot: faker.person.firstName(),
//         //pilot: faker.allFakers.en.person.firstName('male'),

//          destination: faker.location.city(),
//         //destination: faker.allFakers.en.location.city(),
//     }
//     socket.emit('took-off', flight);
// }, 3000);






