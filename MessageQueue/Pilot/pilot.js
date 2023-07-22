
"use strict";

const port = process.env.PORT || 3000;

const ioClient = require("socket.io-client");
const airlineSocket = ioClient.connect(`http://localhost:${port}/airline`);

const Socket = ioClient.connect(`http://localhost:${port}`);

Socket.on("new-flight", NewFlight);
Socket.on("get-all", getAllFlights);



function NewFlight(payload) {
    setTimeout(() => {
        console.log(
            `Pilot: flight with ID ${payload.Details.flightID} took-off`
        );
        payload.event = "took-off";
        payload.time = new Date();
        airlineSocket.emit("took-off", payload);
    }, 4000);

    setTimeout(() => {
        console.log(
            `Pilot: flight with ID ${payload.Details.flightID} has Arrived`
        );
        payload.event = "Arrived";
        payload.time = new Date();
        Socket.emit("Arrived", payload);
    }, 7000);
}

function getAllFlights(payload) {
    setTimeout(() => {
        console.log("Payload", payload);
    }, 3000);
}