// utils/validation.js

export const isValidMove = (character, from, to, gameState) => {
    const isInBounds = (pos) => {
        const col = pos[0];
        const row = parseInt(pos.slice(1), 10);
        return col >= 'A' && col <= 'E' && row >= 1 && row <= 5;
    };

    const isPathClear = (from, to) => {
        const col1 = from[0].charCodeAt(0);
        const row1 = parseInt(from.slice(1), 10);
        const col2 = to[0].charCodeAt(0);
        const row2 = parseInt(to.slice(1), 10);

        const colStep = col1 < col2 ? 1 : col1 > col2 ? -1 : 0;
        const rowStep = row1 < row2 ? 1 : row1 > row2 ? -1 : 0;

        let col = col1 + colStep;
        let row = row1 + rowStep;

        while (col !== col2 || row !== row2) {
            const pos = String.fromCharCode(col) + row;
            if (gameState[pos] && gameState[pos].player === character.player) {
                return false;
            }
            col += colStep;
            row += rowStep;
        }

        return true;
    };

    const move = (from, to) => {
        const col1 = from[0];
        const row1 = parseInt(from.slice(1), 10);
        const col2 = to[0];
        const row2 = parseInt(to.slice(1), 10);

        const colDiff = Math.abs(col2.charCodeAt(0) - col1.charCodeAt(0));
        const rowDiff = Math.abs(row2 - row1);

        if (!isInBounds(to)) return false; 

        // Check if the destination cell is occupied by a character of the same player
        const destinationCharacter = gameState[to];
        if (destinationCharacter && destinationCharacter.player === character.player) {
            return false;
        }

        switch (character.type) {
            case 'Pawn':
                return (colDiff <= 1 && rowDiff <= 1) && (colDiff !== 0 || rowDiff !== 0);
            case 'Hero1':
                // Hero1 moves like a rook, so path must be clear
                return ((colDiff === 2 && rowDiff === 0) || (colDiff === 0 && rowDiff === 2) || (colDiff === 1 && rowDiff === 0) || (colDiff === 0 && rowDiff === 1)) && isPathClear(from, to);
            case 'Hero2':
                // Hero2 moves like a bishop, so path must be clear
                return ((colDiff === 2 && rowDiff === 2) || (colDiff === 1 && rowDiff === 1)) && isPathClear(from, to);
            default:
                return false;
        }
    };

    // Check for move validity
    return move(from, to);
};
