let selected_singer = {
  name: null,
  image: null,
  num_songs: null,
};
let  artists = []; // The artists loaded will be stored to re render them incase back button is pushed

const back_btn = $("#back-btn");
const media_container = $("#media-wrapper");
const singers_article = $(".singers");

function back_to_singers() {
  const title = "Anasheed Artists";
  const singer_template = $("#singer-template").html();
  // Hide the back button when in singers view
  back_btn.addClass("h-hide");
  // Change the title back to "Singers" since the songs view is the scope now
  singers_article.find(".singers__title").text(title);


  // Re render the artists, We are restoring the artists view, restore = true, since there is no need to lazy load the background images again
  render_singers(media_container, artists, singer_template, false, true);
}

$(document).ready(function () {
  $("body").on("click", ".track-template__play", play_song);
  // Capture the click event for download in order to increment the downloads for the track
  $("body").on("click", ".track-template__download", count_download);
  back_btn.click(function () {
    // Remove all tracks (if any) currently in the singers_container but dont remove the template
    media_container.empty();
    back_to_singers();
  }); // End click
  // After page load, render the artists
  const singer_template = $("#singer-template").html();

  // If a user clicks on the show-songs link, show artist's songs
  $("body").on('click', '.singer-template__show-songs-link', function (event) {
    event.preventDefault(); // Donot follow the link
    // Retrieve the template everytime you are going to use it, in order to have all the properties and events intact
    const track_template = $("#track-template").html();
    const singer_tracks_url = $(event.target).attr('href'); // Use it in fetch to fetch singer's songs
    // This is the overall component, use it to find the other children
    const parent = $(event.target).parents(".singer");
    const singer_name = parent.find(".singer__name").text();

    // Turn on loading gif before fetching the artist's tracks
    singers_article.attr("data-loading", "true");
    // Fetch data over the network and render the songs
    fetch_data(singer_tracks_url)
    .then(function (data) {
      //  Clear the media contianer (Every singer element is removed)
      media_container.empty();

      render_songs(media_container, data, track_template, false);
      // Turn off the loading gif
      singers_article.attr("data-loading", "false");
      // Let the article title also show to which artist do the songs currently viewed belong
      singers_article.find(".singers__title").text(`${singer_name}'s tracks`);
      back_btn.removeClass("h-hide");
    }); // End fetch_data

  }); // End click

  // Fetch artists data and pass it to the render_singers fuction

  fetch_data(ARTISTS_URL)
  .then(function (data) {
    // Add the data to artists
    artists.push(...data);
    render_singers(media_container, data, singer_template, false);

    // Turn off the loading gif
    singers_article.attr("data-loading", "false");
  }); // End fetch_data

}); // end ready
