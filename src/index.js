import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;


const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onLookingForCountry, DEBOUNCE_DELAY));

function onLookingForCountry(e) {

  let inputValue = '';
  inputValue = e.target.value.trim();

  countryInfo.innerHTML = '';
  countryList.innerHTML = '';

  
  if (inputValue.length === 0) return;

  fetchCountries(inputValue)
    .then(countri => markupSelectionCountries(countri))
    .catch(onFetchError);
}

function markupSelectionCountries(data) {
  console.log(data);
  if (data.length === 1) {
    createMarkupCountriInfo(data);
  } else if (data.length > 1 && data.length <= 10) {
    createMarkupCountries(data);
  } else {
    onFetchInfo();
  }
}

function onFetchInfo() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}


function createMarkupCountriInfo(arr) {
    const markup = arr
        .map(({ name, flags, capital, population, languages }) => {
      
            return `<li class="list-js">
      <h2 class="title-js">Name: ${name.official}</h2>
    <img src="${flags.svg}" alt="${flags.alt}" width="70" heigth="50">
    <p>
     <span class="style-js">Capital:
     </span> ${capital}
    </p>
    <p>
     <span class="style-js">Population:
     </span> ${population}
    </p>
    <p>
     <span class="style-js">Languages:
     </span> ${Object.values(languages).join('', '')}
     </p>
    </li>`;
        }).join('');

  countryInfo.innerHTML = markup;
}

function createMarkupCountries(arr) {
  const markup = arr
    .map(({ name, flags }) => {
   
      return `<li>
      <h2>Name: ${name.official}</h2>
    <img src="${flags.svg}" alt="${flags.alt}" width="70" heigth="50">
    </li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}