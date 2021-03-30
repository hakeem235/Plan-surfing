//news based on location picked when registred

// var urlNews = 'https://gnews.io/api/v4/search?q=' + currentSearch + '&token=de3770744bd87a3086cf2a0c1b84b3a4';
//

$('#news').on('click', function () {
  $('#dailyTasks').hide();
  $('#current-weather').hide();
  $('.sectionImg').hide();
  $('.quote-wrapper').hide();
  $('#newsSections').show();
  $('#newsName').hide();

})


$('#searchBtn').on('click', function () {

  $('.is-loading').show();
  $('.is-link').hide();


  var currentSearch = $('#currentSearch').val();
  var urlNews = 'https://gnews.io/api/v4/search?q=' + currentSearch + '&token=de3770744bd87a3086cf2a0c1b84b3a4';

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


        for (var i = 0; i < latestArticle.length; i++) {

          $('.is-loading').hide();
          $('.is-link').show();
          $('#results').append('<h2>' + latestArticle[i].title + '</h2>')
          $('#results').append('<img src=' + latestArticle[i].image + '>')
          $('#results').append('<p>' + latestArticle[i].content + '</p>')
          $('#results').append('<h4>' + latestArticle[i].source.name + '</h4>')
          $('#results').append('<a href="' + latestArticle[i].url + '">' + latestArticle[i].url + '</a>')

          // $('<a>').on('click', function () {
          //   $(this).attr('target', '_blank');
          // })

          // $(function () {
          //   $('<a>').prop('target', '_blank');
          // })


        }

      })


  } else {
    $('#results').append('<h2>' + 'No results found. Please try a different search' + '</h2>')

  }

  $('#results').empty();

  $('#currentSearch').val('');

})

$('#clearBtn').on('click', function () {
  $('#results').empty()




});


