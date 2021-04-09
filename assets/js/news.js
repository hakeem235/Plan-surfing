var urlLogin = 'https://gnews.io/api/v4/search?q=ottawa&token=0453f858d186497aada1593f7f369718';
fetch(urlLogin, {
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    var firstArticle = data.articles[0];


    //display 1 current article on main page
    $('.newsText').hide();
    $('.loginText').text(firstArticle.title);
    $('.description').text(firstArticle.content);
    $('#results').append('<h2>' + firstArticle.title + '</h2>');
    $('#results').append('<img src=' + firstArticle.image + '>');
    $('#results').append('<p>' + firstArticle.content + '</p>');
    $('#results').append('<h4>' + firstArticle.source.name + '</h4>');
    $('#results').append('<a target="_blank" href="' + firstArticle.url + '">' + firstArticle.url + '</a>');
  })

//clicking on the News title
$('#news').on('click', function () {
  $('#newsSections').show();
  $('.newsText').css('text-align', 'center');
  $('.newsText').show();
  $('.mainScreen').css('display', 'table');
})

//clicking on serch button
$('#searchBtn').on('click', function () {

  $('.is-loading').show();
  $('.is-link').hide();
  $('#results').empty();

  //fetch based on input info
  var currentSearch = $('#currentSearch').val();
  var urlNews = 'https://gnews.io/api/v4/search?q=' + currentSearch + '&token=0453f858d186497aada1593f7f369718';

  if (currentSearch !== "") {
    fetch(urlNews, {
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {


        var latestArticle = data.articles;
        //when input is empty
        if (latestArticle.length == 0) {
          $('.firstArticleText').html('No results found. Please try a different search')
          $('.is-loading').hide();
          $('.is-link').show();
        }


        for (var i = 0; i < latestArticle.length; i++) {

          $('.is-loading').hide();
          $('.is-link').show();
          $('#results').append('<h2>' + latestArticle[i].title + '</h2>');
          $('#results').append('<img src=' + latestArticle[i].image + '>');
          $('#results').append('<p>' + latestArticle[i].content + '</p>');
          $('#results').append('<h4>' + latestArticle[i].source.name + '</h4>');
          $('#results').append('<a target="_blank" href="' + latestArticle[i].url + '">' + latestArticle[i].url + '</a>');

        }

      })


    //whem input doesnt match api's articles
  } else {
    $('.firstArticleText').html('No results found. Please try a different search');
    $('.is-loading').hide();
    $('.is-link').show();



  }

  //clean input
  $('#currentSearch').val('');

})

//clear button function
$('#clearBtn').on('click', function () {
  $('#results').empty()

});


