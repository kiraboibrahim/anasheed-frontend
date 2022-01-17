async function fetch_data(url) {
  data = [];
    // Fetch data from the resource url
    const response = await fetch(url);
    if (response.ok) {
      data = await response.json();
    }
    return data;
}

function sleep(ms){
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  }); // End promise
}
