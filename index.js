"use strict";

const CARD_CLASS = "card";
const CURRENCY_US = "$";

function renderPage() {
    fetch("books.json") //path to the file with json data
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            createHeader(data);
            createMain(data);
            return data;
        })
        .then((data) => {
            addToCart(data);
            popUp(data);
            visibleCart();
        });
}

function createHeader(data) {
    const fragment = new DocumentFragment();
    const header = document.createElement("header");
    const title = document.createElement("h1");
    const titleText = document.createTextNode("Book shop");
    fragment.append(header);

    header.classList.add("header");

    document.body.appendChild(header);

    title.appendChild(titleText);
    header.appendChild(title);

    function createCart() {
        const cartContainer = document.createElement("div");
        const cart = document.createElement("div");
        const cartContent = document.createElement("div");
        const cartQuantity = document.createElement("span");
        const contentList = document.createElement("ul");
        const cardBottom = document.createElement("div");
        const contentfullPrice = document.createElement("div");
        const fullPrice = document.createElement("span");
        const cartContentBtn = document.createElement("button");
        const basketImg = document.createElement("img");

        const a = document.createElement("a");

        cartContainer.classList.add("cart-container", "cart-zone");
        cart.classList.add("header__cart", "cart");
        cartContent.classList.add("cart-content");
        basketImg.classList.add("basket");
        cartQuantity.classList.add("cart__quantity");
        contentList.classList.add("cart-content__list");
        cardBottom.classList.add("cart-content__bottom");
        contentfullPrice.classList.add("cart-content_fullprice");
        fullPrice.classList.add("fullprice");
        cartContentBtn.classList.add("cart-content__btn", "button");

        cartContainer.setAttribute("ondrop", "return drop(event)");

        header.appendChild(cartContainer);
        cartContainer.appendChild(basketImg);
        cartContainer.appendChild(cart);
        cart.appendChild(cartQuantity);
        cart.appendChild(cartContent);
        cartContent.appendChild(contentList);
        cartContent.appendChild(cardBottom);
        cardBottom.appendChild(contentfullPrice);
        cardBottom.appendChild(cartContentBtn);
        contentfullPrice.appendChild(fullPrice);

        basketImg.src = "/assets/basket_96252.svg";

        cartQuantity.innerText = "0";
        cartContentBtn.innerText = "Confirm order";
    }
    createCart();

    return fragment;
}

function createMain(data) {
    const fragment = new DocumentFragment();
    const main = document.createElement("main");
    const cardContainer = document.createElement("div");
    fragment.append(main);

    main.classList.add("main");
    cardContainer.classList.add("container");

    document.body.appendChild(main);
    main.appendChild(cardContainer);
    data.forEach((item) => cardContainer.appendChild(createCard(item)));

    return fragment;
}

function createCard(item) {
    const card = document.createElement("div");
    const image = document.createElement("img");
    const cardTitle = document.createElement("h2");
    const price = document.createElement("p");
    const author = document.createElement("p");
    const buttonShow = document.createElement("button");
    const buttonAdd = document.createElement("button");

    card.classList.add(CARD_CLASS);
    cardTitle.classList.add("title");
    image.classList.add("book-img");
    price.classList.add("price");
    buttonShow.classList.add("button-show", "button");
    buttonAdd.classList.add("button-add", "button");
    card.setAttribute("id", item.id);

    image.src = item.imageLink;
    cardTitle.innerText = item.title;
    price.innerText = `${item.price} ${CURRENCY_US}`;
    author.innerText = item.author;

    buttonShow.innerText = "Show more";
    buttonAdd.innerText = "Add to bag";

    card.appendChild(image);
    card.appendChild(author);
    card.appendChild(cardTitle);
    card.appendChild(buttonShow);
    card.appendChild(price);
    card.appendChild(buttonAdd);

    return card;
}

