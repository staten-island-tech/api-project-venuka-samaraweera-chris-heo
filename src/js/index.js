const DOMSelectors = document.querySelector(".container");

const query = async function () {
  try {
    const response = await fetch(
      "https://api.sunrise-sunset.org/json?lat=40.730610&lng=-73.935242&date=today"
    );
    const data = await response.json();
    DOMSelectors.insertAdjacentHTML(
      "beforeend",
      `<div class="flex-container">
        <div class="card-container">
            <h2 class="card-header">Sunrises right now</h2>
            <div class="card">
             <h3 class="city-name">New York</h3>
             <h3 class="time">sunrise: ${data.results.sunrise}</h3>
              <h3 class="time">sunset: ${data.results.sunset}</h3>
              <p class="view-time">View at ${data.results.sunset} - ${data.results.nautical_twilight_end} for optimal sunset view</p>
            </div>
        </div>
        <div class="card-container">
            <h2 class="card-header">Sunsets right now</h2>
            <div class="card">
             <h3 class="city-name">sumwhere else</h3>
             <h3 class="time">sunrise: ${data.results.sunrise}</h3>
              <h3 class="time">sunset: ${data.results.sunset}</h3>
              <p class="view-time">View at ${data.results.sunset} - ${data.results.nautical_twilight_end} for optimal sunset view</p>
            </div>
        </div>
       </div>`
    );
  } catch (error) {
    console.log(error);
    alert("oops");
  }
};

query();
