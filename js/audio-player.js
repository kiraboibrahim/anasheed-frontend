/* Variables to Elements */
let audio_player_container = $(".m-audio-player");
let audio_player_minimized = $(".m-audio-player--is-minimized");
let audio_player_minimize_btn = $(".m-audio-player__minimize");
let seek_slider = $(".m-audio-player__seek-slider");
let current_track_name = $(".m-audio-player__current-track-name");
let played_time = $(".m-audio-player__played-time");
let duration = $(".m-audio-player__duration");
let play_btn = $(".m-audio-player__play-btn");
let prev_btn = $(".m-audio-player__prev-btn");
let next_btn = $(".m-audio-player__next-btn");
let play_container = $(".m-audio-player__play");
let is_playing = false;
let r_af;

// Set the seek slider to 0
seek_slider.val(0);

let audio = document.createElement("audio");
let playlist = [];
let current_track = 0;

function switch_to_play() {
  // Turn off the rotating album art animation when no audio is playing
  audio_player_container.attr("data-playing-state", "false");
  play_btn.text("play_arrow");
}
function switch_to_pause() {
  // Turn on the rotating album art animation when audio is playing
  audio_player_container.attr("data-playing-state", "true");
  play_btn.text("pause");
}

function play(track) {
  if (track) {
    seek_slider.val(0); // Reset the progress bar to zero
    played_time.text("00:00");  // Reset the played_time to 00:00
    audio.src = track.src;
    current_track_name.text(track.name);
    audio.load();
    audio.play();
    requestAnimationFrame(while_playing); // Start updating the seek slider
    // Change the play_btn to pause
    switch_to_pause();
    is_playing = true;
  }
}
function play_pause (event) {
  // Stop audio-player click events from executing
  event.stopPropagation();
  if(audio.src) {
    // Only if there is an audio source
    if(is_playing) {
      audio.pause();
      is_playing = false;
      cancelAnimationFrame(r_af);
      switch_to_play();
    } else {
      audio.play();
      is_playing = true;
      requestAnimationFrame(while_playing);
      switch_to_pause();
    }
  }
  else {
    console.log("Track is not defined");
  }
}

function prev() {
  current_track = current_track - 1;
  // Test for negative values
  if(current_track < 0) {
    //  First track has been reached, go to the last track in the playlist
    current_track = playlist.length - 1;
  }
  // Play the requested track
  play(playlist[current_track]);

}

function next() {
  current_track = current_track + 1;
  // Test for negative values
  if(current_track >= playlist.length) {
    //  Last track has been reached, go to the first track in the playlist
    current_track = 0;
  }
  play(playlist[current_track]);
}
function update_progress_bar() {
  let current_time = audio.currentTime;
  // Update the seek slider with the current time
  seek_slider.val(Math.floor(current_time));
}

function set_played_time() {
  //  update the played time
  let current_time = audio.currentTime;
  let formatted_time = format_time(current_time);
  played_time.text(formatted_time);
}
function set_duration() {
  let track_duration = audio.duration;
  let formatted_track_duration = format_time(track_duration);
  // set the slider's max property to the audio duration
  seek_slider.attr("max", Math.floor(track_duration));
  duration.text(formatted_track_duration);
}

function seek_to(event) {
  if(audio.src) { // Only if the audio source is there, then one is allowed to seek
    let seek_to = Number($(event.target).val());
    seek_slider.val(Math.floor(seek_to));
    audio.currentTime = seek_to;
  }

}

function format_time(time_in_seconds) {
  let hours;
  let minutes;
  let seconds;
  let result;

  hours = Math.floor(time_in_seconds/3600);
  minutes = Math.floor((time_in_seconds%3600) / 60) ;
  seconds = Math.floor((time_in_seconds%3600) % 60);

  if(hours < 10)
    hours = `0${hours}`;
  if(minutes < 10)
    minutes = `0${minutes}`;
  if(seconds < 10)
    seconds = `0${seconds}`;
  // Songs are rarerly an hour long uncomment this if dealing with long audio
  // result = (hours != '00') ? `${hours}:${minutes}:${seconds}` : (minutes != '00') ? `${minutes}:${seconds}` : `00:00:${seconds}`;
  result = `${minutes}:${seconds}`;
  return result;
}
function switch_to_waiting_state() {
  // Turn off the rotating album art animation when no audio is playing
  audio_player_container.attr("data-playing-state", "false");
  play_container.addClass("m-audio-player__play--is-loading");
}
function switch_to_load_finished_state() {
  // Turn on the rotating album art animation when audio is playing
  audio_player_container.attr("data-playing-state", "true");
  play_container.removeClass("m-audio-player__play--is-loading");
}

function switch_state() {
  if(is_playing) {
    if(audio.readyState <= 1) {
      // The audio download progress only has audio metadata
      // Show the loading spinner on the play button
      switch_to_waiting_state();
    }
    else {
      switch_to_load_finished_state();
    }
  }
}
function display_buffered_amount (){
  const buffered_amount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
  let buffered_width = buffered_amount / Number(seek_slider.attr("max")) * 100;
  // Show how much the user can seek through without waiting for the data to download
  audio_player_container.get(0).style.setProperty("--buffered-width", `${buffered_width}%`);
}
/* The function that will update the seek slider */
function while_playing() {
  let seek_before_width;
  let current_time = Math.floor(audio.currentTime);
  let seek_slider_max = Number(seek_slider.attr("max"));
  seek_slider.val(current_time);

  seek_before_width = (current_time / seek_slider_max) * 100;
  audio_player_container.get(0).style.setProperty("--seek-before-width", `${seek_before_width}%`);

  set_played_time();
  r_af = requestAnimationFrame(while_playing);
}

function open_player() {
  audio_player_container.removeClass("m-audio-player--is-minimized");
}
function minimize_player(event) {console.log("minimizing");
event.stopPropagation();
  audio_player_container.addClass("m-audio-player--is-minimized");
}

audio_player_container.click(open_player);
audio_player_minimize_btn.click(minimize_player);

seek_slider.on("change", function (event) {
  seek_to(event);
  requestAnimationFrame(while_playing);
}); // End change

seek_slider.on("input", function() {
    let seek_slider_max = Number($(this).attr("max"));
    let value = Number($(this).val());
    played_time.text(format_time(value));
    let seek_before_width = (value / seek_slider_max) * 100;
    // Update the progress width as the user is sliding the thumb
    audio_player_container.get(0).style.setProperty("--seek-before-width", `${seek_before_width}%`);
    // Prevent updation the seek slider value when the user is moving the thumb
    cancelAnimationFrame(r_af);
}); //End input

play_btn.on(" click", play_pause);
prev_btn.on("click", prev);
next_btn.on("click", next);
/* Audio event listeners */

audio.addEventListener("ended", function() {
  is_playing = false;
  switch_to_play();
  next();
});
audio.addEventListener("loadedmetadata", set_duration);
audio.addEventListener("progress", display_buffered_amount);

setInterval(switch_state, 1);
