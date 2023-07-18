
'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;
const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

 const socket= require('socket.io');
 const io = new socket.Server(port);
//const io = require('socket.io')(port);


io.on('connection', (socket) => {
    console.log(`welcome to server socket , id: ${socket.id}`)

    socket.on('new-flight', (payload) => {
        const event = {
            event: 'new-flight',
            time: new Date(),
            details: payload

        }
        console.log(payload);
        console.log("Flight ",event)
        io.emit('new-flight',payload)
    })
    socket.on('Arrived', (payload) => {
        const event = {
            event: 'Arrived',
            time: new Date(),
            details: payload

        }
        console.log("Flight ",event)
    })

});

const airlineNamespace = io.of('/airline');
airlineNamespace.on('connection', (socket) => {
    socket.on('took-off', (flight) => {
        const event = {
            event: 'took-off',
            time: new Date(),
            details: flight

        }
        console.log('Flight:',event);

        
    });
});

console.log(`Server listening on port ${port}`);




