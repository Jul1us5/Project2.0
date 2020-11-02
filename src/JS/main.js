import data from './data'
import '../CSS/main.css'
import json from '../JSON/json'
// import webpack from '../IMG/webpack.png'

const main = document.querySelector('.main')
main.insertAdjacentHTML('afterbegin', data.title);

console.log(json.title);