//var quoteText = document.getElementById("quote-text");
//var quoteTags = document.getElementById("quote-tags");
//var quoteAuthor = document.getElementById("quote-author");
//var genQuoteBtn = document.getElementById("gen-quote-btn");

// $.getJSON('https://api.quotable.io/random', function (data) {
// console.log(`${data.content} —${data.author}`)
// })
// }

//  fetch('https://api.quotable.io/random')   https://type.fit/api/quotes
// .then(response => response.json())
// .then(data => {
//   console.log(`${data.content} —${data.author}`)
// })
//fetch('https://api.quotable.io/random')
//.then(res => console.log(res))

//.then(function(response){
//    return response.json()
//  })
//  .then(function(data){
//  console.log(data)
// var textContent = data.content;
// var textContent = data.tags;
// var textContent = `-- ${data.author}`;
// })

let quotesArr = [];
let quoteObj;
var quoteText = document.getElementById("quote-text");
var quoteTags = document.getElementById("quote-tags");
var quoteAuthor = document.getElementById("quote-author");
var genQuoteBtn = document.getElementById("gen-quote-btn");

function randomQuote() {
  fetch("https://api.quotable.io/random")
    .then(function (response) {
      return response.json();
    })
   // .then(function (data) {
   //   console.log("data", data);
   //   quotesArr = data;
   //  quoteObj = quotesArr[Math.floor(Math.random() * quotesArr.length)];
   //   console.log("quoteObj", quoteObj)
   .then(function (data) {
    console.log("data", data);
    quoteText.textContent = data.content;
    quoteTags.textContent = data.tags;
    quoteAuthor.textContent = `-- ${data.author}`;
    });
  }
  
randomQuote();
genQuoteBtn.addEventListener('click', randomQuote());
setInterval(randomQuote() ,10000);
