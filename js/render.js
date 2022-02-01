function render_singers(container, data, template, error, restore=false) {
    if(!error) {
      for(let singer of data) {
        singer.image = `${ARTIST_IMAGES_URL}/${singer.image}`;
        console.log(singer.image);
        if(!restore) {
          // These images have not yet been loaded, so set the data-src attribute
          template.children(".singer-template__image").attr("data-src", singer.image).addClass("lazy");
        } else {
          // set the background image, because it was already downloaded
          template.children(".singer-template__image").css("backgroundImage", `url(${singer.image})`);

        }
        template.find(".singer-template__link").text(singer.name);
        template.find(".singer-template__num-songs").text(`${singer.num_songs} Clips`);
        template.find(".singer-template__show-songs-link").attr("href", "#");

        // Append the singer to the container
        container.append(template);
        template = template.clone(true);
      }
    }
    else {
      // Alert the user that error occured when fetching resources
      console.log("Error occured.");
    }

}

function render_songs(container, data, template, error) {
  if(!error) {
    for(let track of data) {
      template.find(".track-template__link").text(track.name).attr("href", TEST_TRACK_STREAM);
      template.find(".track-template__listens").text(`${track.listeners} Listeners`);
      template.find(".track-template__play").attr("href", TEST_TRACK_STREAM);
      template.find(".track-template__downnload").attr("href", TEST_TRACK_STREAM);


      // Append the singer to the container
      container.append(template);
      template = template.clone(true);
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
      singer.image = `${ARTIST_IMAGES_URL}/${singer.image}`;
      // These images have not yet been loaded, so set the data-src attribute
      template.children(".artist-template__image").attr("data-src", singer.image).addClass("lazy");

      template.find(".artist-template__link").text(singer.name);

      // Append the singer to the container
      container.append(template);
      template = template.clone(true);
    }
  }
  else {
    // Alert the user that error occured when fetching resources
    console.log("Error occured.");
  }
}
