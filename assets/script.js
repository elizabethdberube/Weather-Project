const searchForm = document.querySelector('#search-form');
const fiveDay = document.querySelector('#five-day');
const myApiKey = "";
const inputVal = input.value;
const theURL = `api.openweathermap.org/data/2.5/weather?q={inputVal}%appid={myApiKey}`;

fetch(theURL)
.then(function (response){
if(!response){
    msg.textContent = "Please search for a valid city";
    throw response.json();
}
  return response.json
    });
 //write results to page
.then (  )



searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const inputvVal = input.value;
});
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



