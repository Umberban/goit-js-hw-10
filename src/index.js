import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const inputCountryEl = document.getElementById('search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

function countriesListMarkup(data){
    const markup = data
    .map((el=>{
        return `<li>
        <img src="${el.flags.svg}"></img>
        <p>${el.name}</p>
                </li>`
        }))
    .join("");
    countryListEl.innerHTML = markup;
    clearAll(countryInfoEl);
}


function countryInfoMarkup(data){
    const languagesArr = data[0].languages
    .map(el=>{
        return el.name
    })
    .join(",");
    const markup = 
    `<div class="flagNameContainer"><img src="${data[0].flags.svg}"></img>
    <h1>${data[0].name}</h1></div>
    <p><strong>Capital:</strong> ${data[0].capital}</p>
    <p><strong>Population:</strong> ${data[0].population}</p>
    <p><strong>Languages:</strong> ${languagesArr}</p>`
    countryInfoEl.innerHTML = markup;
    clearAll(countryListEl);
}
function clearAll(firstName,secondName){
   firstName.innerHTML=""; 
   if(secondName){
    secondName.innerHTML="";
   }
}


inputCountryEl.addEventListener('input',debounce(changeHandler, DEBOUNCE_DELAY));
function changeHandler(event){
    if(event.target.value.trim()!==""){
    fetchCountries(event.target.value.trim())
    .then(data => {
        if(data.length<2){
            countryInfoMarkup(data)
        }else if(data.length<=10){
            countriesListMarkup(data)
        }else{Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.")}
    })
    .catch(error =>{
        Notiflix.Notify.failure("Oops, there is no country with that name")
    })}else{clearAll(countryInfoEl,countryListEl)}
}