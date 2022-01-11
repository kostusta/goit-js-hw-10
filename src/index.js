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

function countryCardMarkupGenerate(data) {
  return countyCardTemplate(data[0]);
}

function countriesListMarkupGenerate(data) {
  return data.map(item => countiesListTemplate(item)).join('');
}

function countryCardMarkupRender(markup) {
  refs.countryInfo.insertAdjacentHTML('beforeend', `${markup}`);
}

function countriesListMarkupRender(markup) {
  refs.countryList.insertAdjacentHTML('beforeend', `${markup}`);
}

function clearContent() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function responseHandler(data) {
  if (data.status === 404) {
    clearContent()
    Notify.failure('Oops, there is no country with that name');
  }

  if (data.length >= 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (data.length >= 2 && data.length <= 10) {
    clearContent();
    const countryListMarkup = countriesListMarkupGenerate(data);
    countriesListMarkupRender(countryListMarkup);
  }

  if (data.length === 1) {
    clearContent();
    const countryCardMarkup = countryCardMarkupGenerate(data);
    countryCardMarkupRender(countryCardMarkup);
  }
}

function inputHandler() {
  let countryQueryNmae = refs.input.value.trim();

  if (!countryQueryNmae) {
    clearContent();
    return;
  }

  fetchCountries(countryQueryNmae).then(data => responseHandler(data));
}

refs.input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
