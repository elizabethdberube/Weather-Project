const searchForm = document.querySelector('#search-form');
const fiveDay = document.querySelector('#five-day');
const myApiKey = "206ec34e199d83935bbe9730429e302d";
const cardBody = document.querySelector('.card-body');
const validation = document.getElementById('validationDefault03');
const weatherFive = document.getElementById('weather-five');
const weatherCard = document.getElementById('weather-card');

const msg = document.getElementById('msg');
var saveTheWeather = [];





function displaySearch(event) {
  event.preventDefault();
  const inputVal = validation.value;
  saveTheWeather = JSON.parse(localStorage.getItem("myWeather")) || [];
  saveTheWeather.push(inputVal);
  localStorage.setItem("myWeather", JSON.stringify(saveTheWeather));
  console.log(saveTheWeather);
  displayCityByName(inputVal);
}

function displayCityByName(name) {

  if (!name) {

    msg.textContent = "Please search for a valid city";
    return;
  }
  const theURL = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${myApiKey}`;

  fetch(theURL)

    .then((response) => {
      return response.json();
    })
    .then(function (response) {
      const { lat, lon, country, name } = response[0];
      displayCityByLatLon(lat, lon, name, country);

    });
}

function displayCityByLatLon(lat, lon, name, country) {
  const theURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=imperial`;
  if (!lat || !lon) {
    msg.textContent = "Please search for a valid city";

    return;
  }
  fetch(theURL)

    .then((response) => {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      if (!response) {
        msg.textContent = "Please search for a valid city";
        throw response.json();

      }

      else {
        msg.textContent = "";
        const { current, daily } = response;

        console.log(daily);
        const { uvi, temp, humidity, weather, wind_speed, dt } = current;
        const date = new Date(dt * 1000);
        console.log("current", current);
        console.log(temp);
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
        weatherCard.style.display = "inline-block";

        const div = document.createElement("div");
        div.classList.add("city");
        const markup = `<h2 class="city-name">
                   <span>${name}</span>
                   <span>${date}</span>
                   <sup>${country}</sup>
                   </h2>
                   <div class="city-temp">${Math.round(temp)}<sup>°F</sup>
                   </div>
                   <div class="humidity">Humidity: ${humidity}</div>
                   <div class="UVI">UV Index: ${uvi}</div>
                   <div class="windSpeed">Wind speed: ${wind_speed}</div>
                   <figure>
                   <img  class="city--icon" src=${icon} alt=${weather[0]["main"]}>
                   <figcaption>${weather[0]["description"]}</figcaption>
                   </figure>`;

        div.innerHTML = markup;
        cardBody.innerHTML = "";
        cardBody.appendChild(div);

        //daily.forEach(function (day) {
        for (var i = 1; i < 6; i++) {
          const day = daily[i];
          const { uvi, temp, humidity, weather, wind_speed, dt } = day;
          const date = new Date(dt * 1000);


          const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
          weatherCard.style.display = "inline-block";

          const div = document.createElement("div");
          div.classList.add("city");
          const markup = `<h2 class="city-name">
                     <span>${name}</span>
                     <span>${date}</span>
                     <sup>${country}</sup>
                     </h2>
                     <div class="city-temp">${Math.round(temp.day)}<sup>°F</sup>
                     </div>
                     <div class="humidity">Humidity: ${humidity}</div>
                     <div class="UVI">UV Index: ${uvi}</div>
                     <div class="windSpeed">Wind speed: ${wind_speed}</div>
                     <figure>
                     <img  class="city--icon" src=${icon} alt=${weather[0]["main"]}>
                     <figcaption>${weather[0]["description"]}</figcaption>
                     </figure>`;

          div.innerHTML = markup;
          cardBody.appendChild(div);
        };

      }

      updateSearchHistory();
    });
}


function updateSearchHistory() {

  saveTheWeather = JSON.parse(localStorage.getItem("myWeather")) || [];
  const savedCities = document.querySelectorAll('button.saved-cities');

  savedCities.forEach(function (button) {
    const thisCity = saveTheWeather.pop();



    if (thisCity) {
      button.style.display = "block";
      button.innerHTML = thisCity;
    }

    button.addEventListener('click', showFromHistory);
  });

  function showFromHistory(event) {
    event.preventDefault();
    const button = event.target;
    const cityName = button.textContent;
    displayCityByName(cityName);

  }

}






const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', displaySearch);






