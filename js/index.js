function play_selected_song(event) {
  event.preventDefault();
  let target = $(event.target);
  let name = target.siblings(".track__name").text();
  let src = target.attr("href");
  track = {
    name: `${name}`,
    src: `${src}`
  };
  // From the audio-player.js
  play(track);
}

$(document).ready(function () {
  // When an artist card is clicked (not exactly the link), follow the artist's link
  $(".artist-template").click(function() {
    const url = $(this).find(".artist-template__link").attr("href");
    document.location = url;
  }); // End click
  // Play song
  $(".track-template__play").click(play_selected_song);
  
  const top_tracks_container = $(".top-tracks__body");
  const top_artists_container = $(".top-artists__body");
  const inline_artist_template = $(".artist-template").clone(true).removeClass("template");
  const index_track_template = $(".track-template").clone(true).removeClass("template");
  //Fetch popular artists data and pass it to the render_singers_inline function
  fetch_data(POPULAR_ARTISTS_URL)
  .then(function (data) {
    render_singers_inline(top_artists_container, data, inline_artist_template, false);
    $(".top-artists").attr("data-loading", "false"); // Turn off the loading gif
  });

  // Fetch popular tracks data and pass it to the render_songs function
  fetch_data(POPULAR_TRACKS_URL).
  then(function(data) {
    render_songs(top_tracks_container, data, index_track_template, false);
    $(".top-tracks").attr("data-loading", "false"); // Turn off the loading gif, fetching and rendering completed
  })


}); // End ready
