const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const temperatureDisplay = document.querySelector("#temperature");
const windSpeedDisplay = document.querySelector("#wind-speed");
const windChillDisplay = document.querySelector("#wind-chill");

const temperatureCelsius = 8;
const windSpeedKph = 12;

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

function calculateWindChill(temperature, windSpeed) {
  return 13.12 + 0.6215 * temperature - 11.37 * windSpeed ** 0.16 + 0.3965 * temperature * windSpeed ** 0.16;
}

temperatureDisplay.textContent = temperatureCelsius;
windSpeedDisplay.textContent = windSpeedKph;

if (temperatureCelsius <= 10 && windSpeedKph > 4.8) {
  windChillDisplay.textContent = `${calculateWindChill(temperatureCelsius, windSpeedKph).toFixed(1)} °C`;
} else {
  windChillDisplay.textContent = "N/A";
}