// import { useState } from 'react';
// import '../components/ComponentsCss/GameBoard.css';
// import DecorativeBox from '../components/DecorativeBox';
// import Character from '../components/Character';
// import { isValidMove } from '../utils/gameUtils';

// const GameBoard = () => {
//     const [gameState, setGameState] = useState({
//         'A1': { type: 'Pawn', player: 'A' },
//         'B1': { type: 'Pawn', player: 'A' },
//         'C1': { type: 'Hero1', player: 'A' },
//         'D1': { type: 'Hero2', player: 'A' },
//         'E1': { type: 'Pawn', player: 'A' },
//         'A5': { type: 'Pawn', player: 'B' },
//         'B5': { type: 'Pawn', player: 'B' },
//         'C5': { type: 'Hero1', player: 'B' },
//         'D5': { type: 'Hero2', player: 'B' },
//         'E5': { type: 'Pawn', player: 'B' },
//     });

//     const [highlightedCells, setHighlightedCells] = useState([]);
//     const [moveHistory, setMoveHistory] = useState([]);
//     const [currentPlayer, setCurrentPlayer] = useState('A'); // Track current player's turn

//     const handleDragStart = (event, position) => {
//         const character = gameState[position];

//         // Prevent dragging if it's not the current player's turn
//         if (character.player !== currentPlayer) {
//             event.preventDefault();
//             return;
//         }

//         event.dataTransfer.setData('text/plain', position);
    
//         const validMoves = [];
    
//         for (let row = 1; row <= 5; row++) {
//             for (let col = 'A'; col <= 'E'; col = String.fromCharCode(col.charCodeAt(0) + 1)) {
//                 const newPos = `${col}${row}`;
//                 if (isValidMove(character, position, newPos, gameState)) {
//                     validMoves.push(newPos);
//                 }
//             }
//         }
    
//         // Update state
//         setHighlightedCells(validMoves);
//     };

//     const handleDrop = (event, newPosition) => {
//         event.preventDefault();
//         const oldPosition = event.dataTransfer.getData('text/plain');
        
//         // If no valid move was initiated, exit early
//         if (!oldPosition || oldPosition === newPosition) return;

//         const character = gameState[oldPosition];
//         const capturedCharacter = gameState[newPosition];

//         // Ensure move is valid and it's the correct player's turn
//         if (character && character.player === currentPlayer && isValidMove(character, oldPosition, newPosition, gameState)) {
//             const updatedGameState = { ...gameState };
            
//             // Record capture if applicable
//             if (capturedCharacter) {
//                 const captureMove = formatMove(character, oldPosition, newPosition, true);
//                 setMoveHistory([...moveHistory, captureMove]);
//             }

//             // Move the character
//             updatedGameState[newPosition] = updatedGameState[oldPosition];
//             delete updatedGameState[oldPosition];
//             setGameState(updatedGameState);

//             // Add move to history
//             if (!capturedCharacter) {
//                 const move = formatMove(character, oldPosition, newPosition, false);
//                 setMoveHistory([...moveHistory, move]);
//             }

//             // Check if the opponent has no more pieces
//             const opponent = currentPlayer === 'A' ? 'B' : 'A';
//             if (isGameOver(updatedGameState, opponent)) {
//                 alert(`Player ${currentPlayer} wins!`);
//                 resetGame();
//             } else {
//                 // Switch turns
//                 setCurrentPlayer(opponent);
//             }
//         }

//         // Clear the highlighted cells after dropping
//         setHighlightedCells([]);
//     };

//     const handleDragOver = (event) => {
//         event.preventDefault();
//     };

//     const formatMove = (character, from, to, isCapture) => {
//         const direction = getDirection(from, to);
//         return isCapture 
//             ? `${character.type[0]}${character.player === 'A' ? '1' : '2'}x:${direction}` 
//             : `${character.type[0]}${character.player === 'A' ? '1' : '2'}:${direction}`;
//     };

//     const getDirection = (from, to) => {
//         const col1 = from[0].charCodeAt(0);
//         const row1 = parseInt(from.slice(1), 10);
//         const col2 = to[0].charCodeAt(0);
//         const row2 = parseInt(to.slice(1), 10);

//         const colDiff = col2 - col1;
//         const rowDiff = row2 - row1;

//         if (colDiff === 0 && rowDiff < 0) return 'F'; // Forward
//         if (colDiff === 0 && rowDiff > 0) return 'B'; // Backward
//         if (colDiff > 0 && rowDiff === 0) return 'R'; // Right
//         if (colDiff < 0 && rowDiff === 0) return 'L'; // Left
//         if (colDiff > 0 && rowDiff < 0) return 'FR'; // Forward-Right (Diagonal)
//         if (colDiff < 0 && rowDiff < 0) return 'FL'; // Forward-Left (Diagonal)
//         if (colDiff > 0 && rowDiff > 0) return 'BR'; // Backward-Right (Diagonal)
//         if (colDiff < 0 && rowDiff > 0) return 'BL'; // Backward-Left (Diagonal)

