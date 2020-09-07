const api = {
  key: "175871d0d6f5d6b0a4ddaa8db200d612",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.js-user-search');
searchbox.addEventListener('keypress', setQuery);

const mobileSearchbox = document.querySelector('.js-mobile-user-search');
mobileSearchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
  let val = searchbox.value
  if (val.length == 0) {
    val = mobileSearchbox.value
  }
  if (evt.keyCode == 13) {//if is enter key pressed
    getResults(val);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults)
    .catch(error => {
      console.log("ERROR", error)
      toastr.error('Error while searching, try again', 'Inconceivable!')
    });
}

function displayResults(weather) {
  if (weather.cod === "404") {
    toastr.error(`No result find for your search`)

  }
  // else if (weather.cod === "200") {
  //   toastr.success(`Result find for ${weather.name}`)
  // }

  let city = document.querySelector('.date-and-place .place');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.date-and-place .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.temperature-sensor');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current-weather');
  weather_el.innerText = weather.weather[0].main;

  let lat = document.querySelector('.lat');
  lat.innerHTML = `${weather.coord.lat}`;

  let long = document.querySelector('.long');
  long.innerHTML = `${weather.coord.lon}`;

  let speed = document.querySelector('.wind-speed');
  speed.innerHTML = `${weather.wind.speed}`;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

jQuery(document).ready(function () {
  toastr.info(`London is the default city search`)
  getResults('London')
});