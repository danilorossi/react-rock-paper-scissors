
import * as Action from '../actions/types';
import initialState from './initialState';
import * as GameStatus from '../globals/gameStatus';
import * as RoundStatus from '../globals/roundStatus';

// Max energy for each player: 100 as I am using a progress bar to represent it
const MAX_ENERGY = 100;

// Every time a player wins a game, the opponent has its energy level decreased by
// this amount. Default is 25, which means that we are playing 4-round games.
const DAMAGE_AMOUNT = 25;

// Reducer for currentGame store section
export default function gameReducers(state = initialState.currentGame, action) {

    switch(action.type) {

      // The user starts a new game
      case Action.START_GAME:

        return {

          // NEVER not mutate Redux state
          ...state,

          // If the game is local or remote (check src/globals/gameType.js)
          type: action.gameType, // 'LOCAL' || 'REMOTE'

          // Initial player energy
          playerEnergy: MAX_ENERGY,

          // Initial opponent energy
          opponentEnergy: MAX_ENERGY,

          // Initial player shape code (not yet playing)
          playerShapeCode: null,

          // Initial opponent shape code (not yet playing)
          opponentShapeCode: null,

          // Player name
          playerName: 'YOU',

          // Opponent name
          opponentName: `${action.gameType} BOT`,

          // Game status (check src/globals/gameStatus.js)
          status: GameStatus.ONGOING, // 'ONGOING' || 'FINISHED'

          // Round status status (check src/globals/roundStatus.js)
          // WAITING_PLAYER_CHOICE || PLAYER_MOVES || OPPONENT_MOVES || ROUND_FINISHED || GAME_FINISHED
          roundState: RoundStatus.WAITING_PLAYER_CHOICE,

          // The winner of the round (and game)
          winner: null
        };

      // Round state changes
      case Action.ROUND_STATE_CHANGED:

        const shapeCode = {};

        // If next state is PLAYER_MOVES
        if(action.nextState === 'PLAYER_MOVES') {

          // Update the chosen shape code for the player
          shapeCode.playerShapeCode = action.data.playerShapeCode;
        }

        // If next state is OPPONENT_MOVES
        if(action.nextState === 'OPPONENT_MOVES') {

          // Update the chosen shape code for the opponent
          shapeCode.opponentShapeCode = action.data.opponentShapeCode;
        }

        return {
          ...state,
          roundState: action.nextState, // Update state
          ...shapeCode // Update player or opponent chosen shape code
        };

      // Round finishes
      case Action.ROUND_FINISHED:

        // Action.winner: 'PLAYER' || 'OPPONENT'

        // If it´s a TIE
        if(action.winner === null) {
          return {
            ...state,
            roundState: 'ROUND_FINISHED', // Mark round as finished
            winner: null // Mark round finished with a TIE
          };
        } else { // If we have a winner

          // We know the winner, get the looser
          const looserEnergyKey = action.winner === 'PLAYER' ? 'opponentEnergy' : 'playerEnergy' ;

          // Decrease the looser energy
          const looserNewEnergy = state[looserEnergyKey] - DAMAGE_AMOUNT;

          return {

            // Never mutate
            ...state,

            // Mark round as finished
            roundState: 'ROUND_FINISHED',

            // Update looser energy
            [looserEnergyKey]: looserNewEnergy,

            // If looser energy is 0, then the game is finished
            // Otherwise we keep playing
            status: (looserNewEnergy === 0 ? 'FINISHED' : 'ONGOING'),

            // Mark the winner (of the round or the game, depending on the above status)
            winner: action.winner
          };
        }

      default:
          return state;

    }

}
