const DOMSelectors = document.querySelector(".flex-container");
const key = "c8u5P0txJE6pJcrJpGgbG6JjoHY8MbzA";
const searchArea = document.getElementById("search-area");

function randomCoords(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function query() {
  try {
    const lat = randomCoords(-90, 90);
    const lng = randomCoords(-180, 180);
    const data = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`
    );
    const location = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${lat},${lng}`
    );
    console.log(data, location);
    DOMSelectors.insertAdjacentHTML(
      "beforeend",
      `<div class="card-container">
          <div class="card">
            <h3 class="city-name">${data[1].results[0].locations[0].adminArea3}, ${data[1].results[0].locations[0].adminArea1}</h3>
            <h3 class="time">sunrise: ${data[0].results.sunrise}</h3>
            <h3 class="time">sunset: ${data[0].results.sunset}</h3>
            <p class="view-time">View at ${data[0].results.sunset} - ${data[0].results.nautical_twilight_end} for optimal sunset view</p>
          </div>
        </div>`
    );
  } catch (error) {
    console.log(error);
    alert("oops");
  }
}

i = 0;
while (i < 3) {
  query();
  i++;
}

async function search(param) {
  try {
    const location = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${param}`
    );
    const data = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${location.results[0].locations[0].latLng.lat}&lng=${location.results[0].locations[0].latLng.lng}&date=today`
    );
    console.log(location);
    console.log(data);
    DOMSelectors.insertAdjacentHTML(
      "beforeend",
      `<div class="card-container">
          <div class="card">
            <h3 class="city-name">${location.results[0].locations[0].adminArea3}, ${location.results[0].locations[0].adminArea1}</h3>
            <h3 class="time">sunrise: ${data.results.sunrise}</h3>
            <h3 class="time">sunset: ${data.results.sunset}</h3>
            <p class="view-time">View at ${data.results.sunset} - ${data.results.nautical_twilight_end} for optimal sunset view</p>
          </div>
        </div>`
    );
  } catch (error) {
    console.log(error);
    alert("oops");
  }
}

searchArea.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    let searchContent = searchArea.value;
    search(searchContent);
  }
});
