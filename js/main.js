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
const singers_container = $("#media-wrapper");

function showSongs(event) {
    const link = $(event.target).attr('href');
    const parent = $(event.target).parents(".singer");

    selected_singer.name = parent.find(".singer__name").text();
    // Get the background image and strip out all the "url", () characters
    selected_singer.image = parent.find(".singer__image").css("background-image").replace(/(url\()|"|\)/g, "");
    selected_singer.num_songs = parent.find(".singer__num-songs").text();
    // Fetch data over the network and render the songs
    // let songs_data = fetch_data(link, render_songs);
    // Example data
    render_songs(selected_singer, songs_data, false);

    back_btn.removeClass("h-hide");
    return false;
}

function back_to_singers() {
  // Hide the back button when in singers view
  back_btn.addClass("h-hide");
  // Change the title back to "Singers" since the songs view is the scope now
  $(".singers").find(".article__title").text("Singers");
  $(".current-artist-template").addClass("h-invisible");
  // Re render the artists, We are restoring the artists view
  render_singers(singers_container, singers_data, false, true);
}

function play_selected_song(event) {
  let target = $(event.target);
  let name = target.siblings(".track__name").text();
  let src = target.attr("href");
  track = {
    name: `${name}`,
    src: `${src}`
  };
  play(track);

  // Dont follow link
  return false;
}