function addToCart(data) {
    const productsBtn = document.querySelectorAll(".button-add");
    const cartProductsList = document.querySelector(".cart-content__list");
    const cart = document.querySelector(".cart");
    const cartQuantity = document.querySelector(".cart__quantity");
    const fullPrice = document.querySelector(".fullprice");
    const cartZone = document.querySelector(".cart-zone");
    const card = document.querySelectorAll(".card");

    let price = 0;

    function randomId() {
        return (
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        );
    }

    function plusFullPrice(currentPrice) {
        return (price += currentPrice);
    }

    function minusFullPrice(currentPrice) {
        return (price -= currentPrice);
    }

    function printFullPrice() {
        fullPrice.textContent = `Total: ${price} ${CURRENCY_US} `;
    }

    function printQuantity() {
        let length = cartProductsList.children.length;
        cartQuantity.textContent = length;
        length > 0
            ? cart.classList.add("active")
            : cart.classList.remove("active");
    }

    function generateCartProduct(title, price, id) {
        return `
        <li class="cart-content__item">
            <article class="cart-content__product cart-product" data-id='${id}'>
                <div class="cart-product-text">
                    <h3 class="cart-product__title">${title}</h3>
                    <span class="cart-product__price">${price} ${CURRENCY_US} </span>
                </div>
                <button class="cart-product__delete"></button>
            </article>
        </li>
        `;
    }

    function deleteProducts(productParent) {
        let id = productParent.querySelector(".cart-product").dataset.id;
        console.log(id);
        document.querySelector(`.card[data-id="${id}"]`);
        // .querySelector(".button-add").disabled = false;

        let currentPrice = parseInt(
            productParent.querySelector(".cart-product__price").textContent
        );
        minusFullPrice(currentPrice);
        printFullPrice();
        productParent.remove();
        printQuantity();
    }

    productsBtn.forEach((el) => {
        el.closest(".card").setAttribute("data-id", randomId());
        el.closest(".card").setAttribute("draggable", "true");
        el.addEventListener("click", (e) => {
            let self = e.currentTarget;
            let parent = self.closest(".card");
            let id = parent.dataset.id;
            let title = parent.querySelector(".title").textContent;

            let priceNumber = parseInt(
                parent.querySelector(".price").textContent
            );

            plusFullPrice(priceNumber);
            printFullPrice();
            cartProductsList.insertAdjacentHTML(
                "afterbegin",
                generateCartProduct(title, priceNumber, id)
            );
            printQuantity();
            console.log(price);

            // self.disabled = true;
        });
    });

    function dragAndDrop() {
        cartZone.ondragover = allowDrop;

        function allowDrop(event) {
            event.preventDefault();
        }

        card.forEach((elem) => (elem.ondragstart = drag));

        function drag(event) {
            event.dataTransfer.setData("id", event.currentTarget.id);
            console.log(event.currentTarget.id);
        }

        cartProductsList.addEventListener("click", (e) => {
            if (e.target.classList.contains("cart-product__delete")) {
                deleteProducts(e.target.closest(".cart-content__item"));
            }
        });

        document.querySelector(".cart-content__btn").onclick = function () {
            window.location.href = "/form.html";
        };

        cartZone.ondrop = drop;

        function drop(event) {
            let itemId = event.dataTransfer.getData("id");
            const selectedBook = data.filter(
                (item) => item.id.toString() === itemId
            )[0];

            console.log(selectedBook);

            plusFullPrice(selectedBook.price);
            printFullPrice();
            cartProductsList.insertAdjacentHTML(
                "afterbegin",
                generateCartProduct(
                    selectedBook.title,
                    selectedBook.price,
                    selectedBook.id
                )
            );
            printQuantity();
        }
    }
    dragAndDrop();
}

function popUp(data) {
    const buttons = document.querySelectorAll(".button-show");

    buttons.forEach((el) => {
        el.addEventListener("click", (e) => {
            const bookId = e.currentTarget.parentNode.id;
            const selectedBook = data.filter(
                (item) => item.id.toString() === bookId
            )[0];
            const informationList = document.querySelector(".information-list");
            if (!el.contains(informationList)) {
                if (document.querySelector(".information-list")) {
                    closePopUp();
                }

                el.parentNode.insertAdjacentHTML(
                    "afterbegin",
                    `
                    <div class="information-list">
                        <h2> ${selectedBook.description} </h2>
                        <button class="button close" onclick="closePopUp()">Close</button>
    
                    </div>
              `
                );
            }
        });
    });
}

function closePopUp() {
    document.querySelector(".information-list").remove();
}

function visibleCart() {
    document.querySelector(".cart-container").onclick = function () {
        document.querySelector(".cart-content").classList.add("visible");
    };
}

renderPage();
