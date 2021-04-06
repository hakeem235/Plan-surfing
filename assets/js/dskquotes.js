
var dskquoteText = document.getElementById("dsk-quote-text");
var dskquoteTags = document.getElementById("dsk-quote-tags");
var dskquoteAuthor = document.getElementById("dsk-quote-author");
var dskgenQuoteBtn = document.getElementById("dsk-gen-quote-btn");

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
    dskquoteText.textContent = data.content;
    dskquoteTags.textContent = data.tags;
    dskquoteAuthor.textContent = `- ${data.author}`;
    });
  }
  
randomQuote();
dskgenQuoteBtn.addEventListener('click', function(){
randomQuote()});
setInterval(randomQuote() ,10000);
