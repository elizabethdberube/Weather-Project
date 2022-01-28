const searchForm = document.querySelector('#search-form');
const fiveDay = document.querySelector('#five-day');
const myApiKey = "206ec34e199d83935bbe9730429e302d";
const cardBody = document.querySelector('card-body');
const validation = document.getElementById('validation');
var timeNow = document.getElementById('time-now');

function showTime() {
 
  var whatTime = moment().format('dddd, MMMM Do, YYYY');
  timeNow.text = whatTime;

}
showTime();

 function displaySearch (){
  
  const inputVal = validation.value;
  const theURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${myApiKey}`;
  //const theURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputVal + '&appid=' + myApiKey;
  fetch(theURL)
  .then(function (response){
  if(!response){
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
    }
 li.innerhtml = markup;
 cardBody.appendChild(li);
});
 }

const searchButton = document.getElementById("search-button");
searchForm.addEventListener('click', displaySearch);
  
//function searchFormSubmit(event) {
  //  event.preventDefault();

    //var searchInput = document.querySelector("validationDefault03").ariaValueMax;

    //if (!searchInput) {
      //  console.error('You need a search input value!');
        //return;
    //}

    //var queryURL = 'api.openweathermap.org/data/2.5/weather?q=' + searchInput + '&appid={}'

    //location.assign(queryURL);
//}

//function gatherParam () {
  //  var searchInfo = document.location.search.split('&');

    //var queryString = searchInfo[0].split('=').pop();
    //var formatString = searchInfo[0].split('=').pop();

   // gatherApi(queryString, formatString);
//}

//function searchOutput (results) {
//console.log(results);

//var resultsDiv = document.createElement('div');
//resultsDiv.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

//var resultsCardBody = document.createElement('div');
//resultsCardBody.classList.add('card-body');
//resultsDiv.append(resultsCardBody);

//var divTitle = document.createElement('h3');
//divTitle,textContent = results.title;

//var contentPar = document.createElement('h3');
//contentPar.innerHTML =
//'<strong>The weather in:</strong>' + results + '<br/>';

//resultsCardBody.append(divTitle);

//}

//function gatherApi (query, input) {
    //searchURL = 'api.openweathermap.org/data/2.5/weather?q=' + input + '&appid={}'   


///}



