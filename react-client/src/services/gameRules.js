/*
* Shape codes from src/globals/shapeCode.js:
*   export const ROCK = 1;
*   export const PAPER = 2;
*   export const SCISSORS = 3;
*/

/*
* Utility hashtable to quickly get a game result given
* two shape codes. It basically defines the game rules.
*/
const RESULTS_MATRIX = {
  '11': null,
  '12': 'OPPONENT',
  '13': 'PLAYER',
  '21': 'PLAYER',
  '22': null,
  '23': 'OPPONENT',
  '31': 'OPPONENT',
  '32': 'PLAYER',
  '33': null,
}

/**
* @description Given two shapes, return the winner.
* @param {int} playerShapeCode - The shape code for the player chosen shape.
* @param {int} opponentShapeCode - The shape code for the opponent chosen shape.
* @returns {String} 'OPPONENT' if the second shape is the winner, 'PLAYER' if the
                    first shape is the winner, null if it´s a tie.
*/
export const whoWins = (playerShapeCode, opponentShapeCode) => {

  return RESULTS_MATRIX[`${playerShapeCode}${opponentShapeCode}`];
}
