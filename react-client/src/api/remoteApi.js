/*
* Class for remote NodeJS server API communication.
*/
class RemoteApi {

  /**
  * @description Return the next shape chosen by the opponent.
  * @returns {String} A JSON object with a 'nextOpponentMove' field having
                      as a value the shape code.
  */
  static nextOpponentMove() {

    // Return promise
    return new Promise((resolve, reject) => {

      fetch('/api/v1/random_move') // GET the expected route
      .then(data => data.json()) // Convert result to json
      .then(jsonData => {
        resolve(jsonData);  // Resolve object
      })
      .catch(error => reject(error)); // Or reject with error
    })
  };

}

export default RemoteApi;
