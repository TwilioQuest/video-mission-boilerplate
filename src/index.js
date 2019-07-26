require("dotenv").config();

try {
  const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_SECRET
  );

  //   client.video.rooms.create({ uniqueName: "DailyStandup" }).then(room => {
  //     console.log(room);
  //   });

  console.log(Object.keys(client.video.rooms("DailyStandup")));

  //   client.video
  //     .rooms("DailyStandup")
  //     .fetch()
  //     .then(room => {
  //       console.log(room);
  //       client.video
  //         .rooms(room.sid)
  //         .update({ status: "completed" })
  //         .then(room => console.log(room.uniqueName));
  //     });
} catch (err) {
  console.error(err);
}
