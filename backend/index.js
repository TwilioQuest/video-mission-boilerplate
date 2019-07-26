require("dotenv").config();
const twilio = require("twilio");
const express = require("express");
const http = require("http");
const path = require("path");
var AccessToken = twilio.jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_ACCOUNT_AUTH_TOKEN
);
const app = express();

const distPath = path.join(__dirname, "../dist");
app.use("/", express.static(distPath));

/**
 * Generate an Access Token for a chat application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 */
app.get("/token/:name", function(request, response) {
  const identity = request.params.name || "default-name";

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  var grant = new VideoGrant();
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response.
  response.send({
    identity: identity,
    token: token.toJwt()
  });
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Express server running on *:" + port);
});

app.get("/room/create/:name", function(request, response) {
  client.video.rooms
    .create({ uniqueName: request.params.name })
    .then(room => {
      response.send({
        room
      });
    })
    .catch(err => {
      response.send({ err });
    });
});

app.get("/room/close/:name", function(request, response) {
  client.video
    .rooms(request.params.name)
    .fetch()
    .then(room => {
      client.video
        .rooms(room.sid)
        .update({ status: "completed" })
        .then(room => {
          response.send({
            room
          });
        });
    })
    .catch(err => {
      response.send({ err });
    });
});
