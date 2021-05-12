const DOMSelectors = document.querySelector(".flex-container");

function randomCoords(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function query() {
  try {
    const lat = randomCoords(-90, 90);
    const lon = randomCoords(-180, 180);
    const response = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today`
    );
    const data = await response.json();
    DOMSelectors.insertAdjacentHTML(
      "beforeend",
      `<div class="card-container">
          <div class="card">
            <h3 class="city-name">${`${lat}, ${lon}`}</h3>
            <h3 class="time">sunrise: ${data.results.sunrise}</h3>
            <h3 class="time">sunset: ${data.results.sunset}</h3>
            <p class="view-time">View at ${data.results.sunset} - ${
        data.results.nautical_twilight_end
      } for optimal sunset view</p>
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
