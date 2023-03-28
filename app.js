const weatherBox = document.getElementById("weather-box");
const cityNameInput = document.getElementById("city-name-input");
const searchButton = document.getElementById("search-button");
const gridContainer = document.getElementById("grid-container");
const previousSearchesList = document.getElementById("previous-searches-list");
//const searchLink = document.getElementById("search-link");

searchButton.addEventListener ("click", (event) => {
    let cityName = cityNameInput.value
    cityNameInput.value = ""

    let receivedPromise = fetch(`https://wttr.in/${cityName}?format=j1`)

    receivedPromise.then((response) => {
        return response. json ()
}).then(json => {


    //console.log(json); // Log JSON object


    let currentTemperature = json.current_condition[0].temp_F;

    fillWeatherBox (json, cityName);
    addToPreviousSearches(cityName,currentTemperature); // Add the city to the previous searches list
});
        // Add this function to handle adding a city to the previous searches list
        const addToPreviousSearches = (cityName, currentTemperature) => {
             // Remove the "No previous searches" message if it exists
                // if (previousSearchesList.querySelector("li:first-child").textContent === "No previous searches.") {
                //     previousSearchesList.removeChild(previousSearchesList.querySelector("li:first-child"));
                // }

                // Remove the "No previous searches" message if it exists
    const noPreviousSearches = document.getElementById("no-previous-searches");
    if (noPreviousSearches) {
        previousSearchesList.removeChild(noPreviousSearches);
    }

            let searchLink = document.createElement("li");
            searchLink.innerHTML = `<a href="#">${cityName} (${currentTemperature}°F)</a>`;
            searchLink.addEventListener("click", (event) => {
                event.preventDefault();
                cityNameInput.value = cityName;
                searchButton.click();
            });
            previousSearchesList.append(searchLink);


        };

       // Add the new event listener for the search link
// searchLink.addEventListener("click", (event) => {
//     event.preventDefault();
//     location.reload(); // Reload the page
// }); 

})

const fillWeatherBox = (json, cityName) => {
    weatherBox.innerHTML = "";

    let label = document.createElement ("h3")
    label.textContent = cityName
    weatherBox.append(label);

    let areaName = json.nearest_area[0].areaName[0].value
    let area = document.createElement ("li")
    area.className =`weather-box-item`;

        // Check if the area name matches the searched city name
        if (areaName.toLowerCase() !== cityName.toLowerCase()) {
            area.innerHTML = `<strong>Nearest Area:</strong> ${areaName}`;
        } else {
            area.innerHTML = `<strong>Area:</strong> ${areaName}`;
        }
    weatherBox.append(area);



    let regionName = json.nearest_area[0].region[0].value
    let region = document.createElement("li")
    region.className = `weather-box-item`
    region.innerHTML = `<strong>Region:</strong> ${regionName}`
    weatherBox.append(region)


    let countryName = json.nearest_area[0].country[0].value
    let country = document.createElement("Li" )
    country.className = `weather-box-item`
    country.innerHTML = `<strong>Country:</strong> ${countryName}`
    weatherBox.append(country)


    let temperatureValue = json.current_condition[0].FeelsLikeF
    let temperature = document.createElement("li")
    temperature.className = `weather-box-item`
    temperature.innerHTML = `<strong>Currently:</strong> Feels like ${temperatureValue}°F`
    weatherBox.append(temperature)


                        // Extract chance data
                        let chanceOfSunshine = json.weather[0].hourly[0].chanceofsunshine;
                        let chanceOfRain = json.weather[0].hourly[0].chanceofrain;
                        let chanceOfSnow = json.weather[0].hourly[0].chanceofsnow;
                        // Add chance data points
                        let sunshine = document.createElement("li");
                        sunshine.className = `weather-box-item`;
                        sunshine.innerHTML = `<strong>Chance of Sunshine:</strong> ${chanceOfSunshine}%`;
                        weatherBox.append(sunshine);

                        let rain = document.createElement("li");
                        rain.className = `weather-box-item`;
                        rain.innerHTML = `<strong>Chance of Rain:</strong> ${chanceOfRain}%`;
                        weatherBox.append(rain);

                        let snow = document.createElement("li");
                        snow.className = `weather-box-item`;
                        snow.innerHTML = `<strong>Chance of Snow:</strong> ${chanceOfSnow}%`;
                        weatherBox.append(snow);

                        // Logic to display the correct icon
                        let weatherIcon = document.createElement("img");
                        if (chanceOfSunshine > 50) {
                            weatherIcon.src = "assets/summer.png";
                            weatherIcon.alt = "sun";
                        } else if (chanceOfRain > 50) {
                            weatherIcon.src = "assets/torrential-rain.png";
                            weatherIcon.alt = "rain";
                        } else if (chanceOfSnow > 50) {
                            weatherIcon.src = "assets/light-snow.png";
                            weatherIcon.alt = "snow";
                        }
                        weatherBox.append(weatherIcon);

                        

    gridContainer.innerHTML = "";
    const dayLabels = ["Today", "Tomorrow", "Day After Tomorrow"];
    for (let i = 0; i < 3; i++) {
        let forecast = json.weather[i];
        let minTemp = forecast.mintempF;
        let maxTemp = forecast.maxtempF;
        let aveTemp = (parseInt(minTemp) + parseInt(maxTemp)) / 2; // Calculate average temperature
    
        let forecastBox = document.createElement("div");
        forecastBox.className = "forecast-box";
        forecastBox.innerHTML = `
            <h4>${dayLabels[i]}</h4>
            <p><strong>Average Temperature:</strong> ${aveTemp.toFixed(1)}°F</p>
            <p><strong>Min Temperature:</strong> ${minTemp}°F</p>
            <p><strong>Max Temperature:</strong> ${maxTemp}°F</p>
        `;
        gridContainer.append(forecastBox);
    }
    

};


const tempConversionForm = document.getElementById("temp-conversion-form");
const tempToConvertInput = document.getElementById("temp-to-convert");
const toCelsiusRadio = document.getElementById("to-c");
const toFahrenheitRadio = document.getElementById("to-f");
const conversionResult = document.getElementById("conversion-result");

tempConversionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let temperature = parseFloat(tempToConvertInput.value);

    if (isNaN(temperature)) {
        alert("Please enter a valid temperature.");
        return;
    }

    let convertedTemperature;

    if (toCelsiusRadio.checked) {
        convertedTemperature = (temperature - 32) * 5 / 9;
        conversionResult.textContent = `${temperature}°F is ${convertedTemperature.toFixed(2)}°C.`;
    } else if (toFahrenheitRadio.checked) {
        convertedTemperature = temperature * 9 / 5 + 32;
        conversionResult.textContent = `${temperature}°C is ${convertedTemperature.toFixed(2)}°F.`;
    }
});











