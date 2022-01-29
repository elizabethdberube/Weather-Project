const searchForm = document.querySelector('#search-form');
const fiveDay = document.querySelector('#five-day');
const myApiKey = "206ec34e199d83935bbe9730429e302d";
const cardBody = document.querySelector('card-body');
const validation = document.getElementById('validationDefault03');
const weatherFive = document.getElementById('weather-five');
const timeNow = document.getElementById('time-now');
const savedCities = document.getElementById('saved-cities');
const SaveTheWeather = [];

function showTime() {

  var whatTime = moment().format('dddd, MMMM Do, YYYY');
  timeNow.text = whatTime;

}
showTime();

function displaySearch() {

  const inputVal = validation.value;
  const theURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${myApiKey}`;
  //const theURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputVal + '&appid=' + myApiKey;
  fetch(theURL)
    .then(function (response) {
      if (!response) {
        msg.textContent = "Please search for a valid city";
        throw response.json();

      }
      else {
        const { main, name, sys, weather } = response;
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;


        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `<h2 class="city-name="${name},${sys.country}">
                   <span>${name}</span>
                   <sup>${sys.country}</sup>
                   </h2>
                   <div class="city-temp>${Math.round(main.temp)}<sup>°C</sup>
                   </div>
                   <figure>
                   <img  class="city--icon" src=${icon} alt=${weather[0]["main"]}>
                   <figcaption>${weather[0]["description"]}</figcaption>
                   </figure>`;

        li.innerhtml = markup;
        cardBody.appendChild(li);
        saveTheWeather.push(inputVal);
        localStorage.setItem("myWeather", JSON.stringify(SaveTheWeather));

      }
      saveTheCity()
    });
}


function saveTheCity() {

  for (var i = 0; i < SaveTheWeather.length; i++) {
    const button = document.createElement("button");
    button.classList.add("city");
    const markup = `<button class="old-city" id="find-city" ${saveTheWeather}"</button>`
    button.innerhtml = markup;
    savedCities.appendChild(button);
  }

}


function displayFiveDay() {

  const inputVal = validation.value;
  const FiveDayURL = `https:/api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${myApiKey}`;

  fetch(FiveDayURL)
    .then(function (response) {
      if (!response) {

        throw response.json();

      }
      else {
        const { main, name, sys, weather } = response;
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;


        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `<h2 class="city-name="${name},${sys.country}">
                   <span>${name}</span>
                   <sup>${sys.country}</sup>
                   </h2>
                   <div class="city-temp>${Math.round(main.temp)}<sup>°C</sup>
                   </div>
                   <figure>
                   <img  class="city--icon" src=${icon} alt=${weather[0]["main"]}>
                   <figcaption>${weather[0]["description"]}</figcaption>
                   </figure>`;

        li.innerhtml = markup;
        weatherFive.appendChild(li);
      }
    });
}





const searchButton = document.getElementById("search-button");
searchForm.addEventListener('click', displaySearch, displayFiveDay);
//needs function
const findCity = document.getElementById("find-city");
findCity.addEventListener('click',);




