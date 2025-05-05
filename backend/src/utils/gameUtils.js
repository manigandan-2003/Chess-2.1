/**
 * Checks if the path between two cells is clear.
 *
 * @param {Array<Array<Object>>} board The game board.
 * @param {Object} startCell The starting cell.
 * @param {Object} endCell The ending cell.
 * @returns {boolean} True if the path is clear, false otherwise.
 */
const isPathClear = (board, startCell, endCell) => {
  // Handle single-step moves
  if (Math.abs(startCell.x - endCell.x) <= 1 && Math.abs(startCell.y - endCell.y) <= 1) {
    return endCell.piece === null;
  }

  // Handle multi-step moves
  const dx = (endCell.x - startCell.x) / Math.abs(endCell.x - startCell.x) || 0;
  const dy = (endCell.y - startCell.y) / Math.abs(endCell.y - startCell.y) || 0;

  let x = startCell.x + dx;
  let y = startCell.y + dy;

  while (x !== endCell.x || y !== endCell.y) {
    const cell = board[y][x];
    if (cell.piece !== null) {
      return false; // Path is obstructed
    }
    x += dx;
    y += dy;
  }

  return true; // Path is clear
};

/**
 * Moves a piece on the board.
 *
 * @param {Array<Array<Object>>} board The game board.
 * @param {Object} startCell The starting cell.
 * @param {Object} endCell The ending cell
 * @returns {boolean} True if the move is valid and was made, false otherwise
 */
const move = (board, startCell, endCell) => {
  if (!isValidMove(board, startCell, endCell)) {
    return false; 
  }
  endCell.piece = startCell.piece;
  startCell.piece = null;
  return true;
};

/**
 * Checks if a move is valid.
 *
 * @param {Array<Array<Object>>} board The game board.
 * @param {Object} startCell The starting cell.
 * @param {Object} endCell The ending cell.
 * @returns {boolean} True if the move is valid, false otherwise.
 */
const isValidMove = (board, startCell, endCell) => {
  // Check if the start cell contains a piece
  if (startCell.piece === null) {
    return false;
  }

  // Check if the end cell is within the board boundaries
  if (endCell.x < 0 || endCell.x >= board[0].length || endCell.y < 0 || endCell.y >= board.length) {
    return false;
  }

  // Check if the path is clear
  if (!isPathClear(board, startCell, endCell)) {
    return false;
  }

  // Check if capturing is allowed
  const isCapturing = endCell.piece !== null && endCell.piece.player !== startCell.piece.player;
  if(isCapturing) return true;

  //Check for two-step movement for Hero1 and Hero2
  if(startCell.piece.type === 'Hero1' || startCell.piece.type === 'Hero2'){
    if(Math.abs(startCell.x - endCell.x) > 1 || Math.abs(startCell.y - endCell.y) > 1){
        return false;
    }
  }
  
  // Add more move validation rules here as needed
  return true; // Move is valid
};

module.exports = {
  isPathClear,
  move,
  isValidMove,
};