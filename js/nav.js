$(document).ready(function () {
  let nav = $(".navigation");
  let margin = 0;
  let nav_pos_y = nav.offset().top;
  let fixed = false;
  let animationID;

  function fix_nav () {
    if($(window).scrollTop() >= (nav_pos_y + margin)) {
      if(!fixed) {
        nav.addClass("h-sticky");
        fixed = true;
      }

    }
    else {
      if(fixed) {
        nav.removeClass("h-sticky");
        fixed = false;
      }

    }
    animationID = requestAnimationFrame(fix_nav);
  }
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

  requestAnimationFrame(fix_nav);
}); // end ready