//         return ''; // Invalid or undefined move direction
//     };

//     const isGameOver = (gameState, opponent) => {
//         return !Object.values(gameState).some(character => character.player === opponent);
//     };

//     const resetGame = () => {
//         setGameState({
//             'A1': { type: 'Pawn', player: 'A' },
//             'B1': { type: 'Pawn', player: 'A' },
//             'C1': { type: 'Hero1', player: 'A' },
//             'D1': { type: 'Hero2', player: 'A' },
//             'E1': { type: 'Pawn', player: 'A' },
//             'A5': { type: 'Pawn', player: 'B' },
//             'B5': { type: 'Pawn', player: 'B' },
//             'C5': { type: 'Hero1', player: 'B' },
//             'D5': { type: 'Hero2', player: 'B' },
//             'E5': { type: 'Pawn', player: 'B' },
//         });
//         setMoveHistory([]);
//         setHighlightedCells([]);
//         setCurrentPlayer('A'); // Reset to player A's turn
//     };

//     const labels = [];
//     const columns = ['A', 'B', 'C', 'D', 'E'];

//     for (let row = 1; row <= 5; row++) {
//         for (let col = 0; col < 5; col++) {
//             labels.push(`${columns[col]}${row}`);
//         }
//     }

//     return (
//         <div className="game-container">
//             <div className="game-board">
//                 {labels.map((label, index) => (
//                     <DecorativeBox
//                         key={index}
//                         onDrop={(event) => handleDrop(event, label)}
//                         onDragOver={handleDragOver}
//                         className={`decorative-box ${highlightedCells.includes(label) ? 'highlight' : ''}`}
//                     >
//                         {gameState[label] ? (
//                             <Character
//                                 type={gameState[label].type}
//                                 player={gameState[label].player}
//                                 position={label}
//                                 onDragStart={(event) => handleDragStart(event, label)}
//                             />
//                         ) : null}
//                     </DecorativeBox>
//                 ))}
//             </div>
//             <div className="move-history">
//                 <h3>Move History</h3>
//                 <ul>
//                     {moveHistory.map((move, index) => (
//                         <li key={index}>{move}</li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="current-turn">
//                 <h3>Current Turn: Player {currentPlayer}</h3>
//             </div>
//         </div>
//     );
// };

// export default GameBoard;

// GameBoard.js

import { useEffect, useState } from 'react';
import '../components/ComponentsCss/GameBoard.css';
import DecorativeBox from '../components/DecorativeBox';
import Character from '../components/Character';
import { isValidMove } from '../utils/gameUtils';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000', {
    transports: ['websocket'], // Use WebSocket transport only
    withCredentials: false // Include credentials with the request
});


const initialGameState = {
    'A1': { type: 'Pawn', player: 'A' },
    'B1': { type: 'Pawn', player: 'A' },
    'C1': { type: 'Hero1', player: 'A' },
    'D1': { type: 'Hero2', player: 'A' },
    'E1': { type: 'Pawn', player: 'A' },
    'A5': { type: 'Pawn', player: 'B' },
    'B5': { type: 'Pawn', player: 'B' },
    'C5': { type: 'Hero1', player: 'B' },
    'D5': { type: 'Hero2', player: 'B' },
    'E5': { type: 'Pawn', player: 'B' },
};

