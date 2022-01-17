import '../css/styles.css';

import countryCard from '../tamplates/country-card.hbs';
import fetchCountries from './fetch-countries-api';

import debounce from 'lodash.debounce';

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

// refs.searchForm.addEventListener('submit', onSearch);

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  // console.log(form.elements);
  const searchQuery = form.elements.query.value.trim();
  refs.countryContainer.innerHTML = '';
  myStack.close(true);

  if (!searchQuery) {
    // alert('введите данные для запроса');

    PNotify.notice({
      text: 'введите данные для запроса',
      stack: myStack,
      modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
    });

    return;
  } else if (searchQuery.length > 11) {
    // alert('Превышено количество допустимых символов');
    PNotify.notice({
      text: 'Превышено количество допустимых символов',
      stack: myStack,
      modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
    });

    return;
  }

  // console.log('searchQuery', searchQuery);

  fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderCountryCard(country) {
  console.log('данные из бекенда', country);
  console.log('country.name', country);
  const markup = countryCard(country);
  // console.log(markup);

  refs.countryContainer.innerHTML = markup;
}

function onFetchError(error) {
  //   alert('Введите корректное название страны');
  PNotify.notice({
    text: 'Введите корректное название страны',
    stack: myStack,
    modules: new Map([...PNotify.defaultModules, [PNotifyMobile, {}]]),
  });
}

window.onload = function () {
  let loader = document.getElementById('loader');

  loader.style.display = 'none';
};
