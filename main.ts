import {ICards, cards, cardContent} from './cards.js'

type CSSClassType = 'card-show'|'card-hidden'

const showCardClass: CSSClassType = 'card-show'
const hiddenCardClass: CSSClassType = 'card-hidden'
const pageContent = document.querySelector<HTMLElement>('.page-content')!
const menu = document.querySelector<HTMLElement>('.menu')!
const menuLinks: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.menu__link')

let filteredArray: ICards[] = [...cards]

const render = (DOMElement: HTMLElement, array: any[], arrayItemContent: (item: ICards) => string): void => {
    DOMElement.innerHTML = array.map(arrayItemContent).join("")
};

const animatedAppearingStyle = (): void => {
    setTimeout(() => {
        const contentBlocks: NodeListOf<HTMLElement> = document.querySelectorAll('.content-block')
        contentBlocks.forEach((contentBlock: HTMLElement) => contentBlock.classList.add(showCardClass))
    }, 10);
};

const showInitialData = (): void => {
    animatedAppearingStyle()
    render(pageContent, filteredArray, cardContent)
};

//update likes number and re-render the array
const updateLikesNumber = (array: ICards[]): void => {
    pageContent.addEventListener('click', (event: MouseEvent) => {
        
        const clickedElement = event.target as HTMLElement
        const clickedContentID = clickedElement.closest('section')?.id 
        const isLikeButton = clickedElement.className.includes('likes')

        if (isLikeButton && clickedContentID) {

            array.forEach(
                arrayItemToUpdate => {

                    //update likes number and re-render filtered by onclick array
                    if (arrayItemToUpdate.id?.includes(clickedContentID)) {
                        arrayItemToUpdate.likes++
                    }

                    return arrayItemToUpdate
                }
            )

            render(pageContent, filteredArray, cardContent)
        } 
    });
}

const initializePage = (): void => {
    window.addEventListener('DOMContentLoaded', async (event) => {
        showInitialData()

        // Change likes number of filtered array
        updateLikesNumber(filteredArray)
    })
}

initializePage()


menu.onclick = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement
    const clickedMenuItem = clickedElement.dataset.filter

    if (clickedElement.tagName === 'A') {
        // Hide existing cards to animate them later
        const contentBlocks: NodeListOf<HTMLElement>  = document.querySelectorAll('.content-block')
        contentBlocks.forEach(contentBlock => contentBlock.classList.add(hiddenCardClass))
        contentBlocks.forEach(contentBlock => contentBlock.classList.remove(showCardClass))

        if (!clickedElement.classList.contains('selected') && cards.some(item => item.dataFilter === clickedMenuItem)){
            filteredArray = cards.filter(item => item.dataFilter === clickedMenuItem)

            // Render new cards after a delay to allow the fade-out effect to happen
            setTimeout(() => {
                animatedAppearingStyle();
                render(pageContent, filteredArray, cardContent)
                pageContent.style.display = 'flex'
            }, 300);
            popUpLinks(event, clickedMenuItem)
        }   
        else {
            filteredArray = [...cards]
            
            // Render new cards after a delay to allow the fade-out effect to happen
            setTimeout(() => {
                animatedAppearingStyle()
                showInitialData()
                pageContent.style.display = 'grid'
            }, 300)
        }

        menuLinks.forEach(menuLink => clickedMenuItem == menuLink.dataset.filter ? menuLink.classList.toggle('selected') : menuLink.classList.remove('selected'))
    } 
};

const popUpLinks = (event: MouseEvent, clickedMenuItem?: string) => {
    const clickedCardItem = filteredArray.find(item => item.dataFilter == clickedMenuItem)
    let popUp: HTMLDialogElement | null

    if (document.querySelector('dialog')){
        document.querySelector('dialog')?.remove()
    }

    popUp = document.createElement('dialog');
    const popUpLink = `<a href="${clickedCardItem?.link}" target="_blank">Open ${clickedCardItem?.link}</a>`
    popUp.insertAdjacentHTML('beforeend', popUpLink)

    if (event.target instanceof HTMLElement) {
        event.target.appendChild(popUp);
    }
    
    if (popUp) {
        popUp.show();
    }
    
    //to close the popUp on click outside
    window.addEventListener('click', (event) => {
        if (!(event.target as HTMLElement).classList.contains('menu__link') || !(event.target as HTMLElement).classList.contains('selected')){
            if (popUp) {
                popUp.close()
            }
        } 
    });
}
