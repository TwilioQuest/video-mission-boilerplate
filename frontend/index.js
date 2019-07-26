import Video from "twilio-video";

fetch("http://localhost:3000/token")
  .then(response => {
    return response.json();
  })
  .then(({ identity, token }) => {
    console.log(JSON.stringify(token));
    Video.connect("token", { name: "room-name" }).then(room => {
      console.log('Connected to Room "%s"', room.name);

      //   room.participants.forEach(participantConnected);
      //   room.on("participantConnected", participantConnected);

      //   room.on("participantDisconnected", participantDisconnected);
      //   room.once("disconnected", error =>
      //     room.participants.forEach(participantDisconnected)
      //   );
    });
  });

// $.getJSON("/token", function(data) {
//   identity = data.identity;
//   document.getElementById("room-controls").style.display = "block";

//   // Bind button to join Room.
//   document.getElementById("button-join").onclick = function() {
//     roomName = document.getElementById("room-name").value;
//     if (!roomName) {
//       alert("Please enter a room name.");
//       return;
//     }

//     log("Joining room '" + roomName + "'...");
//     var connectOptions = {
//       name: roomName,
//       logLevel: "debug"
//     };

//     if (previewTracks) {
//       connectOptions.tracks = previewTracks;
//     }

//     // Join the Room with the token from the server and the
//     // LocalParticipant's Tracks.
//     Video.connect(data.token, connectOptions).then(roomJoined, function(error) {
//       log("Could not connect to Twilio: " + error.message);
//     });
//   };

//   // Bind button to leave Room.
//   document.getElementById("button-leave").onclick = function() {
//     log("Leaving room...");
//     activeRoom.disconnect();
//   };
// });

// Video.connect("$TOKEN", { name: "room-name" }).then(room => {
//   console.log('Connected to Room "%s"', room.name);

//   //   room.participants.forEach(participantConnected);
//   //   room.on("participantConnected", participantConnected);

//   //   room.on("participantDisconnected", participantDisconnected);
//   //   room.once("disconnected", error =>
//   //     room.participants.forEach(participantDisconnected)
//   //   );
// });
