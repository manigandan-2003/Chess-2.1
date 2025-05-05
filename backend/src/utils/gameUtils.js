/**
 * Checks if the path between two points on the board is clear.
 *
 * @param {Array<Array<number>>} board The game board.
 * @param {number} startX The starting x-coordinate.
 * @param {number} startY The starting y-coordinate.
 * @param {number} endX The ending x-coordinate.
 * @param {number} endY The ending y-coordinate
 * @param {number} player The current player (1 or 2)
 * @returns {boolean} True if the path is clear, false otherwise.
 */
const isPathClear = (board, startX, startY, endX, endY, player) => {
  // Handle the case where the start and end positions are the same
  if (startX === endX && startY === endY) {
    return true;
  }

  // Calculate the direction of movement
  const dx = endX - startX;
  const dy = endY - startY;

  // Calculate the number of steps to take
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  // Calculate the step size
  const stepX = dx / steps;
  const stepY = dy / steps;

  // Check each point along the path
  for (let i = 1; i <= steps; i++) {
    const x = startX + stepX * i;
    const y = startY + stepY * i;

    // Check if the point is within the bounds of the board
    if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) {
      return false; // Path is outside the board
    }

    // Check if the point is occupied by a piece
    const piece = board[x][y];
    if (piece !== 0) {
      //if path is blocked by own piece, return false
      if (piece === player) {
        return false;
      }
      //if path is blocked by opponent's piece, return true to allow capturing
      else{
        return true;
      }
    }
  }

  // Path is clear
  return true;
};

module.exports = { isPathClear };