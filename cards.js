const cardsInitial = [
    {
        dataFilter: 'red',
        imageSource: 'images/red0.png',
        link: 'https://en.wikipedia.org/wiki/Red_fox',
        likes: 2547,
    },
    {
        dataFilter: 'pet',
        imageSource: 'images/pet0.png',
        link: 'https://en.wikipedia.org/wiki/Domesticated_silver_fox',
        likes: 9764,
    },
    {
        dataFilter: 'pet',
        imageSource: 'images/pet1.png',
        link: 'https://en.wikipedia.org/wiki/Domesticated_silver_fox',
        likes: 1000,
    },
    {
        dataFilter: 'kit',
        imageSource: 'images/kit0.png',
        link: 'https://en.wikipedia.org/wiki/Kit_fox',
        likes: 1287,
    },
    {
        dataFilter: 'arctic',
        imageSource: 'images/arctic0.png',
        link: 'https://en.wikipedia.org/wiki/Arctic_fox',
        likes: 4659,
    },
    {
        dataFilter: 'fennec',
        imageSource: 'images/fennec0.png',
        link: 'https://en.wikipedia.org/wiki/Fennec_fox',
        likes: 9897,
    },
    {
        dataFilter: 'kit',
        imageSource: 'images/kit1.png',
        link: 'https://en.wikipedia.org/wiki/Kit_fox',
        likes: 37,
    },
    {
        dataFilter: 'red',
        imageSource: 'images/red1.png',
        link: 'https://en.wikipedia.org/wiki/Red_fox',
        likes: 1100,
    },
]

//add ID's 
export const cards = cardsInitial.map((item, index) => ({ ...item, id: 'fox' + Number(index + 1)}))

export const cardContent = (arrayItem) => {
    return `
    <section class="content-block" id="${arrayItem.id}" data-filter="${arrayItem.dataFilter}">
        <div class="content-block__body">
            <h2 class="content-block__title">${arrayItem.dataFilter.charAt(0).toUpperCase() + arrayItem.dataFilter.slice(1)} smile fox</h2>
            <span class="likes">${arrayItem.likes}</span>
            <p class="content-block__text">Lorem ipsum dolor sit amet, eu mei posse possim atomorum, vix cu fabellas assueverit. Vel ad option partiendo maiestatis, nec affert appetere.
            </p>
        </div>
        <figure class="content-block__image content-block1__image">
            <img width="100%"src="${arrayItem.imageSource}" alt="red smile fox">
        </figure>
    </section>
    `
}

