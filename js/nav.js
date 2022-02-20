$(document).ready(function () {
  let nav = $(".navigation");
  let search_modal = $(".search-modal");
  let search_form_input = $(".search-form__input");
  let search_modal_close = $(".search-modal__close");
  let search_modal_submit_btn = $(".search-modal__submit-btn");
  let search_modal_body = $(".search-modal__body");
  let search_results = $(".search-modal__search-results");
  let search_modal_form = $(".search-modal__form");
  let search_modal_input = $(".search-modal__input");
  let search_results_title = $(".search-modal__search-results-title");
  let track_template = $("#track-template").html();
  let artist_template = $("#inline-artist-template").html();
  let margin = 0;

  function open_nav() {
    $(".m-nav__menu").css("left", 0);
  }
  function close_nav() {
    $(".m-nav__menu").css("left", "-100%");
  }
  // Open the nav
  $(".m-nav__open-nav").click (function () {
    open_nav();
      // Display the overlay to avoid interaction with the elements behind
      $("body").attr("data-nav-open", "true");
  });
  // close the nav
  $(".m-nav__close-nav").click (function () {
      $("body").attr("data-nav-open", "false");
      close_nav();
  });

  $(".navigation-overlay").click(function () {
    $("body").attr("data-nav-open", "false"); // First hide the overlay before closing navigation
    close_nav();
  }); // End click

  function open_search_modal() {
    // Turn off scrolling on the body
    $("body").css("overflow", "hidden");
    // Unfocus the search on page to remove keyboard
    search_form_input.blur();
    // Focus the search modal's input
    search_modal_input.focus();
    search_modal.css("left", 0);
  }

  function close_search_modal() {
    // Turn back scrolling on the body
    $("body").css("overflow", "auto");
    search_modal.css("left", "-110%");
  }

  function search(event) {
    event.preventDefault();
    let submit_url = "https://anasheed.pythonanywhere.com/tracks/search";
    let render_func = render_songs;
    let template = track_template;
    // Artists have different dimensions compared to tracks, Switch the context so that artists or tracks are rendered with right dimensions
    search_results.attr("data-context", "tracks");

    if (document.getElementById("search-artists").checked) {
      submit_url = "https://anasheed.pythonanywhere.com/artists/search";
      render_func = render_singers_inline;
      template = artist_template;
      search_results.attr("data-context", "artists");
    }
    search_results.attr("data-no-results", "false"); // Remove the no results bg-image if the previous search yielded no results
    let query = search_modal_input.val();
    if (query != '') {
      submit_url = `${submit_url}?q=${query}`;
      // Point the title to what the user is searching for
      search_results_title.find('.q').text(query);
      // Reveal title to the user
      search_results_title.removeClass("h-hide");
      // Clear any results that were rendered before
      search_results.empty();
      search_modal_body.attr("data-loading", "true"); // Show status loading to the user
      search_results.attr("data-no-results", "false"); // Begin without any previous state form past searches
      fetch_data(submit_url)
      .then(function (data) {
        if(data.length == 0) {
          search_results.attr("data-no-results", "true");
        }
        search_modal_body.attr("data-loading", "false");
        render_func(search_results, data, template, false);
      })
      .catch(function (error) {
        console.log(error);
        search_modal_body.attr("data-loading", "false");
        alert("Something wrong happened");
      });
    }

  }

  search_modal_form.submit(search);
  search_form_input.focus(open_search_modal);
  search_modal_close.click(close_search_modal);


}); // end ready
