// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)

  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {

    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location
    let locationInput = document.querySelector(`#location`)

    // - Get the user-entered location from the element's value
    let location = locationInput.value

     // - Get a reference to the element containing the user-entered location
     let daysInput = document.querySelector(`#days`)

     // - Get the user-entered location from the element's value
     let days = daysInput.value

    // - Check to see if the user entered anything; if so:
    if (location.length > 0) {

      // - Clear out previous values
      document.querySelector(`.forecast`).innerHTML = ``

      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=cdfcd7ef84a44da0a7b163312210205&q=${location}&days=${days}`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
      let current = json.current
      let locationCurrent = json.location
      let forecast = json.forecast

      // - Continue the recipe yourself!
      // - Write inputted city into header title
      let cityInput = document.querySelector(`.current`)
      cityInput.innerHTML = `
      <div class="text-center space-y-2">
        <div class="font-bold text-3xl">Current Weather for ${locationCurrent.name}, ${locationCurrent.region}</div>
        <div class="font-bold">
          <img src="http:${current.condition.icon}" class="inline-block">
          <span class="temperature">${current.temp_f}</span>° 
          and
          <span class="conditions">${current.condition.text}</span>
        </div>
      </div>
      `
      // - Only one forecast header
      let forecastInput = document.querySelector(`.forecast`)
      forecastInput.innerHTML = `
      <div class="text-center space-y-8">
      <div class="font-bold text-3xl">${days} Day Forecast</div>
      </div>
      `
      // For loop to get appropriate forecast
    for(let i=0; i < forecast.forecastday.length;i++){
        let forecastday=forecast.forecastday[i]
    forecastInput.insertAdjacentHTML(`beforeend`, `
    <div class="text-center">
        <img src="https:${forecastday.day.condition.icon}" class="mx-auto">
        <h1 class="text-2xl text-bold text-gray-500">${forecastday.date}</h1>
        <h2 class="text-xl">${forecastday.day.maxtemp_f}</span>° – ${forecastday.day.mintemp_f}</span>° </h2>
        <p class="text-gray-500">${forecastday.day.condition.text}</h1>
    </div>
    `
    )
    }
    }
  })
})