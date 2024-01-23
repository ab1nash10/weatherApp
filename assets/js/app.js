"use strict";

import { fetchData, url } from "./api.js";

/**
 * Adds an event listener to multiple elements.
 * @param {NodeList} elements - The elements to add the event listener to.
 * @param {string} eventType - The type of event to listen for.
 * @param {Function} callback - The callback function to execute when the event is triggered.
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (const element of elements) element.addEventListener(eventType, callback);
};

// Toggle search in mobile devices

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = function () {
  searchView.classList.toggle("active");
};
addEventOnElements(searchTogglers, "click", toggleSearch);

//? search integration

const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeOut = null;
const searchTimeOutDuration = 500;
searchField.addEventListener("input", function () {
  searchTimeOut ?? clearTimeout(searchTimeOut);

  if (!searchField.value) {
    searchResult.classList.remove("active");
    searchResult.innerHTML = "";
    searchField.classList.remove("searching");
  } else {
    searchField.classList.add("searching");
  }

  if (searchField.value) {
    searchTimeOut = setTimeout(() => {
      fetchData(url.geoCoding(searchField.value), function (locations) {
        searchField.classList.remove("searching");
        searchResult.classList.add("active");
        searchResult.innerHTML = `
         <ul class="view-list" data-search-list>
        </ul>`;
        const /* {NodeList} | [] */ items = [];
        for (const { name, lat, lon, country, state } of locations) {
          const searchItem = document.createElement("li");
          searchItem.classList.add("view-item");
          searchItem.innerHTML = ` 
          <span class="m-icon">location_on</span>
          <div>
            <p class="item-title">${name}</p>
            <p class="label-2 item-subtitle">${state || ""} ${country} </p>
          </div>

          <a href="#weather?lat=${lat}&lon=${lon}" class="item-link has-state" aria-label="${name} weather" data-search-toggler></a>
            `;
          searchResult
            .querySelector("[data-search-list]")
            .appendChild(searchItem);
          items.push(searchItem.querySelector("[data-search-toggler]"));
        }
      });
    }, searchTimeOutDuration);
  }
});
