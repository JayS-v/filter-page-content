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
            createPopUp(event, clickedMenuItem);
        } else if (event.target.classList.contains('selected')) {
           showInitialData();
        }        
        else {
            console.log(`card is ${clickedMenuItem}`);
        };

        menuLinks.forEach(menuLink => clickedMenuItem == menuLink.dataset.filter ? menuLink.classList.toggle('selected') : menuLink.classList.remove('selected'));
    } 
};

const createPopUp = (event, clickedMenuItem) => {
    const clickedCardITem = cards.find(card => card.dataFilter == clickedMenuItem);
    let popUp;

    if (document.querySelector('dialog')){
        document.querySelector('dialog').remove();
    }

    popUp = document.createElement('dialog');
    const popUpLink = `Open <a href="${clickedCardITem.link}" target="_blank">${clickedCardITem.link}</a>`
    popUp.insertAdjacentHTML('beforeend', popUpLink);
    event.target.appendChild(popUp);
    popUp.show();

    //to close the popUp on click outside
    window.addEventListener('click', (event) => {
        if (popUp && !popUp.classList.contains(event.target.className) && !event.target.classList.contains('menu__link') || !event.target.classList.contains('selected')){
            popUp.close();
        }
    });
}