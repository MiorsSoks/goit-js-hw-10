export function fetchCountries(name) {
return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(responce => {
        if (!responce.ok) {
            throw Error(responce.statusText)
        }
        return responce.json();
    })
}