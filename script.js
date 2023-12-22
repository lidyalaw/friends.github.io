/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
const projectName = 'random-quote-machine';
let quotesData;
let i=0;

var currentQuote  = '',
    currentAuthor = '',
    currentColor  = '';

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/lidyalaw/6ff2e5fcbacaafebfced5c30445eb43b/raw/6b2bc05d8432215ddd873752244713631b3cb4a7/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote(i) {
  return quotesData.quotes[i];
}

function getQuote() {
  let randomQuote = getRandomQuote(i);
  i++;
  if(i==quotesData.quotes.length){
      i=0;
  }

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;
  currentColor = randomQuote.color;

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

  $('html body').animate(
    {
      backgroundColor: currentColor,
      color: currentColor
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: currentColor
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote());
});
