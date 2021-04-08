

var placesEl = $('#places');
var searchButton = $("#search-button");
var myCities = [];
var apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
var map;

$('.weatherBtn').on('click', function () {
  // Hide Section
  $('#dailyTasks').hide();
  $('.sectionImg').hide();
  $('.quote-wrapper').hide();
  $('.between').hide();
  $('#news').hide();
  $('#cell3W').hide();
  $('.weather').show();
  $('.container').hide();
  $('.weatherName').hide();
  // Show Section
  $('.desktop').show()
  // styling section
  $('#cityName').css('text-align', 'center')
  $('#description').css('text-align', 'center')
  $('.temperature').css('text-align', 'center')
  $('.wind-speed').css('text-align', 'center')
  $('.humidity').css('text-align', 'center')
  $('.btnSearchSection').addClass('w3-center')
  $('.mainScreenW').css('display', 'table');
  $('#tasksSquares').hide();
  $('#newsSquares').hide();
})


//side bar weather
$('.weatherMainBtn').on('click', function () {
  // Hide Section
  $('#dailyTasks').hide();
  $('.sectionImg').hide();
  $('.quote-wrapper').hide();
  $('.between').hide();
  $('#news').hide();
  $('#cell3W').hide();
  $('.weather').show();
  $('.container').hide();
  $('.weatherName').hide();
  $('').hide();
  // Show Section
  $('.desktop').show()
  // styling section
  $('#cityName').css('text-align', 'center')
  $('#description').css('text-align', 'center')
  $('.temperature').css('text-align', 'center')
  $('.wind-speed').css('text-align', 'center')
  $('.humidity').css('text-align', 'center')
  $('.btnSearchSection').addClass('w3-center')
  $('.mainScreenW').css('display', 'table');
  $('#tasksSquares').hide();
  $('#newsSquares').hide();
})

$('.weatherName').on('click', function () {
  // Hide Section
  $('#dailyTasks').hide();
  $('.sectionImg').hide();
  $('.quote-wrapper').hide();
  $('.between').hide();
  $('#news').hide();
  $('#cell3W').hide();
  $('.weather').show();
  $('.container').hide();
  $('.weatherName').hide();
  // Show Section
  $('.desktop').show()
  // styling section
  $('#cityName').css('text-align', 'center')
  $('#description').css('text-align', 'center')
  $('.temperature').css('text-align', 'center')
  $('.wind-speed').css('text-align', 'center')
  $('.humidity').css('text-align', 'center')
  $('.btnSearchSection').addClass('w3-center')
  $('.mainScreenW').css('display', 'table');
  $('#tasksSquares').hide();
  $('#newsSquares').hide();

})

//side bar News nav
$('.newsBtn').on('click', function () {
  $('#newsSections').show();
  $('#mySidebar').hide();
  $('#dailyTasks').hide();
  $('.sectionImg').hide();
  $('#current-weather').hide();
  $('.quote-wrapper').hide();
  $('#newsName').hide();
  $('#w3Cell').hide();
  $('.between').hide();
  $('#weatherSection').hide();
  $('.newsText').css('text-align', 'center');
  $('.loginText').hide();
  $('.newsText').show();
  $('.description').hide();
  $('#tasksSquares').hide();
  $('.mainScreenW').css('display', 'table');
})



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
      console.log(data)
      var currentDate = moment().format('L');
      var weatherIcon = data.weather[0].icon;
      var iconUrl = 'https://openweathermap.org/img/wn/' + weatherIcon + '.png';
      //parse the response for name of city and concanatig the date and icon.
      $('#cityNamey').text((data.name.toUpperCase()) + " " + currentDate);
      $("<img>").attr("src", iconUrl).appendTo("#cityName")
      var temp = (data.main.temp);
      $('#cityName').text(data.name + " - " + data.sys.country);
      $('#description').text((data.weather[0].description).toUpperCase())
      $('.temperature').text(" Temperature: " + temp.toFixed(0) + ' °C').hide();
      $('.humidity').text(" Humidity: " + data.main.humidity + "%").hide();
      $('.wind-speed').text("Wind Speed: " + data.wind.speed.toFixed(1) + ' MPH').hide();

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
        function initMap() {
          map = new google.maps.Map(document.getElementById("map"), {
            center: { lat, lng: lon },
            zoom: 10,
          });
        }
        initMap() 
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



// function iniMap() {
//   var lat = data.coord.lat;
//   var lon = data.coord.lon;
//   var latLonUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
//   fetch(latLonUrl)
//     .then(function (response) {
//       return response.json()
//     })
//     .then(function (data) {
//       map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: lat, lng: lon },
//         zoom: 8,
//       })
//     })
// }

// iniMap()