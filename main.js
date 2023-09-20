import {cards, cardContent} from './cards.js';

const pageContent = document.querySelector('.page-content');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu__link');

let filteredArray = [...cards];

// const render = (DOMElement, array, arrayItemContent) => DOMElement.innerHTML = array.map(arrayItemContent).join("");


const render = (DOMElement, array, arrayItemContent) => {
    DOMElement.innerHTML = array.map(arrayItemContent).join("");
}

const animatedAppearingStyle = () => {
    setTimeout(() => {
        const contentBlocks  = document.querySelectorAll('.content-block');
        contentBlocks.forEach(contentBlock => contentBlock.classList.add('card-show'));
    },10);
}

const showInitialData = () => {
    animatedAppearingStyle();
    render(pageContent, filteredArray, cardContent);
}


window.addEventListener('DOMContentLoaded', async (event) => {
    showInitialData();
    likesHandler(filteredArray);
});


const likesHandler = (array) => {
    pageContent.addEventListener('click', function (event) {
        if (event.target.className === 'likes') {
            const clickedCardID = event.target.closest('section').id;
    
            let newLikeNumber = Number(event.target.innerHTML) + 1;
    
            array.map(card => {            
                if (card.id === clickedCardID) {
                    card.likes = newLikeNumber;
                }
                return card;
            });

            render(pageContent, filteredArray, cardContent);
        } 
    });
}

menu.onclick = event => {
    const clickedMenuItem = event.target.dataset.filter;  

    if (event.target.tagName == 'A') {
        // Hide existing cards to animate them later
        const contentBlocks  = document.querySelectorAll('.content-block');
        contentBlocks.forEach(contentBlock => contentBlock.classList.add('card-hidden'));
        contentBlocks.forEach(contentBlock => contentBlock.classList.remove('card-show'));

        if (!event.target.classList.contains('selected') && cards.some(card => card.dataFilter === clickedMenuItem)){
            filteredArray = cards.filter(card => card.dataFilter === clickedMenuItem);

            // Render new cards after a delay to allow the fade-out effect to happen
            setTimeout(() => {
                animatedAppearingStyle();
                render(pageContent, filteredArray, cardContent);
                pageContent.style.display = 'flex';
            }, 300);
            popUpLinks(event, clickedMenuItem);
        }   
        else {
            filteredArray = [...cards];
            
            // Render new cards after a delay to allow the fade-out effect to happen
            setTimeout(() => {
                animatedAppearingStyle();
                showInitialData();
                pageContent.style.display = 'grid';
            }, 300);
        };

        menuLinks.forEach(menuLink => clickedMenuItem == menuLink.dataset.filter ? menuLink.classList.toggle('selected') : menuLink.classList.remove('selected'));
    } 
};

const popUpLinks = (event, clickedMenuItem) => {
    const clickedCardItem = cards.find(card => card.dataFilter == clickedMenuItem);
    let popUp;

    if (document.querySelector('dialog')){
        document.querySelector('dialog').remove();
    }

    popUp = document.createElement('dialog');
    const popUpLink = `<a href="${clickedCardItem.link}" target="_blank">Open ${clickedCardItem.link}</a>`
    popUp.insertAdjacentHTML('beforeend', popUpLink);
    event.target.appendChild(popUp);
    popUp.show();


    //to close the popUp on click outside
    window.addEventListener('click', (event) => {
        if (popUp && !event.target.classList.contains('menu__link') || !event.target.classList.contains('selected')){
            popUp.close();
            console.log(event.target.tagName);
        } 
    });
}









