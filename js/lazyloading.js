function preload_image(source) {
  let image = new Image();
  image.src = source;
  return image.src;
}

/*
  The elements on which lazyloading is done are not available immediately after the DOM is downloaded, so I have decided to call the lazy load manually when it is needed ie in render functions 
*/
function lazyload() {
  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    console.log(lazyloadImages);
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var elem = entry.target;
          let source = preload_image(elem.getAttribute("data-src"));

          elem.style.backgroundImage = `url(${source})`;
          elem.classList.remove("lazy");
          imageObserver.unobserve(elem);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {
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
    }
  }

} // End lazyload
