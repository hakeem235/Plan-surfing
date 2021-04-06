
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
    quoteAuthor.textContent = `- ${data.author}`;
    });
  }
  
randomQuote();
genQuoteBtn.addEventListener('click', function(){
randomQuote()});
setInterval(randomQuote() ,10000);
