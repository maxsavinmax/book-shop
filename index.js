const CARD_CLASS = "card";
const CURRENCY_US = "$";

function renderPage() {
    fetch("books.json") //path to the file with json data
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            createHeader();
            createMain(data);
            console.log(data);
        });
}

function createHeader() {
    const header = document.createElement("header");
    const title = document.createElement("h1");
    const titleText = document.createTextNode("Book shop");
    const basketImg = document.createElement("img");

    header.classList.add("header");
    basketImg.classList.add("basket");

    basketImg.src = "/assets/basket_96252.svg";

    document.body.appendChild(header);
    title.appendChild(titleText);
    header.appendChild(title);
    header.appendChild(basketImg);

    return header;
}

function createMain(data) {
    const main = document.createElement("main");
    const cardContainer = document.createElement("div");

    main.classList.add("main");
    cardContainer.classList.add("container");

    document.body.appendChild(main);
    main.appendChild(cardContainer);
    data.forEach((item) => cardContainer.appendChild(createCard(item)));

    return main;
}

function createCard(item) {
    const card = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("h2");
    const price = document.createElement("p");
    const author = document.createElement("p");
    const buttonShow = document.createElement("button");
    const buttonAdd = document.createElement("button");

    card.classList.add(CARD_CLASS);
    title.classList.add("title");
    image.classList.add("book-img");
    price.classList.add("price");
    buttonShow.classList.add("button-show", "button");
    buttonAdd.classList.add("button-add", "button");

    image.src = item.imageLink;

    title.innerText = item.title;
    price.innerText = `${item.price} ${CURRENCY_US}`;
    author.innerText = item.author;
    buttonShow.innerText = "Show more";
    buttonAdd.innerText = "Add to bag";

    card.appendChild(image);
    card.appendChild(author);
    card.appendChild(title);
    card.appendChild(buttonShow);
    card.appendChild(price);
    card.appendChild(buttonAdd);

    return card;
}

renderPage();

// createMain();

// const title = document.createElement("h1");
// title.innerHTML = "Book shop";
// document.header.prepend(title);

// const model = [
//     { type: "title", value: "Books shop" },
//     { type: "columns", value: "" },
// ];
// // ["1111111", "1111111", "1111111"]
// const body = document.querySelector("body");

// model.forEach((block) => {
//     let html = "";
//     if (block.type === "title") {
//         html = title(block);
//     } else if (block.type === "columns") {
//         html = columns(block);
//     }

//     body.insertAdjacentHTML("beforeend", html);
// });

// function title(block) {
//     return `
//     <div class="header">
//         <h1>${block.value}</h1>
//         <img
//             class="basket"
//             src="/assets/basket_96252.svg"
//             alt="Svg"
//             width="24"
//         />
//     </div>

// `;
// }

// function columns(block) {
//     // let html = "";

//     return `
//     <main class="main">
//                 <div class="container">
//                     <div class="book">1</div>
//                     <div class="book">2</div>
//                     <div class="book">3</div>
//                     <div class="book">4</div>
//                     <div class="book">5</div>
//                     <div class="book">6</div>
//                     <div class="book">7</div>
//                     <div class="book">8</div>
//                     <div class="book">9</div>
//                     <div class="book">10</div>
//                 </div>
//             </main>
//     `;
// }
