const searchForm = document.querySelector('#search-form');
const fiveDay = document.querySelector('#five-day');
const myApiKey = "206ec34e199d83935bbe9730429e302d";
const cardBody = document.querySelector('.card-body');
const validation = document.getElementById('validationDefault03');
const weatherFive = document.getElementById('weather-five');
const timeNow = document.getElementById('time-now');
const msg = document.getElementById('div-msg');
var saveTheWeather = [];


function showTime() {

  var whatTime = moment().format('dddd, MMMM Do, YYYY');
  timeNow.text = whatTime;

}
showTime();

function displaySearch(event) {
  event.preventDefault();

  const inputVal = validation.value;
  const theURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${myApiKey}`;

  fetch(theURL)

    .then((response) => {
      return response.json();
    })
    .then(function (response) {

      if (!response) {
        msg.textContent = "Please search for a valid city";
        throw response.json();

      }
      else {
        const { main, name, sys, weather } = response;
        console.log(weather);
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;


        const div = document.createElement("div");
        div.classList.add("city");
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

        div.innerHTML = markup;
        cardBody.innerHTML = "";
        cardBody.appendChild(div);
        saveTheWeather = JSON.parse(localStorage.getItem("myWeather")) || [];
        saveTheWeather.push(inputVal);
        localStorage.setItem("myWeather", JSON.stringify(saveTheWeather));
        console.log(saveTheWeather);
      }
      displayFiveDay();
      saveTheCity();
    });
}


function saveTheCity() {

  saveTheWeather = JSON.parse(localStorage.getItem("myWeather")) || [];
  const savedCities = document.querySelectorAll('button.saved-cities');

  savedCities.forEach(function (button) {
    const thisCity = saveTheWeather.pop();



    if (thisCity) {
      button.style.display = "block";
      button.innerHTML = thisCity;
    }

    button.addEventListener('click', theNewWeather);
  });

  function theNewWeather(event) {
    event.preventDefault();

    const inputVal = event.target.textContent;
    const theURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${myApiKey}`;

    fetch(theURL)
      .then((response) => {
        return response.json();
      })
      .then(function (response) {
        cardBody.innerHTML = "";
        const { main, name, sys, weather } = response;
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;


        const div = document.createElement("div");
        div.classList.add("city");
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

        div.innerHTML = markup;
        cardBody.appendChild(div);
        saveTheWeather.push(inputVal);
        localStorage.setItem("myWeather", JSON.stringify(saveTheWeather));


      });

  }

}
function displayFiveDay() {

  const inputVal = validation.value;
  const fiveDayURL = `https:/api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${myApiKey}`;


  fetch(fiveDayURL)
    .then((response) => {
      return response.json();
    })
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
searchButton.addEventListener('click', displaySearch);
//needs function





