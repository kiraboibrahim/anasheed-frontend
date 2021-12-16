$(document).ready(function () {
  // Open the nav
  $(".m-nav__open-nav").click (function () {
      $(".m-nav__menu").css("left", 0);
  });
  // close the nav
  $(".m-nav__close-nav").click (function () {
      $(".m-nav__menu").css("left", "-100%");
  });
})
