$('#btnWeather').on('click', function () {
    // Hide Section
    $('#dailyTasks').hide();
    $('.sectionImg').hide();
    $('.quote-wrapper').hide();
    $('.between').hide();
    $('#news').hide();
    $('#w3Cell').hide();
    // Show Section
    $('#humidity').show();
    $('#wind-speed').show();
    $('#temperature').show();
    // styling section
    // $('#cityName').css('text-align', 'center')
    // $('#description').css('text-align', 'center')
    // $('#temperature').css('text-align', 'center')
    // $('#wind-speed').css('text-align', 'center')
    // $('#humidity').css('text-align', 'center')
})

var apiKey = "cd7b46258d74ce0db68ce9bc4d5cbf2e";
var rquestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Ottawa&units=metric&appid=' + apiKey;

function mobileWesther(rquestUrl) {
    fetch(rquestUrl)
        .then(function (respones) {
            return respones.json();
        })
        .then(function (data) {
            console.log(data)
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

