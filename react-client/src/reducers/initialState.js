/**
* The initial state for the Redux store.
*/
export default {

  // This section if for the home page stats
  stats: {
    games: [],  // List of played games with results
    win: 0,     // Counter for won games
    loss: 0,    // Counter for lost games
    row: 0      // Counter for number of wins in a row
  },

  // This section is for managing a game
  currentGame: {

    // When reloading game route, UNDEFINED status will provoke a redirect to the root
    status: 'UNDEFINED'

    // For the other fields, check the src/reducers/gameReducers.js file
  }
};
