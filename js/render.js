function render_singers(container, data, template, error, restore=false) {
    if(!error) {
      for(let singer of data) {
        if(!restore) {
          // These images have not yet been loaded, so set the data-src attribute
          template.children(".singer-template__image").attr("data-src", singer.image).addClass("lazy");
        } else {
          // set the background image, because it was already downloaded
          template.children(".singer-template__image").css("backgroundImage", `url(${singer.image})`);

        }
        template.find(".singer-template__link").text(singer.name);
        template.find(".singer-template__num-songs").text(`${singer.num_songs} Clips`);
        template.find(".singer-template__show-songs-link").attr("href", singer.singer_detail);

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

function render_selected_singer(selected_singer, template) {
  template.find(".current-artist-template__name").text(selected_singer.name);
  template.find(".current-artist-template__image").css("backgroundImage", `url(${selected_singer.image})`);
  template.find(".current-artist-template__num-songs").text(selected_singer.num_songs);
  // Unhide the selected_artist_temmplate
  template.removeClass("h-invisible");
}

function render_songs(container, data, template, error) {
  if(!error) {
    for(let track of data) {
      template.find(".track-template__link").text(track.name).attr("href", track.stream_link);
      template.find(".track-template__listens").text(`${track.listens} Listeners`);
      template.find(".track-template__play").attr("href", track.stream_link);
      template.find(".track-template__downnload").attr("href", track.download_link);


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
