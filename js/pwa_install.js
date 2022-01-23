$(document).ready(function () {
  let deffered_prompt;
  let a2hs_elem = $(".a2hs-wrapper");
  let a2hs_install_btn = $(".a2hs__install-btn");
  let a2hs_close_btn = $(".a2hs__close-btn");

  /* Click handler for the a2hs element */
  function a2hs (){
    close_a2hs(); // Hide the a2hs element when the prompt is shown
    deffered_prompt.prompt();
    deffered_prompt.userChoice.then(function (choice) {
      if (choice.outcome == 'dismissed') {
        alert("Sorry to see you go.");
      }
    });
  }

  function show_a2hs() {
    a2hs_elem.css("display", "flex");
  }

  function close_a2hs() {
    a2hs_elem.css("display", "none");
  }

  function pwa_install () {
    // Retrieve the time ehen the pwa prompt was last shown
    let  last_shown = localStorage.getItem("last_shown");
    if (last_shown == null) {
      // This is the client's first time
      localStorage.setItem("last_shown", Date.now()/1000);
      // Display the a2hs element
      show_a2hs();
    } else  if (last_shown - Date.now()/100 > (1 * 24 * 60 * 60)){
      // if one days have passed since the last prompt, show the prompy again
      localStorage.setItem("last_shown", Date.now()/1000); // Change the current last_shown date to the current timestamp
      // Display the a2hs element
      show_a2hs();
    }
  }

  window.addEventListener("beforeinstallprompt", function(e) {
    event.preventDefault();
    deffered_prompt = e;
    pwa_install();
  }); // End beforeinstallprompt

  a2hs_install_btn.click(a2hs);
  a2hs_close_btn.click(close_a2hs);
  $(".show-a2hs").click(show_a2hs);
});  // End ready
