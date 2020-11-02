import data from './data'
import '../CSS/main.css'
import json from '../JSON/json'

const main = document.querySelector('.main')
main.insertAdjacentHTML('afterbegin', data.title);

console.log(json.title);