require("dotenv").config();
const twilio = require("twilio");

try {
  const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_ACCOUNT_AUTH_TOKEN
  );

  client.video
    .rooms("DailyStandup")
    .fetch()
    .then(room => {
      console.log(room);
    });

  client.video
    .rooms("DailyStandup")
    .participants.list()
    .then(participant => {
      console.log(participant);
    });
} catch (err) {
  console.error(err);
}
