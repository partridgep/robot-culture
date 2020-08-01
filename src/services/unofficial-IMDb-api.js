require('dotenv').config();

const baseUrl = "https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/";
const apiKey = process.env.REACT_APP_UN_IMDB_API_KEY;

export function getActorMatches(input) {
    return fetch(`${baseUrl}${input}`, {
        mode: "cors",
        method: "GET",
        headers: {
            "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
            "x-rapidapi-key": `${apiKey}`
        }
    }).then(res => res.json());
}
