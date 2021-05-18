const DOMSelectors = document.querySelector(".flex-container");
const key = "c8u5P0txJE6pJcrJpGgbG6JjoHY8MbzA";
const searchButton = document.getElementById("input-button");

function randomCoords(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function query() {
  try {
    const lat = randomCoords(-90, 90);
    const lon = randomCoords(-180, 180);
    const data = await Promise.all([
      fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today`
      ).then((response) => response.json()),
      fetch(
        `http://www.mapquestapi.com/geocoding/v1/reverse?key=${key}&location=${lat},${lon}`
      ).then((response) => response.json()),
    ]);
    console.log(data);
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

searchButton.addEventListener("click", function () {
  const searchText = document.getElementById("input-text").value;
  console.log(searchText);
  console.log("bruh");
});
