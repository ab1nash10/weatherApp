/* The code snippet is a JavaScript module that exports two functions and an object. */

"use strict";

/* The code block is defining a constant variable `api_key` which holds a specific API key. */
// const api_key = process.env.apiKey;
const api_key = "";

//* fetch data from server

export const fetchData = function (URL, callback) {
  fetch(`${URL}&appid=${api_key}`)
    .then((resp) => resp.json())
    .then((data) => callback(data));
};

/* The `export const url` object is exporting a set of functions that generate URLs for different API
endpoints related to weather data. Each function takes in latitude (`lat`) and longitude (`lon`)
parameters and returns a formatted URL string. */
export const url = {
  currentWeather(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?${lat}&${lon}&units=metric`;
  },
  forecast(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/forecast?${lat}&${lon}&units=metric`;
  },
  airPollution(lat, lon) {
    return `http://api.openweathermap.org/data/2.5/air_pollution?${lat}&${lon}`;
  },
  reverseGeo(lat, lon) {
    return `http://api.openweathermap.org/geo/1.0/reverse?${lat}&${lon}&limit=5`;
  },
  geoCoding(query) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`;
  },
};
