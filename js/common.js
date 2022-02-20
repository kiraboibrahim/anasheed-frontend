function count_listen(id) {
  let url = `https://anasheed.pythonanywhere.com/tracks/${id}/listener`;
  fetch(url, {
      // Adding method type
      method: "POST",
    }
  ); // I don't care about the response
}

function count_download(id) {
  let url = `https://anasheed.pythonanywhere.com/tracks/${id}/download`;
  fetch(url, {
      // Adding method type
      method: "POST",
    }
  ); // I don't care about the response
}

function play_song(event) {
  event.preventDefault();
  open_player(); // Show fullscreen player to user
  let target = $(event.target);
  let name = target.siblings(".track__name").text();
  let src = target.attr("href");
  track = {
    name: `${name}`,
    src: `${src}`
  };
  let id_regex = /.*t=(?<id>\d+)/;
  let id = src.match(id_regex).groups.id;
  // Increment the listens for the song
  count_listen(id);
  // From the audio-player.js
  play(track);
}
