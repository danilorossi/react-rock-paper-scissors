import * as Action from './types';

/**
* @description Notify Redux with a new finished game.
* @param {String} opponentName - The name of the opponent in the game just ended.
* @param {String} winner - 'PLAYER' || 'OPPONENT'
*/
export function saveGameResult(opponentName, winner) {
  return {
    type: Action.ADD_GAME_RESULT,
    opponentName,
    winner
  };
}
