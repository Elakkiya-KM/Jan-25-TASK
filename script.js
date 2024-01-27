document.addEventListener("DOMContentLoaded", function () {
  const countryCardsContainer = document.getElementById("countryCards");

  // Fetch data from Rest Countries API
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((countries) => {
      countries.forEach((country) => {
        // Create Bootstrap card for each country
        const card = document.createElement("div");
        card.className = "col-lg-4 col-sm-12 mb-4";

        const cardContent = `
                    <div class="card">
                        <div class="card-header">${country.capital}</div>
                        <div class="card-body">
                            <img src="${country.flags.svg}" alt="${country.name.common}" class="img-fluid mb-3">
                            <p>Region: ${country.region}</p>
                            <p>Name: ${country.name.common}</p>
                            <p>Country Code: ${country.cca2}</p>
                            <button class="btn btn-primary" onclick="getWeather('${country.capital}')">Click for Weather</button>
                        </div>
                    </div>
                `;

        card.innerHTML = cardContent;
        countryCardsContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error fetching country data:", error));
});

// Function to get weather using OpenWeatherMap API
function getWeather(city) {
  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey = "0370f5219c23b21bca5fabd27e8b8096";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      // Display weather information (you can customize this based on the OpenWeatherMap response structure)
      alert(
        `Current Weather in ${city}:\nTemperature: ${weatherData.main.temp}°C\nDescription: ${weatherData.weather[0].description}`
      );
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}
