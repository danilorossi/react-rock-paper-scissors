const express = require("express")
const app = express()

/* API Version 1 */
var API_v1 = require('./api.v1')

app.set("port", process.env.PORT || 3001)

/* For production, not used at the moment */
if (process.env.NODE_ENV === "production") {

  // 'build' is the target for the create-react-app application build script
  app.use(express.static("react-client/build"))
}

/* Use our API starting from route '/api/v1' */
app.use('/api/v1', API_v1)

/* Start listetning */
app.listen(app.get("port"), () => {

  console.log(`### Server listening: http://localhost:${app.get("port")}/`) // eslint-disable-line no-console
})
