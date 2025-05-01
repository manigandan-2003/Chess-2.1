// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types'; 
// import GameBoard from './components/GameBoard'

// const Game = ({ socket }) => {
//     const { roomId } = useParams();
//     const [gameState, setGameState] = useState(null);
//     const [player, setPlayer] = useState(null);
//     const [currentPlayer, setCurrentPlayer] = useState('A');
//     const [error, setError] = useState('');
//     const [waitingForPlayer, setWaitingForPlayer] = useState(false);

//     useEffect(() => {
//         if (socket) {
//             socket.on('message', (message) => {
//         console.log('Message:', message);
//     });}
//     }, [socket, roomId]);

// }