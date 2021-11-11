import '../css/styles.css';

import countryCard from '../tamplates/country-card.hbs';
import fetchCountries from './fetch-countries-api';

import * as _ from 'lodash';

import * as PNotify from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  countryContainer: document.querySelector('.country__data'),
  searchForm: document.querySelector('.input__control'),
};

const myStack = new PNotify.Stack({
  dir1: 'up',
});

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  // console.log(form.elements);
  const searchQuery = form.elements.query.value.trim();

  if (!searchQuery) {
    alert('введите данные для запроса');
    return;
  }

  console.log('searchQuery', searchQuery);

  fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderCountryCard(country) {
  console.log('данные из бекенда', country);
  const markup = countryCard(country);

  // console.log(markup);
  refs.countryContainer.innerHTML = markup;
}

function onFetchError(error) {
  const form = e.currentTarget;
  // console.log(form.elements);
  const searchQuery = form.elements.query.value;
  if (searchQuery > 0) {
    console.log('errrr');
  }
}

// function onSearch(e) {
//   e.preventDefault();

//   const form = e.currentTarget;
//   // console.log(form.elements);
//   const searchQuery = form.elements.query.value;

//   fetchCountries(searchQuery)
//     .then(data => {
//       refs.countryContainer.innerHTML = '';
//       myStack.close(true);

//       if (data.legth === 1) {
//         refs.countryContainer.insertAdjacentElement('beforeend', renderCountryCard);
//       } else if (data.length < 11) {
//         data.forEach(country => console.log(country.name));
//       } else if (data.length > 10) {
//         PNotify.notice({
//           text: 'many letters. enter less',
//           stack: myStack,
//           modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
//         });
//       }
//     })
//     .catch(
//       PNotify.notice({
//         title: 'ERROR!',
//         text: 'the country was not found. try again',
//         stack: myStack,
//         modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
//       }),
//     );
// }
