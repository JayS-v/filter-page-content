var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { cards, cardContent } from './cards.js';
const showCardClass = 'card-show';
const hiddenCardClass = 'card-hidden';
const pageContent = document.querySelector('.page-content');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu__link');
let filteredArray = [...cards];
const render = (DOMElement, array, arrayItemContent) => {
    DOMElement.innerHTML = array.map(arrayItemContent).join("");
};
const animatedAppearingStyle = () => {
    setTimeout(() => {
        const contentBlocks = document.querySelectorAll('.content-block');
        contentBlocks.forEach((contentBlock) => contentBlock.classList.add(showCardClass));
    }, 10);
};
const showInitialData = () => {
    animatedAppearingStyle();
    render(pageContent, filteredArray, cardContent);
};
//update likes number and re-render the array
const updateLikesNumber = (array) => {
    pageContent.addEventListener('click', (event) => {
        var _a;
        const clickedElement = event.target;
        const clickedContentID = (_a = clickedElement.closest('section')) === null || _a === void 0 ? void 0 : _a.id;
        const isLikeButton = clickedElement.className.includes('likes');
        if (isLikeButton && clickedContentID) {
            array.forEach(arrayItemToUpdate => {
                var _a;
                //update likes number and re-render filtered by onclick array
                if ((_a = arrayItemToUpdate.id) === null || _a === void 0 ? void 0 : _a.includes(clickedContentID)) {
                    arrayItemToUpdate.likes++;
                }
                return arrayItemToUpdate;
            });
            render(pageContent, filteredArray, cardContent);
        }
    });
};
const initializePage = () => {
    window.addEventListener('DOMContentLoaded', (event) => __awaiter(void 0, void 0, void 0, function* () {
        showInitialData();
        // Change likes number of filtered array
        updateLikesNumber(filteredArray);
    }));
};
initializePage();
menu.onclick = (event) => {
    const clickedElement = event.target;
    const clickedMenuItem = clickedElement.dataset.filter;
    if (clickedElement.tagName === 'A') {
        // Hide existing cards to animate them later
        const contentBlocks = document.querySelectorAll('.content-block');
        contentBlocks.forEach(contentBlock => contentBlock.classList.add(hiddenCardClass));
        contentBlocks.forEach(contentBlock => contentBlock.classList.remove(showCardClass));
        if (!clickedElement.classList.contains('selected') && cards.some(item => item.dataFilter === clickedMenuItem)) {
            filteredArray = cards.filter(item => item.dataFilter === clickedMenuItem);
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
        }
        menuLinks.forEach(menuLink => clickedMenuItem == menuLink.dataset.filter ? menuLink.classList.toggle('selected') : menuLink.classList.remove('selected'));
    }
};
const popUpLinks = (event, clickedMenuItem) => {
    var _a;
    const clickedCardItem = filteredArray.find(item => item.dataFilter == clickedMenuItem);
    let popUp;
    if (document.querySelector('dialog')) {
        (_a = document.querySelector('dialog')) === null || _a === void 0 ? void 0 : _a.remove();
    }
    popUp = document.createElement('dialog');
    const popUpLink = `<a href="${clickedCardItem === null || clickedCardItem === void 0 ? void 0 : clickedCardItem.link}" target="_blank">Open ${clickedCardItem === null || clickedCardItem === void 0 ? void 0 : clickedCardItem.link}</a>`;
    popUp.insertAdjacentHTML('beforeend', popUpLink);
    if (event.target instanceof HTMLElement) {
        event.target.appendChild(popUp);
    }
    if (popUp) {
        popUp.show();
    }
    //to close the popUp on click outside
    window.addEventListener('click', (event) => {
        if (!event.target.classList.contains('menu__link') || !event.target.classList.contains('selected')) {
            if (popUp) {
                popUp.close();
            }
        }
    });
};
//# sourceMappingURL=main.js.map