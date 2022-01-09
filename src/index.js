import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import countyCardTemplate from './templates/country-card.hbs';
import countiesListTemplate from './templates/countries-list.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.2.min.css';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

console.dir(refs.input.value);

refs.input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function inputHandler() {
  let countryQueryNmae = refs.input.value.trim();
  // console.log(countryQueryNmae);

  if (!countryQueryNmae) {
    // console.log('empty')
    return;
  }

  fetchCountries(countryQueryNmae)
    .then(responce => responseLengthHandler(responce))
    .then(markup => {
      refs.countryList.innerHTML = `${markup}`;
    });
}

// fetchCountries(countryQueryNmae)
//     .then(data => countryCardMarkup(data[0]))
//     .then(markup => {
//       refs.countryList.innerHTML = `${markup}`;
//     })

// function makeCountryMarkup(county) {
//   return `<img class="country-flag" src=${county.flags}>
//   <p class="country-name">${county.name}</p>
//   <p class="coutry-capital">${county.capital}</p>
//   <p class="country-population">${county.population}</p>
//   <p class="country-langugage">${county.langugage}</p>`;
// }

// const country = [
//   {
//     capital: 'Kyiv',
//     // flags: { svg: 'https://flagcdn.com/ua.svg', png: 'https://flagcdn.com/w320/ua.png' },
//     // languages: [{ iso639_1: 'uk', iso639_2: 'ukr', name: 'Ukrainian', nativeName: 'Українська' }],
//     name: 'Ukraine',
//     population: 44134693,
//   },
// ];

function countryCardMarkup(data) {
  return countyCardTemplate(data[0]);
}

function countriesListMarkup(data) {
  return data.map(item => countiesListTemplate(item)).join('');
}

function responseLengthHandler(responce) {
  if (responce.length === 1) {
    console.log(responce.length);
    return countryCardMarkup(responce);
  }

  if (responce.length >= 10) {
    console.log(responce.length);
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (responce.length >= 2 && responce.length <= 10) {
    console.log(responce.length);
    return countriesListMarkup(responce);
  }
}

// queryMarkup(country);
