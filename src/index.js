import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchbox = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')

searchbox.addEventListener('input', debounce(e => {
    e.preventDefault();
    const name = searchbox.value.trim();
    if (name.length < 1) { return countryList.innerHTML = "" }
    fetchCountries(name)
        .then(countries => { 
        console.log(countries);
        countryList.innerHTML = ""
            if (Object.keys(countries).length === 1) {countryList.insertAdjacentHTML("beforeend", createCoutryInformationMarkup(countries));}
            else if (Object.keys(countries).length > 10) {alertManyMatchesFound(countryList)}
            else {countryList.insertAdjacentHTML("beforeend", createCountriesListMarkup(countries));}
    })
        .catch(error => {
        alertNotFound(countryList)
        console.log(error)
    })
    
}, DEBOUNCE_DELAY)
)

function alertNotFound(list) {
        list.innerHTML = ""
     return Notiflix.Notify.failure("Oops, there is no country with that name");
}

function alertManyMatchesFound(list) {
    list.innerHTML = ""
     return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

}


function createCountriesListMarkup(countries) {
     const countriesList =  countries
        .map(({ name, flags }) => {
            return `
            <li class="country-list__item">
                <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px heigth = 30px>
                <p class="country-list__name">${name.official}</p>
            </li>            
            `;
        })
         .join('');

    return countriesList    
}

function createCoutryInformationMarkup(countries) {
    const infoCountry = countries
        .map(({ name, flags, capital, population, languages }) => {
         return   `   <div class="country-list__item">
                <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px heigth = 30px>
                <h1 class="country-list__name">${name.official}</h1>
                </div> 
                <ul class="country__list">
                <li class="country__item"><p><b>Capital: </b>${capital}</p></li>
                <li class="country__item"><p><b>Population: </b>${population}</p></li>
                <li class="country__item"><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
                </ul>`;
        })
        .join('');
    return infoCountry
}