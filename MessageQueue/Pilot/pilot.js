

'use strict';

require('dotenv').config();
const port = process.env.PORT || 7000;
//let host = `http://localhost:${port}/`;
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const ioClient = require('socket.io-client');
const airlineSocket = ioClient.connect(`http://localhost:${port}/airline`);
const socket = ioClient.connect(`http://localhost:${port}`);





socket.on('new-flight', (flight) => {
    setTimeout(() => {
        console.log(`Pilot: flight with ID '${flight.details.flightID}' took-off`);
        flight.event='took-off'
        flight.time=new Date()
        airlineSocket.emit('took-off', flight);

        socket.emit('get-all')
        socket.on('flight', (flight)=>{
        console.log('Pilot:Sorry i didnt catch this flight ID',flight.id)
        socket.emit('recieved', flight)
        });
    }, 4000);



setTimeout(() => {
    console.log(`Pilot: flight with ID ${flight.details.flightID} arrived`)
        flight.event='arrived'
        flight.time=new Date()
    socket.emit('arrived', flight);
}, 7000);
});






