function count_listen(id) {
  let url = `https://anasheed.pythonanywhere.com/tracks/${id}/listener`;
  fetch(url, {
      // Adding method type
      method: "POST",
    }
  ); // I don't care about the response
}

function count_download(id) {
  let url = `https://anasheed.pythonanywhere.com/tracks/${id}/download`;
  fetch(url, {
      // Adding method type
      method: "POST",
    }
  ); // I don't care about the response
}
