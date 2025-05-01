// Define move sets for characters
const moveSets = {
    Pawn: ['L', 'R', 'F', 'B'],
    Hero1: ['L', 'R', 'F', 'B'],
    Hero2: ['FL', 'FR', 'BL', 'BR'],
  };
  
  // Function to validate a move for a character
  export const validateMove = (type, move) => {
    return moveSets[type].includes(move);
  };
  
  // Function to get all valid moves for a character type
  export const getValidMoves = (type) => {
    return moveSets[type] || [];
  };
  