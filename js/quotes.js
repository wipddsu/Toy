const quotes = [
  {
    quote:
      'When you believe in a thing, believe in it all the way, implicitly and unquestionable.',
    author: 'Walt Disney',
  },
  {
    quote: 'The purpose of our lives is to be happy.',
    author: 'Dalai Lama',
  },
  {
    quote: 'Do not try to be original, just try to be good.',
    author: 'Paul Rand',
  },
  {
    quote: 'When you are actually powerful, you don’t need to be petty.',
    author: 'Jon Stewart',
  },
  {
    quote:
      'Life is like playing a violin in public and learning the instrument as one goes on.',
    author: 'Samuel Butler',
  },
  {
    quote: 'Loving others brings love back to you.',
    author: 'Catherine Pulsifer',
  },
  {
    quote:
      'What we have once enjoyed we can never lose. All that we love deeply becomes a part of us.',
    author: 'Helen Keller',
  },
  {
    quote: 'We must be our own before we can be another’s.',
    author: 'Ralph Waldo Emerson',
  },
  {
    quote:
      'Many of life’s failures are people who did not realize how close they were to success when they gave up.',
    author: 'Thomas A. Edison',
  },
  {
    quote:
      'Life is like riding a bicycle. To keep your balance, you must keep moving.',
    author: 'Albert Einstein',
  },
];

const quote = document.querySelector('#quote span:first-child');
const author = document.querySelector('#quote span:last-child');

const todaysQuotes = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuotes.quote;
author.innerText = todaysQuotes.author;
