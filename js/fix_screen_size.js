$(document).ready(function () {
  let initial_height = $(window).height();
  $(window).resize(function () {
    $(".navigation").height(initial_height);
  }); // End resize

}); // End ready
