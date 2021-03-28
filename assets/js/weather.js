$('#weatherBtn').on('click', function () {
    $('#dailyTasks').hide();
    $('.sectionImg').hide();
    $('.quote-wrapper').hide();
    $('.between').hide();
    $('#news').hide();
    $('#w3Cell').hide();
    $('#humidity').show();
    $('#wind-speed').show()

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
            $('#cityName').text(data.name);
            $("<img>").attr("src", iconUrl).appendTo("#cityName")
            $('#temperature').text("Temperature: " + data.main.temp.toFixed(0) + ' °C');
            $('#humidity').text("Humidity: " + data.main.humidity + "%").hide();
            $('#wind-speed').text("Wind Speed: " + data.wind.speed + ' MPH').hide();
        })
}
// call the funtions section 
mobileWesther(rquestUrl)

