// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('../src/middlewares/cors');

// const app = express();
// app.use(cors); // Use the CORS middleware
// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:5173', // Adjust to your React frontend URL
//         methods: ['GET', 'POST'],
//         credentials: true,
//     }
// });

// // Helper function to generate a unique room ID
// function generateRoomId() {
//     return 'room-' + Math.random().toString(36).substr(2, 9); // Random string
// }

// // Helper function to assign a player to team A or B
// function assignPlayerToTeam() {
//     return Math.random() < 0.5 ? 'A' : 'B';
// }

// // Function to create a room
// function createRoom(socket) {
//     const roomId = generateRoomId();
//     socket.join(roomId);
//     return roomId;
// }

// // Function to handle joining a room
// function joinRoom(socket, roomId) {
//     const rooms = io.sockets.adapter.rooms;
//     if (rooms.has(roomId)) {
//         const numPlayers = rooms.get(roomId).size;
//         if (numPlayers < 2) {
//             socket.join(roomId);
//             const team = assignPlayerToTeam();
//             const initialTurn = numPlayers === 0 ? team : (team === 'A' ? 'B' : 'A');
//             socket.data.team = team; // Store the team assignment on the socket
//             socket.emit('joinRoom', { roomId, team, initialTurn });
//             if (numPlayers === 1) {
//                 io.to(roomId).emit('startGame');
//             }
//         } else {
//             socket.emit('roomFull');
//         }
//     } else {
//         socket.emit('roomNotFound');
//     }
// }

// io.on('connection', (socket) => {
//     socket.on('createRoom', () => {
//         const roomId = createRoom(socket);
//         socket.emit('roomCreated', roomId);
//     });

//     socket.on('joinRoom', (roomId) => {
//         joinRoom(socket, roomId);
//     });

//     socket.on('disconnect', () => {
//         // Handle disconnection logic here
//     });
// });