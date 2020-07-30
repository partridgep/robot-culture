const baseUrl = "https://www.omdbapi.com/";
const apiKey = "e19d524f";

export function getMovieMatches(input) {
    const url = `${baseUrl}?apiKey=${apiKey}&s=${input}&type=movie`;
    return fetch(url, {mode: 'cors'}).then(res => res.json());
}