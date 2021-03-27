//const quoteText = document.getElementById("quote-text");
//const quoteTags = document.getElementById("quote-tags");
//const quoteAuthor = document.getElementById("quote-author");
//const genQuoteBtn = document.getElementById("gen-quote-btn");
  
const quoteText = document.querySelector("#quote-text");
const quoteTags = document.querySelector("#quote-tags");
const quoteAuthor = document.querySelector("#quote-author");
const genQuoteBtn = document.querySelector("#gen-quote-btn");

genQuoteBtn.addEventlistener('click', randomQuote);


  
  function randomQuote(){
  fetch('https://api.quotable.io/random')
   .then(response => console.log(response.json()))
   .then(data => {
     quoteText.innerHTML = data.content;
  })
}
   
   // $.getJSON('https://api.quotable.io/random', function (data) {
 // console.log(`${data.content} —${data.author}`)
   // })
 // }
  
  //  fetch('https://api.quotable.io/random')
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
      
       // quoteText.textContent = data.content;
      //  quoteTags.textContent = data.tags;
       // quoteAuthor.textContent = `-- ${data.author}`;
   //   });
//}

//randomQuote();
//genQuoteBtn.addEventlistener('click', () => {
//  randomQuote();
//});