"use strict";

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

function CreateSummarizedInformation() {
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
