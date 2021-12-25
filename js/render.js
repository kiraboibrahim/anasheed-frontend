function render_singers(container, data, error, restore=false) {
    // Remove all tracks currently in the singers_container but dont remove the template
    $(".track").not(".template").remove();
    let singer_template = $(".singer-template").clone(true).removeClass("template");
    if(!error) {
      for(let singer of data) {
        if(!restore) {
          singer_template.children(".singer-template__image").attr("data-src", singer.image).addClass("lazy");
        } else {
          // Justs set the background image
          singer_template.children(".singer-template__image").css("backgroundImage", `url(${singer.image})`);

        }
        singer_template.find(".singer-template__link").text(singer.name);
        singer_template.find(".singer-template__num-songs").text(`${singer.num_songs} Clips`);
        singer_template.find(".singer-template__show-songs-link").attr("href", singer.singer_detail);

        // Append the singer to the container
        container.append(singer_template);
        singer_template = singer_template.clone(true);
      }
    }
    else {
      // Alert the user that error occured when fetching resources
      console.log("Error occured.");
    }

}

function restore_singers_view() {

}
function render_selected_singer(selected_singer) {
  let selected_singer_template = $(".current-artist-template");
  selected_singer_template.find(".current-artist-template__name").text(selected_singer.name);
  selected_singer_template.find(".current-artist-template__image").css("backgroundImage", `url(${selected_singer.image})`);
  selected_singer_template.find(".current-artist-template__num-songs").text(selected_singer.num_songs);
  $(".singers").find(".article__title").text(`${selected_singer.name}'s songs`);
  selected_singer_template.removeClass("h-invisible");
}

function render_songs(selected_singer, data, error) {
  const container = $("#media-wrapper");
  container.empty(); // Remove any child nodes that exist in the wrapper
  let track_template = $(".track-template").clone(true).removeClass("template");
  // Render the selected artist
  render_selected_singer(selected_singer);
  if(!error) {
    for(let track of data) {
      track_template.find(".track-template__link").text(track.name).attr("href", track.stream_link);
      track_template.find(".track-template__listens").text(`${track.listens} Listeners`);
      track_template.find(".track-template__play").attr("href", track.stream_link);
      track_template.find(".track-template__downnload").attr("href", track.download_link);


      // Append the singer to the container
      container.append(track_template);
      track_template = track_template.clone(true);
    }
  }
  else {
    // Alert the user that error occured when fetching resources
    console.log("Error occured.");
  }

}
