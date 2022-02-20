$(document).ready(function () {
  // When an artist card is clicked (not exactly the link), follow the artist's link
  $(".artist-template").click(function() {
    const url = $(this).find(".artist-template__link").attr("href");
    document.location = url;
  }); // End click
  // Play song
  $("body").on("click", ".track-template__play", play_song);
  // Capture the click event for download in order to increment the downloads for the track
  $("body").on("click", ".track-template__download", count_download);

  $("body").on("click", ".m-media--inline", function () {
    // Allow cards to follow the singer_detail_url when clicked
    document.location.href = $(this).find(".media__link").attr("href");
  }); // Edn click

  const top_tracks_container = $(".top-tracks__body");
  const top_artists_container = $(".top-artists__body");
  const inline_artist_template = $("#inline-artist-template").html();
  const index_track_template = $("#track-template").html();

  //Fetch popular artists data and pass it to the render_singers_inline function
  fetch_data(POPULAR_ARTISTS_URL)
  .then(function (data) {
    render_singers_inline(top_artists_container, data, inline_artist_template, false);
    $(".top-artists").attr("data-loading", "false"); // Turn off the loading gif
  })
  .catch(function () {
    console.log("Error")
    $(".top-artists").attr("data-loading", "false");
  }); // End catch

  // Fetch popular tracks data and pass it to the render_songs function
  fetch_data(POPULAR_TRACKS_URL).
  then(function(data) {
    render_songs(top_tracks_container, data, index_track_template, false);
    $(".top-tracks").attr("data-loading", "false"); // Turn off the loading gif, fetching and rendering completed
  })
  .catch(function () {
    console.log("Error")
    $(".top-tracks").attr("data-loading", "false");
  }); // End catch


}); // End ready
