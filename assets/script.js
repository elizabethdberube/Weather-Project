const searchForm = document.querySelector('#search-form');
const fiveDay = document.querySelector('#five-day');
const myApiKey = "317b8e9ba397bcf1e02acee98cc425ce";
const cardBody = document.querySelector('.card-body');
const validation = document.getElementById('validationDefault03');
const weatherFive = document.getElementById('weather-five');
const weatherCard = document.getElementById('weather-card');

const msg = document.getElementById('msg');
var saveTheWeather = [];




//initial function for once input is recieved. Puts into local storage. 
function displaySearch(event) {
  event.preventDefault();
  const inputVal = validation.value;
  saveTheWeather = JSON.parse(localStorage.getItem("myWeather")) || [];
  saveTheWeather.push(inputVal);
  localStorage.setItem("myWeather", JSON.stringify(saveTheWeather));

  displayCityByName(inputVal);
}

//Function for API call by city name
function displayCityByName(name) {
  if (!name) {
    msg.textContent = "Please search for a valid city";
    return;

  }

  const theURL = `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${myApiKey}`;

  fetch(theURL)

    .then((response) => {
      return response.json();
    })


    .then(function (response) {
      if (!response || response.length == 0) {
        msg.textContent = "Please search for a valid city";
        return;
      }
      else {
        const { lat, lon, country, name } = response[0];
        displayCityByLatLon(lat, lon, name, country);

      }
    });
}
//Function for API call by lat and lon
function displayCityByLatLon(lat, lon, name, country) {

  const theURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${myApiKey}&units=imperial`;

  fetch(theURL)

    .then((response) => {
      return response.json();
    })
    .then(function (response) {

      if (!response) {
        msg.textContent = "Please search for a valid city";
        throw response.json();

      }
      //breaking down info received
      else {
        msg.textContent = "";
        const { current, daily } = response;


        const { uvi, temp, humidity, weather, wind_speed, dt } = current;
        const date = new Date(dt * 1000);

        //getting the weather icon
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
        weatherCard.style.display = "inline-block";

        const div = document.createElement("div");
        div.classList.add("city");
        var uviClass = "";
        //hightlighting the UVI index
        if (uvi <= 2) {

          uviClass = "UVI-low";

        }

        else if (uvi >= 3 && uvi <= 5) {
          uviClass = "UVI-mod";

        }

        else if (uvi >= 6) {
          uviClass = "UVI-high";

        }

        //how to display the information
        const markup = `
                   <div class="weather-div">
                   <h3>Current weather for:</h3>
                   <span>${name}</span>
                   <sup>${country}</sup>
                   <h1>${date}</h1>
                   
                   </h2>
                   <div class="city-temp">Temperature: ${Math.round(temp)}<sup>°F</sup>
                   </div>
                   <div class="humidity">Humidity: ${humidity}%</div>
                   <div class="${uviClass}">UV Index: ${uvi}</div>
                   <div class="windSpeed">Wind speed: ${wind_speed} mph</div>
                   <figure>
                   <img  class="city--icon" src=${icon} alt=${weather[0]["main"]}>
                   <figcaption>${weather[0]["description"]}</figcaption>
                   </figure> 
                   </div>`;

        div.innerHTML = markup;
        cardBody.innerHTML = "";
        cardBody.appendChild(div);


        //for loop for five day forecast
        for (var i = 1; i < 6; i++) {
          const day = daily[i];
          const { uvi, temp, humidity, weather, wind_speed, dt } = day;
          const date = new Date(dt * 1000);


          const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
          weatherFive.style.display = "inline-block";

          const div = document.createElement("div");
          div.classList.add("city1");
          const markup = `
          <div class="five-days">
          <h3>Five day forecast</h3>
                     <span>${name}</span>
                     <sup>${country}</sup>
                     <h1>${date}</h1>
                     </h2>
                     <div class="city-temp">Temperature: ${Math.round(temp.day)}<sup>°F</sup>
                     </div>
                     <div class="humidity">Humidity: ${humidity}%</div>
                     <div class="UVI">UV Index: ${uvi}</div>
                     <div class="windSpeed">Wind speed: ${wind_speed}mph</div>
                     <figure>
                     <img  class="city--icon" src=${icon} alt=${weather[0]["main"]}>
                     <figcaption>${weather[0]["description"]}</figcaption>
                     </figure>
                     </div>`;

          div.innerHTML = markup;
          cardBody.appendChild(div);
        };

      }

      updateSearchHistory();
    });
}

//function for saved search buttons
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

  //function for if saved search button is clicked on
  function showFromHistory(event) {
    event.preventDefault();
    const button = event.target;
    const cityName = button.textContent;
    displayCityByName(cityName);

  }

}




const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', displaySearch);






