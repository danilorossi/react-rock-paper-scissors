import { MOCKED_API_DELAY } from './delay';

/**
* @description Opponent random hand shape choice.
* @returns {Promise} A random number between 1 and 3 (both inclusive),
                    each number represents a shape (check src/globals/shapeCode.js).
*/
const randomMove = () => {
  return Math.floor(Math.random() * 3) + 1
}

/*
* Class for local API communication.
*/
class DummyApi {

  /**
  * @description Return the next shape chosen by the opponent.
  * @returns {String} A JSON object with a 'nextOpponentMove' field having
                      as a value the shape code.
  */
  static nextOpponentMove() {

    return new Promise((resolve, reject) => setTimeout(
      () => resolve({ nextOpponentMove: randomMove() }), MOCKED_API_DELAY
    ));

  };

}

export default DummyApi;
