
"use strict";

require("dotenv").config();
const port = process.env.PORT || 3000;
const ioClient = require("socket.io-client");
const io = require("socket.io")(port);
const { faker } = require("@faker-js/faker");
const uuid = require("uuid");

const host = `http://localhost:${port}`;
const socket = ioClient.connect(host);

// Connect to the Socket.IO server as a client
socket.emit("start");

// Add a queue object to store flights
const queue = {
    flights: {},
};

// Client-side code
socket.on("new-flight", (payload) => {
    const id = uuid.v4();
    queue.flights[id] = payload;
    console.log("queue =", queue.flights[id]);
   // console.log(queue);
    io.emit("get-all", {
        id,
        payload: queue.flights[id],
    });
});

// Server-side code
io.on("connection", (socket) => {
    console.log("Welcome, your socket id:", socket.id);

    socket.on("start", () => {
        setInterval(() => {
            io.emit("new-flight", {
                event: "new-flight",
                time: new Date(),
                Details: {
                    airLine: 'Royal Jordanian Airlines',
                    flightID: uuid.v4(),
                    pilot: faker.person.fullName(),
                    destination: faker.location.city(),
                },
            });
        }, 10000);
    });

    socket.on("new-flight", newFlight);
    function newFlight(payload) {
        console.log("Flight:", payload);
    }

    socket.on("Arrived", flightArrived);
    function flightArrived(payload) {
        console.log("Flight:", payload);
        io.emit("Arrived", payload);
    }
});

io.of("/airline").on("connection", (socket) => {
    socket.on("took-off", flightTookOff);

    function flightTookOff(payload) {
        console.log("Flight:", payload);
    }
});






