var searchEl = document.getElementById("default-search")
var btnEl = document.getElementById("btn")
var googleAPIkey = "AIzaSyCQ2C-bnOvVf1LWKDlWlQy0DSckI8OR-XI"
var geoAPIkey = "5238afc3f846ceadbc3c137f84bf5d39"

let map;

function formHandler(event) {
    event.preventDefault()
    var city = searchEl.value.trim()
    if (city) {
        geocodeCall(city)
        searchEl.value = ""
    }
}

function geocodeCall(cityValue) {
    var queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=5&appid=${geoAPIkey}`

    fetch(queryURL)
        .then(response=> response.json())
        .then(data=> {
            console.log(data);
            initMap(data[0].lat, data[0].lon)
        });
    }

function initMap(lat, lng) {
  const localContextMapView = new google.maps.localContext.LocalContextMapView({
    element: document.getElementById("map"),
    placeTypePreferences: [
      { type: "restaurant" },
      { type: "tourist_attraction" },
    ],
    maxPlaceCount: 12,
  });

  map = localContextMapView.map;
  map.setOptions({
    center: {lat, lng},
    zoom: 14,
  });
}

window.initMap = initMap

btnEl.addEventListener("click", formHandler)