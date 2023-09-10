const cardsInitial = [
    {
        dataFilter: 'red',
        imageSource: 'images/red0.png',
    },
    {
        dataFilter: 'pet',
        imageSource: 'images/pet0.png',
    },
    {
        dataFilter: 'pet',
        imageSource: 'images/pet1.png',
    },
    {
        dataFilter: 'kit',
        imageSource: 'images/kit0.png',
    },
    {
        dataFilter: 'arctic',
        imageSource: 'images/arctic0.png',
    },
    {
        dataFilter: 'fennec',
        imageSource: 'images/fennec0.png',
    },
    {
        dataFilter: 'kit',
        imageSource: 'images/kit1.png',
    },
    {
        dataFilter: 'red',
        imageSource: 'images/red1.png',
    },
]

//add ID's 
export const cards = cardsInitial.map((item, index) => ({ ...item, id: index + 1 }))

export const cardContent = (arrayItem) => {
    return `
    <section class="content-block data-filter="${arrayItem.dataFilter}">
        <div class="content-block__body">
            <h2 class="content-block__title">${arrayItem.dataFilter.charAt(0).toUpperCase() + arrayItem.dataFilter.slice(1)} smile fox</h2>
            <span class="likes"></span>
            <p class="content-block__text">Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere.
            </p>
        </div>
        <figure class="content-block__image content-block1__image">
            <img width="100%"src="${arrayItem.imageSource}" alt="red smile fox">
        </figure>
    </section>
    `
}