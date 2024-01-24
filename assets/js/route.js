/* The code provided is a JavaScript code that sets up a simple routing system for a weather
application. Here's a breakdown of what the code does: */
"use strict";

import { error404, updateWeather } from "./app.js";
const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"; //london

/**
 * Gets the current location coordinates and updates the weather based on the latitude and longitude.
 */
const currentLocation = () => {
  window.navigator.geolocation.getCurrentPosition(
    (res) => {
      const { latitude, longitude } = res.coords;
      updateWeather(`lat=${latitude}`, `lon =${longitude}`);
    },
    (err) => {
      window.location.hash = defaultLocation;
    }
  );
};

/**
 * Updates the weather based on the searched location.
 * @param {string} query - The location query string.
 */
const searchedLocation = (query) => {
  updateWeather(...query.split("&"));
};
// updateWeather ("lat = 51.5073219 ", "lon = -0.1276474")

/* The code is creating a `Map` object called `routes` that maps URL routes to corresponding route
handlers. */
const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation],
]);

/**
 * Checks the hash value in the URL and executes the corresponding route handler or displays a 404 error.
 */
const checkHash = function () {
  const requestUrl = window.location.hash.slice(1);
  const [route, query] = requestUrl.includes
    ? requestUrl.split("?")
    : [requestUrl];
  routes.get(route) ? routes.get(route)(query) : error404();
};

window.addEventListener("hashchange", checkHash);
window.addEventListener("load", function () {
  if (!this.window.location.hash) {
    this.window.location.hash = "#/current-location";
  } else {
    checkHash();
  }
});
