import * as Action from './types';
import DummyApi from '../api/dummyApi';
import RemoteApi from '../api/remoteApi';
import * as RoundStatus from '../globals/roundStatus';
import * as GameStatus from '../globals/gameStatus';
import * as GameType from '../globals/gameType';
import { whoWins } from '../services/gameRules';

/**
* @description Notify Redux that a new game has started
* @param {String} gameType - One of the states defined in 'src/globals/gameType.js'
*/
export function startNewGame(gameType) {
  return {
    type: Action.START_GAME,
    gameType
  };
}

/**
* @description Notify Redux of a round status change
* @param {String} gameType - One of the states defined in 'src/globals/roundStatus.js'
*/
export function changeRoundState(nextState, data) {
  return {
    type: Action.ROUND_STATE_CHANGED,
    nextState,
    data
  };
}

/**
* @description Notify Redux that a round has finished
* @param {String} winner - 'PLAYER' || 'OPPONENT'
*/
export function roundFinished(winner) {
  return {
    type: Action.ROUND_FINISHED,
    winner
  };
}

/**
* @description Thunk for game management.
* @param {Number} playerShapeCode - The shape chosen by the player.
*/
export function playerMoves(playerShapeCode) {

    return function(dispatch, getState) {
        const { currentGame } = getState();

        // Depending on the game ('LOCAL' || 'REMOTE')
        // use a different API
        const apiRef = currentGame.type === GameType.LOCAL ? DummyApi : RemoteApi;

        // Round status change: WAITING_PLAYER_CHOICE to PLAYER_MOVES
        dispatch(changeRoundState(RoundStatus.PLAYER_MOVES, { playerShapeCode }));

        // Return promise: get opponent move
        return apiRef.nextOpponentMove()
          .then(data => {
            // Evaluate how the game ends
            return evaluateGame(data, playerShapeCode, dispatch, getState)
          }, err => {
            // If there is any network error, force the local opponent to keep working
            // and valuate how the game ends.
            console.warn('RPC Error while asking for opponent next move: using local bot for this request')
            return DummyApi.nextOpponentMove().then(data => evaluateGame(data, playerShapeCode, dispatch, getState))
          });
    };
}

/**
* Utility function to deal with an error in the 'playerMoves' thunk.
* Once we have the players shapes, we can keep working with the redux state.
*/
const evaluateGame = (data, playerShapeCode, dispatch, getState) => {

  // Set new round status: PLAYER_MOVES to OPPONENT_MOVES
  dispatch(changeRoundState(RoundStatus.OPPONENT_MOVES, { opponentShapeCode: data.nextOpponentMove }));

  // Get to know who wins this round
  const winner = whoWins(playerShapeCode, data.nextOpponentMove);

  // Mark the round as finished: OPPONENT_MOVES to ROUND_FINISHED
  dispatch(roundFinished(winner));

  // Return promise
  return new Promise((resolve, reject) => {

    // Force delay on the UI to give the user some time to check the result
    setTimeout(
      () => {
        const { currentGame } = getState();
        // Change the Round status depending on the game status.
        // If the game is ongoing, then we start again from 'WAITING_PLAYER_CHOICE'
        // Otherwise we mark the round as finished
        dispatch(changeRoundState(currentGame.status === GameStatus.FINISHED ? RoundStatus.GAME_FINISHED : RoundStatus.WAITING_PLAYER_CHOICE))
        resolve();
      }, 2500);
  })
}