const GameBoard = () => {
    const { roomId } = useParams();
    const [gameState, setGameState] = useState(initialGameState);
    const [highlightedCells, setHighlightedCells] = useState([]);
    const [moveHistory, setMoveHistory] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState('A');

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('initialize', (data) => {
            console.log('Game initialized:', data);
            setGameState(data.gameState);
            setCurrentPlayer(data.currentPlayer);
        });

        socket.on('updateGameState', (data) => {
            console.log('Game state updated:', data);
            setGameState(data.gameState);
            setCurrentPlayer(data.currentPlayer);
        });

        socket.on('gameOver', (data) => {
            alert(`Player ${data.winner} wins the game!`);
            resetGame();
        });

        socket.on('invalidMove', (data) => {
            console.log('Invalid move:', data);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        socket.on('connect_error', (err) => {
            console.log('Connection Error:', err);
        });

        socket.on('connect_timeout', () => {
            console.log('Connection Timeout');
        });

        return () => {
            socket.off('connect');
            socket.off('initialize');
            socket.off('updateGameState');
            socket.off('gameOver');
            socket.off('invalidMove');
            socket.off('disconnect');
        };
    }, []);

    useEffect(() => {
        console.log('Game state changed:', gameState);
    }, [gameState]);

    const handleDragStart = (event, position) => {
        const character = gameState[position];
        console.log('Drag Start:', position);
        // Prevent dragging if it's not the current player's turn
        if (character.player !== currentPlayer) {
            event.preventDefault();
            return;
        }

        event.dataTransfer.setData('text/plain', position);

        const validMoves = [];

        for (let row = 1; row <= 5; row++) {
            for (let col = 'A'; col <= 'E'; col = String.fromCharCode(col.charCodeAt(0) + 1)) {
                const newPos = `${col}${row}`;
                if (isValidMove(character, position, newPos, gameState)) {
                    validMoves.push(newPos);
                }
            }
        }

        // Update state
        setHighlightedCells(validMoves);
    };

    const handleDrop = (event, newPosition) => {
        event.preventDefault();
        const oldPosition = event.dataTransfer.getData('text/plain');
        console.log('Dropped from:', oldPosition, 'to:', newPosition);
    
        // If no valid move was initiated, exit early
        if (!oldPosition || oldPosition === newPosition) return;
    
        const character = gameState[oldPosition];
        const capturedCharacter = gameState[newPosition];
    
        // Ensure move is valid and it's the correct player's turn
        if (character && character.player === currentPlayer && isValidMove(character, oldPosition, newPosition, gameState)) {
            const updatedGameState = { ...gameState };

            // Update the game state with the new position
            updatedGameState[newPosition] = updatedGameState[oldPosition];
            delete updatedGameState[oldPosition];

            // Apply the updated game state
            setGameState(updatedGameState);

    
            // Record capture if applicable
            let move;
            if (capturedCharacter) {
                move = formatMove(character, oldPosition, newPosition, true);
            } else {
                move = formatMove(character, oldPosition, newPosition, false);
            }
    
            // Add move to history
            setMoveHistory([...moveHistory, move]);
    
            /// Emit after ensuring state is updated
            socket.emit('makeMove', {
                roomId,
                playerId: currentPlayer,
                oldPosition,
                newPosition,
                captured: !!capturedCharacter,
                gameState: updatedGameState, // Ensure the latest state is emitted
            });
    
            // Check if the opponent has no more pieces
            const opponent = currentPlayer === 'A' ? 'B' : 'A';
            if (isGameOver(updatedGameState, opponent)) {
                socket.emit('gameEnd', { winner: currentPlayer });
            } else {
                // Switch turns
                setCurrentPlayer(opponent);
            }
        }
    
        // Clear the highlighted cells after dropping
        setHighlightedCells([]);
    };
    

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    
    const formatMove = (character, from, to, isCapture) => {
        const direction = getDirection(from, to);
        return isCapture
            ? `${character.type[0]}${character.player === 'A' ? '1' : '2'}x:${direction}`
            : `${character.type[0]}${character.player === 'A' ? '1' : '2'}:${direction}`;
    };

    const getDirection = (from, to) => {
        const col1 = from[0].charCodeAt(0);
        const row1 = parseInt(from.slice(1), 10);
        const col2 = to[0].charCodeAt(0);
        const row2 = parseInt(to.slice(1), 10);
    
        const colDiff = col2 - col1;
        const rowDiff = row2 - row1;
    
        if (colDiff === 0 && rowDiff < 0) return 'F'; // Forward
        if (colDiff === 0 && rowDiff > 0) return 'B'; // Backward
        if (colDiff > 0 && rowDiff === 0) return 'R'; // Right
        if (colDiff < 0 && rowDiff === 0) return 'L'; // Left
        if (colDiff > 0 && rowDiff < 0) return 'FR'; // Forward-Right (Diagonal)
        if (colDiff < 0 && rowDiff < 0) return 'FL'; // Forward-Left (Diagonal)
        if (colDiff > 0 && rowDiff > 0) return 'BR'; // Backward-Right (Diagonal)
        if (colDiff < 0 && rowDiff > 0) return 'BL'; // Backward-Left (Diagonal)
    
        return ''; // Invalid or undefined move direction
    };
    

    const isGameOver = (gameState, opponent) => {
        return !Object.values(gameState).some(character => character.player === opponent);
    };

    const resetGame = () => {
        setGameState(initialGameState);
        setMoveHistory([]);
        setHighlightedCells([]);
        setCurrentPlayer('A');
    };

    const labels = [];
    const columns = ['A', 'B', 'C', 'D', 'E'];

    for (let row = 1; row <= 5; row++) {
        for (let col = 0; col < 5; col++) {
            labels.push(`${columns[col]}${row}`);
        }
    }

    return (
        <div className="game-container">
            <div className="game-board">
                {labels.map((label, index) => (
                    <DecorativeBox
                    key={index}
                    onDrop={(event) => handleDrop(event, label)}
                    onDragOver={handleDragOver}
                    className={`decorative-box ${highlightedCells.includes(label) ? 'highlight' : ''}`}
                >
                    {gameState[label] ? (
                        <Character
                            type={gameState[label].type}
                            player={gameState[label].player}
                            position={label}
                            onDragStart={(event) => handleDragStart(event, label)}
                            draggable
                        />
                    ) : null}
                </DecorativeBox>
                ))}
            </div>
            <div className="move-history" >
                <h3>Move History</h3>
                <ul>
                    {moveHistory.map((move, index) => (
                        <li key={index}>{move}</li>
                    ))}
                </ul>
            </div>
            <div className="current-turn">
                <h3>Current Turn: Player {currentPlayer}</h3>
            </div>
        </div>
    );
};

export default GameBoard;
