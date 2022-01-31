const searchForm = document.querySelector('#search-form');
const fiveDay = document.querySelector('#five-day');
const myApiKey = "206ec34e199d83935bbe9730429e302d";
const cardBody = document.querySelector('.card-body');
const validation = document.getElementById('validationDefault03');
const weatherFive = document.getElementById('weather-five');
const weatherCard = document.getElementById('weather-card');
const timeNow = document.getElementById('time-now');
const msg = document.getElementById('msg');
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
  if (!inputVal) {
    msg.textContent = "Please search for a valid city";

    return;
  }
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
        msg.textContent = "";
        const { main, name, sys, weather } = response;
        console.log(weather);
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
        weatherCard.style.display = "inline-block";

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
    const theURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${myApiKey}&units=imperial`;

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
        const markup = `<h2 class="city-name=${name},${city.country}>
        <span>${name}</span>

        <sup>${city.country}</sup>
        </h2>
                   
                   <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup>
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
  const fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${myApiKey}&units=imperial`;


  fetch(fiveDayURL)
    .then((response) => {
      return response.json();
    })
    .then(function (response) {
      if (!response) {

        throw response.json();

      }
      else {
        const { city, list } = response;

        console.log(response);

        const { name, sys } = city;

        // list.forEach(function (forecast) 
        for (var i = 0; i < list.length; i += 3) {
          var forecast = list[i];
          const { weather, main, dt_txt } = forecast;
          const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
          const li = document.createElement("li");
          li.classList.add("city");
          const markup = `
                   <div>${dt_txt}</div>
                   <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup>
                   </div>
                   <figure>
                   <img  class="city--icon" src=${icon} alt=${weather[0]["main"]}>
                   <figcaption>${weather[0]["description"]}</figcaption>
                   </figure>`;

          li.innerHTML = markup;
          weatherFive.appendChild(li);
        };
      }
    });
}





const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', displaySearch);






