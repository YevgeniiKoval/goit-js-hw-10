const URL = `https://restcountries.com/v3.1/name/`;
const options = `name,capital,population,flags,languages`;


export function fetchCountries(name) {
    return fetch(`${URL}/${name}?fields=${options}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Oops, there is no country with that name');
            }
            return res.json();
            
        });
}