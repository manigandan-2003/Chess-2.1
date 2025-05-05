/**
 * Checks if a move is valid.
 * @param {object} state - The current game state.
 * @param {object} move - The move to validate.  { from, to }
 * @param {string} pieceType - The type of piece being moved.
 * @returns {boolean} - True if the move is valid, false otherwise.
 */
const isValidMove = (state, move, pieceType) => {
  const { from, to } = move;
  const { board } = state;
  const piece = board[from.row][from.col];

  // Step 5: Preserve existing move validation logic
  if (!piece || piece.player !== state.currentPlayer) {
    return false;
  }

  // Step 3: Handle different piece movement rules and potential two-step moves
  // ... existing logic for different piece types (Pawn, Hero1, Hero2) ...

  // Step 1 & 2: Check for obstructions
  const path = getPath(from, to); // Assuming you have a getPath function
  for (let i = 1; i < path.length; i++) {
    const { row, col } = path[i];
    if (board[row][col]) {
      // Step 2: Obstruction check. Target cell is not an opponent piece
      if(board[to.row][to.col] && board[to.row][to.col].player !== state.currentPlayer){
          return false;
      }
      return false; // Obstructed
    }
  }

  // Step 4: Allow capturing moves
  if (board[to.row][to.col] && board[to.row][to.col].player !== state.currentPlayer) {
    return true; // Capture is allowed
  }

  // ... rest of the existing validation logic ...
  return true; // Move is valid
};

// ... other functions ...

module.exports = { isValidMove };