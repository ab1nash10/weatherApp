"use strict";

/**
 * Array of weekday names.
 * @type {string[]}
 */
export const weekdaysNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Array of month names.
 * @type {string[]}
 */
export const monthNames = [
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
  "December",
];

/**
 * The function `getDate` takes a Unix timestamp and a timezone, and returns a formatted date string.
 * @param dateUnix - The `dateUnix` parameter is a Unix timestamp, which represents the number of
 * seconds that have elapsed since January 1, 1970, 00:00:00 UTC. It is used to calculate the date and
 * time.
 * @param timezone - The `timezone` parameter is the offset in seconds from UTC (Coordinated Universal
 * Time). It is used to calculate the local date and time based on the provided `dateUnix` parameter.
 * @returns a formatted date string in the format "Weekday Day, Month".
 */
export const getDate = function (dateUnix, timezone) {
  const date = new Date((dateUnix + timezone) * 1000);
  const weekdaysName = weekdaysNames[date.getUTCDay()];
  const monthName = monthNames[date.getUTCMonth()];

  return `${weekdaysName} ${date.getUTCDate()} , ${monthName}`;
};

/**
 * Returns the formatted time based on the given Unix timestamp and timezone.
 * @param {number} timeUnix - The Unix timestamp.
 * @param {number} timezone - The timezone offset in seconds.
 * @returns {string} The formatted time in HH:MM AM/PM format.
 */

export const getTime = function (timeUnix, timezone) {
  const time = new Date((timeUnix + timezone) * 1000);
  const hours = time.getUTCHours();
  const minutes = time.getUTCMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12}:${minutes} ${period}`;
};

/**
 * Returns the formatted time based on the given Unix timestamp and timezone.
 * @param {number} timeUnix - The Unix timestamp.
 * @returns {string} The formatted time in HH AM/PM format.
 */

export const getHours = function (timeUnix, timezone) {
  const time = new Date((timeUnix + timezone) * 1000);
  const hours = time.getUTCHours();
  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12} ${period}`;
};

/**
 * Converts meters per second to kilometers per hour.
 * @param {number} mps - The speed in meters per second.
 * @returns {number} The speed in kilometers per hour.
 */
export const mps_to_kmh = (mps) => {
  const mph = mps * 3600;
  return mph / 1000;
};

/**
 * AQI Text object containing air quality levels and corresponding messages.
 * @typedef {Object} AQIText
 * @property {Object}  air quality level.
 * @property {string} .level - The level of air quality (e.g., "Good").
 * @property {string} .message - The message describing the air quality level.
 */

export const aqiText = {
  1: {
    level: "Good",
    message:
      "Air quality is considered satisfactory, and air pollution poses little or no risk",
  },
  2: {
    level: "Fair",
    message:
      "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution",
  },
  3: {
    level: "Moderate",
    message:
      "Members of sensitive groups may experience health effects. The general public is not likely to be affected.",
  },
  4: {
    level: "Poor",
    message:
      "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.",
  },
  5: {
    level: "Very Poor",
    message:
      "Health alert: everyone may experience more serious health effects.",
  },
};
