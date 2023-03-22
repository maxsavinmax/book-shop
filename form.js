window.addEventListener(
    "load",
    function (e) {
        let date = new Date();
        let day = date.getDate() + 1;
        if (day < 10) {
            day = "0" + day;
        }

        let month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let year = date.getFullYear();
        document.getElementById("mydate").min = year + "-" + month + "-" + day;
        console.log(day);
    },
    false
);

window.addEventListener(
    "load",
    function (e) {
        let date = new Date();
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let year = date.getFullYear();
        document.getElementById("mydate").value =
            year + "-" + month + "-" + day;
        console.log(day);
    },
    false
);

// Let = count;
// let gift = document.querySelectorAll(".gift");
// gift.forEach((element) => {});

// console.log(gift);

function checkboxFunction() {
    let pack = document.querySelector('.gift[value="pack"]');
    let postcard = document.querySelector('.gift[value="postcard"]');
    let discount = document.querySelector('.gift[value="discount"]');
    let pensil = document.querySelector('.gift[value="pensil"]');
}

const completeButton = document.querySelector(".button");
document.querySelectorAll('input[type="text"]').forEach((elem) => {
    elem.onblur = function () {
        if (!elem.value.trim()) {
            elem.classList.add("invalid");
            completeButton.disabled = true;
        } else {
            elem.classList.remove("invalid");
            completeButton.disabled = false;
        }
    };
});

// function generateCartProduct(title, price, id) {
//     return `
//     <li class="cart-content__item">
//         <article class="cart-content__product cart-product" data-id='${id}'>
//             <div class="cart-product-text">
//                 <h3 class="cart-product__title">${title}</h3>
//                 <span class="cart-product__price">${price} ${CURRENCY_US} </span>
//             </div>
//             <button class="cart-product__delete"></button>
//         </article>
//     </li>
//     `;
// }

function myFunction() {
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let street = document.getElementById("street").value;
    let house = document.getElementById("house").value;
    let flat = document.getElementById("flat").value;
    let date = document.getElementById("mydate").value;
    const information = document.querySelector(".information");
    const informationList = document.querySelector(".information-list");

    if (!information.contains(informationList)) {
        information.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="information-text">
                <h2>The order created</h2>

                <ul class="information-list">
                    <li>CUSTOMER: ${name} ${surname}</li>
                    <li>THE DELIVERY ADDRES:</li>
                    <li>${street} street, house: ${house}, flat: ${flat}</li>
                    <li>DATE: ${date}</li>
                </ul>
                <a href="./index.html"><button class="button information-btn" >Book Catalog</button></a>

            </div>
      `
        );
    }
}

// alert(name + " " + surname + " " + "Your email is " + street); //this will alert the first name and the last name.
