import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


let countryItem = [{
    name: "",
  flags: {
  "svg": "https://flagcdn.com/per.svg",
  
},
    capital: "",
    population: "",
    languages: "",    
}]

input.addEventListener('input', onSearch);

function onSearch(event) {
   
    event.preventDefault();
      const {
    elements: {name, flags, capital, population, languages },
  } = event.currentTarget;
  
    let search = name.value;
    fetchCountries.fetchCountries(search).then(renderCountry).catch(onFetchError);
}

function renderCountry(countryItem) {

    return countryItem.map(({ name, flags: { svg }, capital, population, languages }) => {
        return `<img src=${svg} alt="flag" width="60"></img>
     <h2 class="country-info__name">${name}</h2>
     <p class="country-info__desc">Capital:<span class="country-info__value">${capital}</span></p>
     <p class="country-info__desc">Population:<span class="country-info__value">${population}</span></p> 
     <p class="country-info__desc">Languages:<span class="country-info__value">${Object.values(languages)}</span></p>  
    `;
    }).join('');


}
    const createCountryItem = renderCountry(countryItem);
countryList.insertAdjacentHTML('afterbegin', createCountryItem);

function onFetchError() {
    Notiflix.failure("Too many matches found. Please enter a more specific name.");
}