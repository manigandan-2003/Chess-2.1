// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types'; 
// import GameBoard from './components/GameBoard';

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
//     });

//     socket.on('connect', () => {
//         console.log('New client connected:', socket.id);
    
//         socket.on('message', (message) => {
//             console.log('Message:', message);
//         });
    
//         console.log('Emitting welcome message');
//         socket.emit('message', 'Welcome to the client!');
//     });
//             socket.on('startGame', (data) => {
//                 console.log('Game starting with initial state:', data.initialState);
//                 setGameState(data.initialState.gameState);
//                 setCurrentPlayer(data.initialState.currentPlayer);
//                 setWaitingForPlayer(false);
//                 setPlayer(data.players[0] === socket.id ? 'A' : 'B');
//             });

//             socket.on('waitingForPlayer', (data) => {
//                 console.log(data.message);
//                 setWaitingForPlayer(true);
//                 setError(data.message);
//             });

//             socket.on('updateGameState', ({ gameState, currentPlayer }) => {
//                 console.log('Game state received:', gameState); // Debugging statement
//                 setGameState(gameState);
//                 setCurrentPlayer(currentPlayer);
//             });

//             socket.on('gameOver', ({ winner }) => {
//                 alert(`Game over! Player ${winner} wins!`);
//             });

//             socket.on('invalidMove', ({ message }) => {
//                 alert(message);
//             });

//             socket.on('playerLeft', ({ message }) => {
//                 alert(message);
//             });

//             socket.on('error', (message) => {
//                 setError(message);
//             });

//             socket.emit('joinRoom', roomId, (response) => {
//                 const { error, player } = response;
//                 if (error) {
//                     setError(error);
//                 } else {
//                     setPlayer(player);
//                 }
//             });

//             return () => {
//                 socket.off('startGame');
//                 socket.off('waitingForPlayer');
//                 socket.off('updateGameState');
//                 socket.off('gameOver');
//                 socket.off('invalidMove');
//                 socket.off('playerLeft');
//                 socket.off('error');
//             };
//         }
//     }, [socket, roomId]);

//     // Function to handle a move
//     function handleMove(startPosition, endPosition) {
//         console.log("Attempting move:");
//         console.log("Start Position:", startPosition);
//         console.log("End Position:", endPosition);

//         // Validate move positions
//         if (!startPosition || !endPosition) {
//             console.error("Move positions are undefined");
//             return;
//         }

//         // Ensure it's the correct player's turn
//         if (currentPlayer !== player) {
//             alert("It's not your turn!");
//             return;
//         }

//         // Retrieve the character at the start position
//         const character = gameState[startPosition];
//         if (!character) {
//             console.error("Invalid move: No character at startPosition.");
//             return;
//         }

//         if (character.player !== player) {
//             console.error("Invalid move: This is not your piece.");
//             return;
//         }

//         // Log character details for debugging
//         console.log("Character being moved:", character);

//         // Update local game state
//         const newGameState = { ...gameState };
//         newGameState[endPosition] = newGameState[startPosition];
//         delete newGameState[startPosition];

//         // Temporarily update local state for immediate feedback
//         setGameState(newGameState);
//         setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');

//         // Emit the move to the server, specifying the room ID and updated game state
//         socket.emit('makeMove', roomId, newGameState, (response) => {
//             if (response.error) {
//                 console.error(response.error);
//                 // Optionally revert to previous state if there was an error
//                 setGameState(gameState);
//                 return;
//             }
//             console.log("Move successfully sent to server.");
//         });
//     }

//     // Listen for server broadcast of updated game state
//     socket.on('updateGameState', (updatedGameState) => {
//         console.log("Received updated game state from server:", updatedGameState);
//         setGameState(updatedGameState);  // Update the local state to reflect server's game state
//         setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');  // Update turn
//     });


//     return (
//         <div>
//             <div style={{ marginTop: '50px' }}>
//                 <h5>Room ID: {roomId}</h5>
//             </div>

//             {gameState === null && error && <p style={{ color: 'red' }}>{error}</p>}
//             {waitingForPlayer ? (
//                 <p>Waiting for another player to join...</p>
//             ) : gameState ? (
//                 <GameBoard gameState={gameState} onMove={handleMove} />
//             ) : (
//                 <p>Loading game...</p>
//             )}
//         </div>
//     );
// };

// Game.propTypes = {
//     socket: PropTypes.object.isRequired,
// };

// export default Game;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import GameBoard from './components/GameBoard';

const Game = ({ socket }) => {
    const { roomId } = useParams();
    const [gameState, setGameState] = useState(null);
    const [player, setPlayer] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(null); // Initialize to null
    const [error, setError] = useState('');
    const [waitingForPlayer, setWaitingForPlayer] = useState(false);
    

    useEffect(() => {
        if (socket) {
            // Join room with a callback to handle errors or set player information
            socket.emit('joinRoom', roomId, (response) => {
                const { error, player, initialTurn } = response; // Receive initialTurn
                if (error) {
                    setError(error);
                } else {
                    setPlayer(player);
                    setCurrentPlayer(initialTurn); // Set initial turn
                }
            });

            // Listen for game start, waiting state, game state updates, and errors
            socket.on('startGame', (data) => {
                setGameState(data.initialState.gameState);
                setCurrentPlayer(data.initialState.currentPlayer);
                setWaitingForPlayer(false);
                //setPlayer(data.players[0] === socket.id ? 'A' : 'B'); // Removed as player is set in joinRoom
            });

            socket.on('waitingForPlayer', (data) => {
                setWaitingForPlayer(true);
                setError(data.message);
            });

            socket.on('updateGameState', ({ gameState, currentPlayer }) => {
                setGameState(gameState);
                setCurrentPlayer(currentPlayer);
            });

            socket.on('gameOver', ({ winner }) => {
                alert(`Game over! Player ${winner} wins!`);
            });

            socket.on('invalidMove', ({ message }) => {
                alert(message);
            });

            socket.on('playerLeft', ({ message }) => {
                alert(message);
            });

            socket.on('error', (message) => {
                setError(message);
            });

            // Clean up listeners on unmount
            return () => {
                socket.off('startGame');
                socket.off('waitingForPlayer');
                socket.off('updateGameState');
                socket.off('gameOver');
                socket.off('invalidMove');
                socket.off('playerLeft');
                socket.off('error');
            };
        }
    }, [socket, roomId]);

    // Function to handle a move
    function handleMove(startPosition, endPosition) {
        // Check valid move
        if (currentPlayer !== player) {
            alert("It's not your turn!");
            return;
        }

        // Update local game state and switch turn
        const newGameState = { ...gameState };
        newGameState[endPosition] = newGameState[startPosition];
        delete newGameState[startPosition];

        setGameState(newGameState);
        setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');

        // Emit the move to the server with a callback
        socket.emit('makeMove', roomId, newGameState, (response) => {
            if (response.error) {
                console.error(response.error);
                setError(response.error); // Added to display error from backend
                // Optionally revert to previous state if there was an error
                setGameState(gameState);
            } else {
                console.log("Move successfully sent to server.");
            }
        });
    }

    return (
        <div>
            <div style={{ marginTop: '50px' }}>
                <h5>Room ID: {roomId}</h5>
            </div>

            {gameState === null && error && <p style={{ color: 'red' }}>{error}</p>}
            {waitingForPlayer ? (
                <p>Waiting for another player to join...</p>
            ) : gameState ? (
                <GameBoard gameState={gameState} onMove={handleMove} />
            ) : (
                <p>Loading game...</p>
            )}
        </div>
    );
};

Game.propTypes = {
    socket: PropTypes.object.isRequired,
};

export default Game;