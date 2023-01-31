let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let currentYear = date.getFullYear();
let currentDay = days[date.getDay()];
let currentMonth = months[date.getMonth()];
let currentDate = date.getDate();

let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minu = date.getMinutes();
if (minu < 10) {
  minu = `0${minu}`;
}
let formattedDate = `${currentDay},    ${hour}:${minu}`;
let li = document.querySelector("#date");
li.innerHTML = formattedDate;

function alert2(event) {
  event.preventDefault();
  let searchInfo = document.querySelector("#city-input");
  let liCity = document.querySelector("#city");
  liCity.innerHTML = searchInfo.value;
  let city = searchInfo.value;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayWeather);
}
function displayWeather(response) {
  let curCity = response.data.name;
  let cityDiv = document.querySelector("#city");
  cityDiv.innerHTML = `${curCity}`;

  //egrees, ${description}, in ${response.data.name}
  let description = response.data.weather[0].description;
  let desDiv = document.querySelector("#description");
  desDiv.innerHTML = `${description}`;

  let temperature = Math.round(response.data.main.temp);
  let tempDiv = document.querySelector("#temperature");
  tempDiv.innerHTML = `${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let humDiv = document.querySelector("#humidity");
  humDiv.innerHTML = `${humidity}`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windDiv = document.querySelector("#wind");
  windDiv.innerHTML = `${windSpeed}`;
}

let challenge2 = document.querySelector("#search-form");
challenge2.addEventListener("submit", alert2);

let challenge3 = document.querySelector("#current-location-button");
challenge3.addEventListener("click", currentLoc);

function currentLoc() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeather);
}

let celFar = "cel";
//let challenge3 = document.querySelector("#celsius-link");
//challenge3.addEventListener("click", toCel);
function toCel() {
  if (celFar === "far") {
    let temp = document.querySelector("#temperature");
    let f = parseInt(temp.innerHTML);
    let cel = Math.floor(((f - 32) * 5) / 9);
    temp.innerHTML = cel;
    celFar = "cel";
  }
}

let challenge4 = document.querySelector("#fahrenheit-link");
//challenge4.addEventListener("click", toFar);
function toFar() {
  if (celFar === "cel") {
    let temp = document.querySelector("#temperature");
    let c = parseInt(temp.innerHTML);
    let far = Math.floor((c * 9) / 5 + 32);
    temp.innerHTML = far;
    celFar = "far";
  }
}
