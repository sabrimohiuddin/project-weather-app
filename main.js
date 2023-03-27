

// const weatherBox = document.getElementById("weather-box")
// const cityNameInput = document.getElementById("city-name-input")
// const searchButton = document.getElementById("search-button")


// searchButton.addEventListener ("click", event => {
//     let cityName = cityNameInput. value
//     cityNameInput .value = ""

//     let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`)

//     receivedPromise.then(response => {
//         return response. json ()
// }).then(json => {
//     fillWeatherBox (json, cityName)
// })
// })

// const fillWeatherBox = (json, cityName) => {
//     weatherBox.innerHTML = ""

//     let label = document.createElement ("h3")
//     label.textContent = cityName
//     weatherBox.append(label)

//     let areaName = json.nearest_area[0].areaName[0].value
//     let area = document.createElement ("li")
//     area.className =`weather-box-item`
//     area.innerHTML = `<strong>Area:</strong> ${areaName}`
//     weatherBox.append(area)



//     let regionName = json.nearest_area[0].region[0].value
//     let region = document.createElement("li")
//     region.className = `weather-box-item`
//     region.innerHTML = `<strong>Region:</strong> ${regionName}`
//     weatherBox.append(region)


//     let countryName = json.nearest_area[0].country[0].value
//     let country = document.createElement("Li" )
//     country.className = `weather-box-item`
//     country.innerHTML = `<strong>Country:</strong> ${countryName}`
//     weatherBox.append(country)


//     let temperatureValue = json.current_condition[0].FeelsLikeF
//     let temperature = document.createElement("li")
//     temperature.className = `weather-box-item`
//     temperature.innerHTML = `<strong>Country:</strong> Feels like ${temperatureValue}°F`
//     weatherBox.append(temperature)
// }











const weatherBox = document.getElementById("weather-box");
const cityNameInput = document.getElementById("city-name-input");
const searchButton = document.getElementById("search-button");
const previousSearchesList = document.querySelector(".previous-searches-list");

const previousSearches = {};

searchButton.addEventListener("click", event => {
  let cityName = cityNameInput.value;
  cityNameInput.value = "";
  fetchWeather(cityName);
});

previousSearchesList.addEventListener("click", event => {
  if (event.target.tagName === "LI") {
    const cityName = event.target.textContent.split(",")[0];
    fetchWeather(cityName);
  }
});

function fetchWeather(cityName) {
  fetch(`https://wttr.in/${cityName}?format=j1`)
    .then(response => response.json())
    .then(json => {
      fillWeatherBox(json, cityName);
      addToPreviousSearches(json, cityName);
    });
}

function fillWeatherBox(json, cityName) {
  weatherBox.innerHTML = "";
  const days = [
    { title: "Current", weather: json.current_condition[0] },
    { title: json.weather[1].date, weather: json.weather[1] },
    { title: json.weather[2].date, weather: json.weather[2] },
  ];

  days.forEach(day => {
    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weather-container");

    const weatherTitle = document.createElement("h3");
    weatherTitle.textContent = `${cityName} - ${day.title}`;
    weatherContainer.appendChild(weatherTitle);

    const areaName = json.nearest_area[0].areaName[0].value;
    const regionName = json.nearest_area[0].region[0].value;
    const countryName = json.nearest_area[0].country[0].value;
    const temperatureValue = day.weather.FeelsLikeF;

    const detailsList = document.createElement("ul");
    detailsList.innerHTML = `
      <li><strong>Area:</strong> ${areaName}</li>
      <li><strong>Region:</strong> ${regionName}</li>
      <li><strong>Country:</strong> ${countryName}</li>
      <li><strong>Feels Like:</strong> ${temperatureValue}°F</li>
    `;
    weatherContainer.appendChild(detailsList);
    weatherBox.appendChild(weatherContainer);
  });
}

function addToPreviousSearches(json, cityName) {
  if (!previousSearches.hasOwnProperty(cityName)) {
    const listItem = document.createElement("li");
    listItem.textContent = `${cityName}, ${json.nearest_area[0].region[0].value}`;
    previousSearchesList.appendChild(listItem);
    previousSearches[cityName] = true;
  }
}


