$('#news').on('click', function () {
  $('#dailyTasks').hide();
  $('#weather').hide();
  $('.sectionImg').hide();
  $('#quotes').hide();
  $('#newsSections').show();

})

$('.input-field').on('click', function () {
  $('.inside-text').hide();
})

$('#searchBtn').on('click', function () {

  $('#loader').show();

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

        // var currentOutput = '';
        var latestArticle = data.articles;
        console.log(latestArticle)

        //$(latestArticle[i].title).add('h4')
        // $(latestArticle[i].description).add('p')

        for (var i = 0; i < latestArticle.length; i++) {

          $('#loader').hide();
          $('#results').append('<h2>' + latestArticle[i].title + '</h2>')
          $('#results').append('<img src=' + latestArticle[i].image + '>')
          $('#results').append('<p>' + latestArticle[i].content + '</p>')
          $('#results').append('<h4>' + latestArticle[i].source.name + '</h4>')
          $('#results').append('<a href="' + latestArticle[i].source.url + '">' + latestArticle[i].source.url + '</a>')









          // let article = $('div')
          // article.text(latestArticle[i].title)
          // $('#title').append()



          // $('#title' + i).html(data.articles.title);
          // $(data.articles[i].title).append('#title');



          // $(latestArticle[i].title).add('div').appendTo('#newsSections');

          //$(latestArticle[i].image).attr('src');
          //console.log()

          // $('currentSearch').html() = $(latestArticle[i].image).attr('src', latestArticle[i].image) + $(latestArticle[i].title).add('h4') + $(latestArticle[i].description).add('p') + $(latestArticle[i].source.name).add('h3') + $(latestArticle[i].source.url).add('a')

        }

      })






  } else {
    console.log("enter valid request");
  }

  $('#results').empty();

  $('#currentSearch').val('');

})

