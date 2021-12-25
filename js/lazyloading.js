
$(document).ready(function (){
  function preload_image(source) {
    let image = new Image();
    image.src = source;
    return image.src;
  }
  function lazyload() {
    let lazy_elements = $(".lazy");
    let current_scroll_position = $(window).scrollTop();
    let viewport_height = $(window).height();
    let total_scrolled_height = current_scroll_position + viewport_height;
    if(lazy_elements.length != 0) {
      lazy_elements.each(function () {
        let current = $(this);
        if(current.offset().top < total_scrolled_height) {
          let source = preload_image(current.attr("data-src"));
          // Remove the lazy class first such that, the placeholder image is removed
          current.removeClass("lazy");
          current.css("backgroundImage", `url(${source})`);

        }
      }); // End each
    } else {
      window.removeEventListener("resize", lazyload);
      document.removeEventListener("scroll", lazyload);
      document.removeEventListener("orientationChange", lazyload);
    }

  } // End lazyload

  function lazyload_horizontal_scroll_container(container) {
    // NOT YET TESTED, DO NOT USE 
    /*
      This is a lazy load function to load images that are part of a horizontal scrolling element since some elements are hidden,
      Their top property is not enough to determine if they are in the view port, and now using their left property with respect
      to their parent to get their position and load them accordingly
    */
    lazy_images = container.find(".lazy");
    let container_width = container.width();
    // if the container is in view, then laod the children of the lazyload_horizontal_container
    let scrolled_total_height = $(window).scrollTop() + $(window).height();
    if(container.offset().top < scrolled_total_height) {
      // Lazy load the child elements in viewport
      let horizontal_scroll_position = container.scrollLeft();
      lazy_images.each(function () {
        let current = $(this);
        if(current.position().left() < (container_width + horizontal_scroll_position)) {
            let source = preload_image(current.attr("data-src"));
            // Remove the lazy class first such that, the placeholder image is removed
            current.removeClass("lazy");
            current.css("backgroundImage", `url(${source})`);
        } else {
          window.removeEventListener("resize", lazyload_horizontal_scroll_container);
          container.removeEventListener("scroll", lazyload_horizontal_scroll_container);
          document.removeEventListener("orientationChange", lazyload_horizontal_scroll_container);
        }

      }); // End each
    }

  } // End lazyload_horizontal_scroll_container

  setTimeout(lazyload, 1); //For the first page load, there may be images already in the viewport, call the lazyload function to load them, Dont wait for the events below
  window.addEventListener("resize", lazyload);
  document.addEventListener("scroll", lazyload);
  document.addEventListener("orientationChange", lazyload);
}); // End ready
