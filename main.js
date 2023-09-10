import {cards, cardContent} from './cards.js';

const pageContent = document.querySelector('.page-content');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu__link');

const render = (DOMElement, array, arrayItemContent) => DOMElement.innerHTML = array.map(arrayItemContent).join("");

const showInitialData = () => render(pageContent, cards, cardContent);

window.addEventListener('DOMContentLoaded', async (event) => showInitialData());

menu.onclick = event => {
    const clickedMenuItem = event.target.dataset.filter;  

    if (event.target.tagName == 'A') {
        if (!event.target.classList.contains('selected') && cards.some(card => card.dataFilter === clickedMenuItem)){
            const newArray = cards.filter(card => card.dataFilter === clickedMenuItem);
            render(pageContent, newArray, cardContent);
        } else if (event.target.classList.contains('selected')) {
           showInitialData();
        }        
        else {
            console.log(`error ! card ${clickedMenuItem} doesn't exist`);
        };

        menuLinks.forEach(menuLink => clickedMenuItem == menuLink.dataset.filter ? menuLink.classList.toggle('selected') : menuLink.classList.remove('selected'));
    } 
};