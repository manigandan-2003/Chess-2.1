function initializeGame() {
    const gameState = {
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
    return {
        gameState,
        currentPlayer: 'A'
    };
}

function handleMove(gameState, from, to, currentPlayer) {
    const character = gameState[from];

    if (!character || character.player !== currentPlayer) {
        return { success: false };
    }

    // Perform the move if valid
    gameState[to] = character;
    delete gameState[from];

    // Check for a winner
    const winner = checkForWinner(gameState);

    return { success: true, gameState, winner };
}

function checkForWinner(gameState) {
    const playerAPieces = Object.values(gameState).filter(piece => piece.player === 'A');
    const playerBPieces = Object.values(gameState).filter(piece => piece.player === 'B');

    if (playerAPieces.length === 0) return 'B';
    if (playerBPieces.length === 0) return 'A';

    return null;
}

module.exports = { initializeGame, handleMove };