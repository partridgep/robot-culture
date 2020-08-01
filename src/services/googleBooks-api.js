require('dotenv').config();

const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export function getBookMatches(input) {
    console.log(input);
    const url = `${baseUrl}${input}&key=${apiKey}`;
    return fetch(url, {mode: 'cors'}).then(res => res.json());
}