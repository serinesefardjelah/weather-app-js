const api = {
  key : "dce727bc70baaa880d677d0c223a7457",

  // key: "afaf9f8d48cff6cafd32e23220bcfdbf",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}
// function getResults (query) {
//   fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
//     .then(weather => {
//       return weather.json();
//     }).then(displayResults);
// }    
async function getResults(query){
    
  console.log(`${api.base}weather?q=${query}&units=metric$appid=${api.key}`)
  var a = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
  a=await a.json()
  displayResults(a)
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}