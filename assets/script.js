var searchForm = document.querySelector('#search-form');

function searchFormSubmit(event) {
    event.preventDefault();

    var searchInput = document.querySelector("validationDefault03").ariaValueMax;

    if (!searchInput) {
        console.error('You need a search input value!');
        return;
    }

    var queryURL = 'api.openweathermap.org/data/2.5/weather?q=' + searchInput + '&appid={}'

    location.assign(queryURL);
}

searchForm.addEventListener('submit', searchFormSubmit);


