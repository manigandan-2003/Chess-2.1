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

// // Step 1: Create a room
// function createRoom(socket) {
//     const roomId = generateRoomId(); // Generate a unique room ID
//     socket.join(roomId); // Add the socket to the new room
//     return roomId; // Return the new roomId to the client
// }

// // Helper function to generate a unique room ID
// function generateRoomId() {
//     return 'room-' + Math.random().toString(36).substr(2, 9); // Random string
// }

// // Step 2: Join a room
// function joinRoom(socket, roomId) {
//     const rooms = io.sockets.adapter.rooms; // Get all current rooms

//     // Check if the room exists
//     if (rooms.has(roomId)) {
//         socket.join(roomId); // Add the socket to the existing room
//         console.log(`Socket ${socket.id} joined room: ${roomId}`);
//     } else {
//         console.log(`Room ${roomId} does not exist.`);
//     }
// }

// io.on('connection', (socket) => {
//     console.log('New client connected:', socket.id);

//     socket.on('error', (error) => {
//         console.error('Socket error:', error);
//     });

//     // Listen for room creation request
//     socket.on('createRoom', () => {
//         const roomId = createRoom(socket);
//         socket.emit('roomCreated', roomId); // Send the new roomId back to the client
//         console.log(`Room created: ${roomId}`);
//     });

//     // Listen for a request to join a room
//     socket.on('joinRoom', (roomId) => {
//         joinRoom(socket, roomId);
//     });

//     // Handle socket disconnection
//     socket.on('disconnect', () => {
//         console.log(`Socket ${socket.id} disconnected`);
//     });
// })