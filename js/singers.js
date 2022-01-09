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
const selected_singer_template = $(".current-artist-template");

function back_to_singers() {
  const singer_template = $(".singer-template").clone(true).removeClass("template");
  // Hide the back button when in singers view
  back_btn.addClass("h-hide");
  // Change the title back to "Singers" since the songs view is the scope now
  $(".singers").find(".article__title").text("Singers");
  $(".current-artist-template").addClass("h-invisible");


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

  // After page load, render the artists
  const singer_template = $(".singer-template").clone(true).removeClass("template");
  render_singers(media_container, singers_data, singer_template, false);

  // If a user clicks on the show-songs link, show artist's songs
  $(".singer-template__show-songs-link").click(function (event) {
    event.preventDefault(); // Donot follow the link
    const track_template = $(".track-template").clone(true).removeClass("template");
    const singer_detail_url = $(event.target).attr('href'); // Use it in fetch to fetch singer's songs
    // This is the overall component, use it to find the other children
    const parent = $(event.target).parents(".singer");

    const singer_name = parent.find(".singer__name").text();
    selected_singer.name = name;
    // Get the background image and strip out all the "url", () characters
    selected_singer.image = parent.find(".singer__image").css("background-image").replace(/(url\()|"|\)/g, "");
    selected_singer.num_songs = parent.find(".singer__num-songs").text();
    // Fetch data over the network and render the songs
    // let songs_data = fetch_data(singer_detail_url, render_songs);


    // Show the current artist artist whose are currently being viewed
    render_selected_singer(selected_singer, selected_singer_template);
    // Let the article title also show to which artist do the songs currently viewed belong
    $(".singers").find(".article__title").text(`${singer_name}'s songs`);

    //  Clear the media contianer (Every singer is removed)
    media_container.empty();
    render_songs(media_container, songs_data, track_template, false);
    back_btn.removeClass("h-hide");
  }); // End click

  back_btn.click(function () {
    // Remove all tracks (if any) currently in the singers_container but dont remove the template
    media_container.empty();
    back_to_singers();
  }); // End click

  $(".track-template__play").click(play_selected_song);
}); // end ready
