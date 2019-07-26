import Video from "twilio-video";

const searchParams = new URLSearchParams(document.location.search);

fetch(`http://localhost:3000/token/${searchParams.get("name")}`)
  .then(response => {
    return response.json();
  })
  .then(({ identity, token }) => {
    Video.connect(token, { name: "DailyStandup" }).then(room => {
      room.participants.forEach(participantConnected);
      room.on("participantConnected", participantConnected);

      room.on("participantDisconnected", participantDisconnected);
      room.once("disconnected", error =>
        room.participants.forEach(participantDisconnected)
      );
    });
  });

function participantConnected(participant) {
  const div = document.createElement("div");
  div.id = participant.sid;
  div.innerText = participant.identity;

  participant.on("trackSubscribed", track => trackSubscribed(div, track));
  participant.on("trackUnsubscribed", trackUnsubscribed);

  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      trackSubscribed(div, publication.track);
    }
  });

  document.body.appendChild(div);
}

function participantDisconnected(participant) {
  document.getElementById(participant.sid).remove();
}

function trackSubscribed(div, track) {
  div.appendChild(track.attach());
}

function trackUnsubscribed(track) {
  track.detach().forEach(element => element.remove());
}
