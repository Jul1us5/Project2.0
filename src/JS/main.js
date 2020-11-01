import data from './data'
import '../CSS/main.css'

const main = document.querySelector('.main')
main.insertAdjacentHTML('afterbegin', data.title);