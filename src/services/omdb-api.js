require('dotenv').config();

const baseUrl = "https://www.omdbapi.com/";
const apiKey = process.env.REACT_APP_OMDB_API_KEY;

export function getMovieMatches(input) {
    const url = `${baseUrl}?apiKey=${apiKey}&s=${input}&type=movie`;
    return fetch(url, {mode: 'cors'}).then(res => res.json());
}

export function getTvShowMatches(input) {
    const url = `${baseUrl}?apiKey=${apiKey}&s=${input}&type=series`;
    return fetch(url, {mode: 'cors'}).then(res => res.json());
}

export function getGameMatches(input) {
    const url = `${baseUrl}?apiKey=${apiKey}&s=${input}&type=game`;
    return fetch(url, {mode: 'cors'}).then(res => res.json());
}