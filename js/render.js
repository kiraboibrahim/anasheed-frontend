function render_singers(container, data, template, error, restore=false) {

    if(!error) {
      for(let singer of data) {
        image = `${ARTIST_IMAGES_URL}/${singer.image}`;
        if(!restore) {
          // These images have not yet been loaded, so set the data-src attribute
          artist = template.replace("{{lazy_image}}", image)
          .replace("{{lazy}}", "lazy").replace("image", "");
        } else {
          // set the background image, because it was already downloaded
          artist = template.replace("{{image}}", image);
        }
        artist_tracks_url = `${HOST}/artists/${singer.id}/tracks`;
        artist = artist.replace("{{name}}", singer.name)
        .replace("{{num_songs}}", singer.num_songs)
        .replace("{{tracks_url}}", artist_tracks_url);
        // Append the singer to the container
        container.append($(artist));
      }
      lazyload();
    }
    else {
      // Alert the user that error occured when fetching resources
      console.log("Error occured.");
    }

}

function render_songs(container, data, template, error) {
  if(!error) {
    for(let track of data) {
      stream_url = `${STREAM_URL}?ref=${track.stream_reference}&t=${track.id}`;
      track_= template.replace("{{name}}",track.name)
      .replace("{{listeners}}", track.listeners)
      .replace("{{play_url}}", stream_url)
      .replace("{{download_url}}", `${stream_url}&download=true`);

      // Append the singer to the container
      container.append($(track_));
    }
  }
  else {
    // Alert the user that error occured when fetching resources
    console.log("Error occured.");
  }

}

function render_singers_inline(container, data, template, error) {
  if(!error) {
    for(let singer of data) {
      image = `${ARTIST_IMAGES_URL}/${singer.image}`;
      // These images have not yet been loaded, so set the data-src attribute
      artist = template.replace("{{lazy_image}}", image)
      .replace("{{lazy}}", "lazy")
      .replace("{{name}}", singer.name);

      // Append the singer to the container
      container.append($(artist));
    }
    lazyload();
  }
  else {
    // Alert the user that error occured when fetching resources
    console.log("Error occured.");
  }
}
