var express = require('express')
var router = express.Router()

/**
* @description Opponent random hand shape choice.
* @returns {Promise} A random number between 1 and 3 (both inclusive),
                    each number represents a shape (check src/globals/shapeCode.js).
*/
const randomMove = () => {
  // Generate a random value between 1 and 3 (both inclusive)
  return Math.floor(Math.random() * 3) + 1
}

/**
* @description '/random_move' route management.
* @param {Object} req - The http request
* @param {Object} res - The http response
* @returns {JSON} A JSON object with a 'nextOpponentMove' field having
                  as a value the result of a new call of the 'randomMove' function.
*/
router.get('/random_move', function (req, res) {

  // Create result object
  const response = { nextOpponentMove: randomMove() }

  // Log
  console.log('[V1 API - /random_move] > ', response)

  // Convert to JSON and return to client
  res.json(response)
})

// Export router
module.exports = router
