import Video from "twilio-video";

const searchParams = new URLSearchParams(document.location.search);

fetch(`http://localhost:3000/token?name=${searchParams.get("name")}`, {
  cache: "no-cache"
})
  .then(response => {
    return response.json();
  })
  .then(({ identity, token }) => {
    console.log(identity);
    console.log(JSON.stringify(token));
    Video.connect(token, { name: "DailyStandup" }).then(room => {
      console.log('Connected to Room "%s"', room.name);
      console.log(room);

      room.participants.forEach(participantConnected);
      room.on("participantConnected", participantConnected);

      room.on("participantDisconnected", participantDisconnected);
      room.once("disconnected", error =>
        room.participants.forEach(participantDisconnected)
      );
    });
  });

function participantConnected(participant) {
  console.log('Participant "%s" connected', participant.identity);

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
  console.log('Participant "%s" disconnected', participant.identity);
  document.getElementById(participant.sid).remove();
}

function trackSubscribed(div, track) {
  div.appendChild(track.attach());
}

function trackUnsubscribed(track) {
  track.detach().forEach(element => element.remove());
}
