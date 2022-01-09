const DEFAULE_URL = 'https://restcountries.com/v2/name/';
const QUERY_PARAMS = 'fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${DEFAULE_URL}${name}?${QUERY_PARAMS}`).then(response => {
    return response.json();
  });
}
