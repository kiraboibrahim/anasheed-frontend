
let singers = [
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

let tracks = [
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

$(document).ready(function () {
  // When an artist card is clicked (not exactly the link), follow the artist's link
  $(".artist-template").click(function() {
    const url = $(this).find(".artist-template__link").attr("href");
    document.location = url;
  }); // End click
  const top_tracks_container = $(".top-tracks__body");
  const top_artists_container = $(".top-artists__body");
  const inline_artist_template = $(".artist-template").clone(true).removeClass("template");
  const index_track_template = $(".track-template").clone(true).removeClass("template");
  render_singers_inline(top_artists_container, singers, inline_artist_template, false);
  render_songs(top_tracks_container, tracks, index_track_template, false);

}); // End ready
