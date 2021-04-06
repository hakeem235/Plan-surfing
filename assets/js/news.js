//news based on location picked when registred
//var currentLocation = $('#location').val();
//var urlLogin = 'https://gnews.io/api/v4/search?q=' + currentLocation + '&token=de3770744bd87a3086cf2a0c1b84b3a4';
var urlLogin = 'https://gnews.io/api/v4/search?q=ottawa&token=de3770744bd87a3086cf2a0c1b84b3a4';
console.log(urlLogin)
fetch(urlLogin, {
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    var firstArticle = data.articles[0];
    console.log(firstArticle)

    $('.newsText').hide();
    $('.loginText').text(firstArticle.title)
    $('.description').text(firstArticle.content)
    $('#results').append('<h2>' + firstArticle.title + '</h2>')
    $('#results').append('<img src=' + firstArticle.image + '>')
    $('#results').append('<p>' + firstArticle.content + '</p>')
    $('#results').append('<h4>' + firstArticle.source.name + '</h4>')
    $('#results').append('<a target="_blank" href="' + firstArticle.url + '">' + firstArticle.url + '</a>');


  })

//

$('#news').on('click', function () {
  $('#dailyTasks').hide();
  $('.sectionImg').hide();
  $('#current-weather').hide();
  $('.quote-wrapper').hide();
  $('#newsSections').show();
  $('#newsName').hide();
  $('#w3Cell').hide();
  $('.between').hide();
  $('#weatherSection').hide();
  $('.newsText').css('text-align', 'center')
  $('.loginText').hide();
  $('.newsText').show();
  $('.description').hide();


})


$('#searchBtn').on('click', function () {

  $('.is-loading').show();
  $('.is-link').hide();
  $('#results').empty();


  var currentSearch = $('#currentSearch').val();
  var urlNews = 'https://gnews.io/api/v4/search?q=' + currentSearch + '&token=de3770744bd87a3086cf2a0c1b84b3a4';
  console.log(currentSearch)

  if (currentSearch !== "") {
    fetch(urlNews, {
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);


        var latestArticle = data.articles;
        console.log(latestArticle)

        if (latestArticle.length == 0) {
          $('.firstArticleText').html('No results found. Please try a different search')
          $('.is-loading').hide();
          $('.is-link').show();
        }


        for (var i = 0; i < latestArticle.length; i++) {

          $('.is-loading').hide();
          $('.is-link').show();
          $('#results').append('<h2>' + latestArticle[i].title + '</h2>')
          $('#results').append('<img src=' + latestArticle[i].image + '>')
          $('#results').append('<p>' + latestArticle[i].content + '</p>')
          $('#results').append('<h4>' + latestArticle[i].source.name + '</h4>')
          $('#results').append('<a target="_blank" href="' + latestArticle[i].url + '">' + latestArticle[i].url + '</a>');

        }

      })



  } else {
    $('.firstArticleText').html('No results found. Please try a different search')
    console.log('hello')
    $('.is-loading').hide();
    $('.is-link').show();



  }

  $('#currentSearch').val('');

})

$('#clearBtn').on('click', function () {
  $('#results').empty()


});


$('#newsBtn').on('click', function () {
  $('#newsSections').show()
  $('#mySidebar').hide()
  $('#dailyTasks').hide();
  $('.sectionImg').hide();
  $('#current-weather').hide();
  $('.quote-wrapper').hide();
  $('#newsName').hide();
  $('#w3Cell').hide();
  $('.between').hide();
  $('#weatherSection').hide();
  $('.newsText').css('text-align', 'center')
  $('.loginText').hide();
  $('.newsText').show();
  $('.description').hide();

})




