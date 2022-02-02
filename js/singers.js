let selected_singer = {
  name: null,
  image: null,
  num_songs: null,
};

let singers_data = [
  {
    "name": "Mesut Kurtis",
    "image": "images/artist-placeholder.jpg",
    "num_songs": 100,
    "singer_detail": "/maher-zain/1929"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/maher-zain-1.jpeg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/artist-placeholder.jpg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/maher-zain-1.jpeg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/maher-zain-1.jpeg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/artist-placeholder.jpg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/maher-zain-1.jpeg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/maher-zain-1.jpeg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/artist-placeholder.jpg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/maher-zain-1.jpeg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/maher-zain-1.jpeg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/artist-placeholder.jpg",
    "num_songs": 192,
    "singer_detail": "#"
  },
  {
    "name": "Mesut Kurtis",
    "image": "images/maher-zain-1.jpeg",
    "num_songs": 192,
    "singer_detail": "#"
  },
];// end data;

let songs_data = [
  {
    "name": "Insha Allah",
    "listens": 10,
    "stream_link": "test_3.mp3",
    "download_link": "test_3.mp3"
  },
  {
    "name": "Ya Nabbi Salam Alayka",
    "listens": 100,
    "stream_link": "test.mp3",
    "download_link": "test.mp3"
  },
  {
    "name": "Burdah",
    "listens": 200,
    "stream_link": "test.mp3",
    "download_link": "test.mp3"
  },
  {
    "name": "Medinah",
    "listens": 1000,
    "stream_link": "test_3.mp3",
    "download_link": "maher-zain/1929"
  },
  {
    "name": "Palestein",
    "listens": 59,
    "stream_link": "test_3.mp3",
    "download_link": "maher-zain/1929"
  },
]; // End Data

const back_btn = $("#back-to-singers");
const media_container = $("#media-wrapper");
const singers_body = $(".singers");

function back_to_singers() {
  const title = "Anasheed Artists";
  const singer_template = $(".singer-template").clone(true).removeClass("template");
  // Hide the back button when in singers view
  back_btn.addClass("h-hide");
  // Change the title back to "Singers" since the songs view is the scope now
  singers_body.find(".singers__title").text(title);


  // Re render the artists, We are restoring the artists view, restore = true, since there is no need to lazy load the background images again
  render_singers(media_container, singers_data, singer_template, false, true);
}

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
  $(".track-template__play").click(play_selected_song);
  back_btn.click(function () {
    // Remove all tracks (if any) currently in the singers_container but dont remove the template
    media_container.empty();
    back_to_singers();
  }); // End click
  // After page load, render the artists
  const singer_template = $(".singer-template").clone(true).removeClass("template");
  // Fetch artists data and pass it to the render_singers fuction

  fetch_data(ARITSTS_URL)
  .then(function (data) {
    render_singers(media_container, data, singer_template, false);

    // Turn off the loading gif
    singers_body.attr("data-loading", "false");
  }); // End fetch_data


  // If a user clicks on the show-songs link, show artist's songs
  $(".singer-template__show-songs-link").click(function (event) {
    event.preventDefault(); // Donot follow the link
    // Retrieve the template everytime you are going to use it, in order to have all the properties and events intact
    const track_template = $(".track-template").clone(true).removeClass("template");
    const singer_tracks_url = $(event.target).attr('href'); // Use it in fetch to fetch singer's songs
    // This is the overall component, use it to find the other children
    const parent = $(event.target).parents(".singer");
    const singer_name = parent.find(".singer__name").text();

    // Turn on loading gif before fetching the artist's tracks
    singers_body.attr("data-loading", "true");
    // Fetch data over the network and render the songs
    fetch_data(singer_tracks_url)
    .then(function (data) {
      //  Clear the media contianer (Every singer element is removed)
      media_container.empty();

      render_songs(media_container, songs_data, track_template, false);
      // Turn off the loading gif
      singers_body.attr("data-loading", "false");
      back_btn.removeClass("h-hide");
    });

    // Let the article title also show to which artist do the songs currently viewed belong
    singers_body.find(".singers__title").text(`${singer_name}'s tracks`);
  }); // End click

}); // end ready
