/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
const projectName = 'random-quote-machine';
let quotesData;
i=0;
/*
  Code by Gabriel Nunes
  Modified by Todd Chaffee to use Camper gist for JSON Quote data.
*/

var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857',
  '#e1c4ff'
];
var currentQuote = '',
  currentAuthor = '';

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
  return quotesData.quotes[
    Math.floor(i)
  ];
}

function getQuote(i) {
  let randomQuote = getRandomQuote(i);

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

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
      backgroundColor: colors[i],
      color: colors[i]
    },
    1000
  );
  $('.button').animate(
    {
      backgroundColor: colors[i]
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote(i);
  });

  $('#new-quote').on('click', getQuote(i++));
});
