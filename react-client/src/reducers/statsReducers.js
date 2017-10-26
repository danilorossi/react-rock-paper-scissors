
import * as Action from '../actions/types';
import initialState from './initialState';

// Reducer for the home page stats
export default function statsReducers(state = initialState.stats, action) {

    switch(action.type) {

      // When a game is finished, we save it into the store
      case Action.ADD_GAME_RESULT:

        // Do not mutate state: we concat the already
        // existing games array with the newly received
        const games = [{
          ts: Date.now(), // TS is not used, but may be used for sorting etc.
          opponentName: action.opponentName,
          winner: action.winner
        }].concat(state.games);

        // Calculate how many wins in a raw we have
        const inARow = games.reduce((prev, curr) => {

          // We are not counting anymore, already found a loss
          if(!prev.keepCounting) return prev;

          // If the player won this one
          if(curr.winner === 'PLAYER') {
            return {
              ...prev,
              // Increment wins in a row
              count: prev.count + 1
            }
          } else {
            // We found a loss, stop counting wins
            return {
              ...prev,
              keepCounting: false
            }
          }
        }, { // First reducer value
          count: 0,
          keepCounting: true
        }).count;

        // Return the whole stats object
        return {

          // Never mutate state
          ...state,

          // List of played games
          games,

          // Number of won games
          win: (action.winner === 'PLAYER' ? state.win + 1 : state.win),

          // Number of lost games
          loss: (action.winner === 'OPPONENT' ? state.loss + 1 : state.loss),

          // Number of wins in a row
          row: inARow
        };

      default:
          return state;

    }

}
