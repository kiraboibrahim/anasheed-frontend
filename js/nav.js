$(document).ready(function () {
  let nav = $(".navigation");
  let nav_pos_y = nav.offset().top;
  // Open the nav
  $(".m-nav__open-nav").click (function () {
      $(".m-nav__menu").css("left", 0);
  });
  // close the nav
  $(".m-nav__close-nav").click (function () {
      $(".m-nav__menu").css("left", "-100%");
  });

  $(window).on("orientationchange resize", function () {
    // Recalculate the vertical positioin of the navigation bar
    nav_pos_y = nav.offset().top;
  }); // End orientation change


  $(window).scroll(function () {
    if($(this).scrollTop() >= nav_pos_y) {
      nav.addClass("h-sticky");
    }
    else {
      nav.removeClass("h-sticky");
    }
  }); // End scroll
})
