$(document).ready(function () {
  let nav = $(".navigation");
  let margin = 0;
  let nav_pos_y = nav.offset().top;
  let fixed = false;
  let animationID;
  /* This function is not invoked anywhere, I have resorted to using the sticky position for fixed navigation on scroll */
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

  /*$(window).on("orientationchange resize", function () {
    //Recalculate the vertical positioin of the navigation bar
    nav_pos_y = nav.offset().top;
  });

  requestAnimationFrame(fix_nav);*/
}); // end ready
