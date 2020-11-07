import data from '@/data'
import '../CSS/main.css'
import '../CSS/color.scss'
import json from '../JSON/json'
import './babel'

const main = document.querySelector('.main')
main.insertAdjacentHTML('afterbegin', data.title);