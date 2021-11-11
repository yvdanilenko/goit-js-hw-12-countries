export default function fetchCountries(countryName) {
  const url = `https://restcountries.com/v2/name/${countryName}`;
  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log('data', data);
      if (data.status === 404) {
        throw new Error(data.message);
      } else {
        return data;
      }
    })
    .catch(error => {
      refs.countryContainer.innerHTML = '';
      console.log('error из catch в функции отдельной fetch', error);
      alert(error); //вызвать функцию библиотеки Pnotify
    });
}
