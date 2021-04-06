

var placesEl = $('#places');
var searchButton = $("#search-button");
var myCities = [];
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";

function getCities() {
  var storage = localStorage.getItem('places')
  if (storage) {
    myCities = JSON.parse(storage)
    myCities.forEach(city => { printCities(city) })
  }
}

getCities();

function printCities(city) {
  placesEl.append('<li>' + (city).toUpperCase() + '</li>');
  console.log(city)
  $(placesEl).children().attr("class", "list-group-item")
  $('.list-group').css('visibility', 'visible');
  $('.btn-secondary').css('visibility', 'visible');
}


// display the weather from the list 
$('#places').on('click', '.list-group-item', function () {
  let clickedCity = ''
  clickedCity = $(this).html();
  console.log(clickedCity)
  var weatherUrl = generateURL(clickedCity);
  currentWeather(weatherUrl);
  fiveDayForecast(clickedCity);
  $('#mainCity').show();
  $('#future-weather').show();
})

searchButton.click(function () {
  //get name and its value
  var cities = $('input[id="search-city"]').val();
  //refactor url
  var weatherUrl = generateURL(cities);
  currentWeather(weatherUrl);
  myMap(weatherUrl)
  fiveDayForecast(cities);

  //if empty
  if (!cities) {
    // alert("No cities chosen")
    return;
  }
  printCities(cities)
  currentWeather(weatherUrl)
  //clear input
  $('input[id="search-city"]').val('');

  myCities.push(cities)

  //save at local storage
  localStorage.setItem('places', JSON.stringify(myCities));

})

searchButton.click(function () {

  $('#mainCity').show();
  $('#future-weather').show();
})

function generateURL(cities) {
  var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cities + '&units=metric&appid=' + apiKey;
  return weatherUrl;
}

function showWeather(event) {
  event.preventDefault();
  if (inputCity.val() !== "") {
    place = inputCity.value();
    currentWeather(place);
  }
};
// get current weather
function currentWeather(weatherUrl) {
  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      var currentDate = moment().format('L');
      var weatherIcon = data.weather[0].icon;
      var iconUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '.png';
      //parse the response for name of city and concanatig the date and icon.
      $('#current-city').text((data.name.toUpperCase()) + " " + currentDate);
      $("<img>").attr("src", iconUrl).appendTo("#current-city")
      var temp = (data.main.temp);
      $('.temperature').text(" " + temp.toFixed(0) + ' °C');
      $('.humidity').text(" " + data.main.humidity + "%");
      $('.wind-speed').text(" " + data.wind.speed.toFixed(1) + ' MPH');

      //get UV Index
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      // var uvTndexUrl = 
      var uvIndexUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      fetch(uvIndexUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          $('#uv-index').text(" " + data.value)
          if (data.value <= 2) {
            $('#uv-index').css('background-color', 'yellow')
          } else if (data.value <= 5) {
            $('#uv-index').css('background-color', 'orange')
          } else if (data.value <= 7) {
            $('#uv-index').css('background-color', 'red')
          } else {
            $('#uv-index').css('background-color', 'violet')
          }
        })
    })
}
// get five day forecast
function fiveDayForecast(city) {
  var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
  fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (i = 0; i < 5; i++) {
        var date = new Date((data.list[((i + 1) * 8) - 1].dt) * 1000).toLocaleDateString();
        var iconcode = data.list[((i + 1) * 8) - 1].weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
        var temp = data.list[((i + 1) * 8) - 1].main.temp.toFixed(0);
        var humidity = data.list[((i + 1) * 8) - 1].main.humidity;

        $("#fDate" + i).text(date);
        $("#fImg" + i).html("<img src=" + iconurl + ">");
        $("#fTemp" + i).text(" " + temp + " °C");
        $("fHumidity" + i).text(" " + humidity + "%");

      }

    });
}

//Clear the search history from the page
function clearHistory(event) {
  event.preventDefault();
  myCities = [];
  localStorage.removeItem('places');
  document.location.reload();

}
//Click Handlers
$("#clear-history").on("click", clearHistory);

$('.weatherBtn').on('click', function () {
  // Hide Section
  $('#dailyTasks').hide();
  $('.sectionImg').hide();
  $('.quote-wrapper').hide();
  $('.between').hide();
  $('#news').hide();
  $('#cell3W').hide();
  // Show Section
  $('#humidity').show();
  $('#wind-speed').show();
  $('#temperature').show();
  // styling section
  $('#cityName').css('text-align', 'center')
  $('#description').css('text-align', 'center')
  $('#temperature').css('text-align', 'center')
  $('#wind-speed').css('text-align', 'center')
  $('#humidity').css('text-align', 'center')
})

// var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
var rquestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Ottawa&units=metric&appid=' + apiKey;

function mobileWesther(rquestUrl) {
  fetch(rquestUrl)
    .then(function (respones) {
      return respones.json();
    })
    .then(function (data) {
      var weatherIcon = data.weather[0].icon;
      var iconUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '.png';
      //parse the response for name of city and concanatig the date and icon.
      $('#cityName').text(data.name + " - " + data.sys.country);
      $('#description').text((data.weather[0].description).toUpperCase())
      $("<img>").attr("src", iconUrl).appendTo("#cityName")
      $('#temperature').text("Temperature: " + data.main.temp.toFixed(0) + ' °C').hide();
      $('#humidity').text("Humidity: " + data.main.humidity + "%").hide();
      $('#wind-speed').text("Wind Speed: " + data.wind.speed + ' MPH').hide();

    })
}
// call the funtions section 
mobileWesther(rquestUrl)




function myMap(mapUrl) {
  fetch(mapUrl)
    .then(function (respones) {
      return respones.json();
    })
    .then(function (data) {
      var mapProp = {
        center: new google.maps.LatLng(data.coord.lat, data.coord.lon),
        zoom: 5,
      };
      var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    })
}






