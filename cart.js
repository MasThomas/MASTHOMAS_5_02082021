// Vérification si le panier est vide

let containerCart = document.getElementById("tbody")
let containerMessage = document.getElementById("container-alert-message")

let cart = JSON.parse(localStorage.getItem("cartStorage"))

function checkEmptyCart() {
    if (localStorage.getItem("cartStorage") === null) {
        containerMessage.innerHTML =
            `<div class="my-5">
            <p class="text-center my-3">Votre panier est vide !<br><br>
            Afin de retourner à la liste des articles, veuillez cliquer sur le bouton ci-dessous
            </p>
            </div>
            <div class="d-flex justify-content-center my-5">
            <a href="./index.html" class="btn btn-primary"><i class="fa fa-angle-left"></i> Retourner à la liste des articles</a>
            </div>
            `
    } else {
        for (item of cart) {
            containerCart.innerHTML +=
                `<tbody>
                    <tr>
                    <td data-th="Product">
                        <div class="row">
                        <div class="col-sm-2 hidden-xs"><img src="${item.image}" alt="Thumbnail de l'appareil ${item.name}" class="img-thumbnail "/></div>
                        <div class="col-sm-10">
                            <h4 class="nomargin">${item.name}</h4>
                            <p>${item.description}</p>
                        </div>
                        </div>
                    </td>
                    <td data-th="Lentille choisie">${item.lenses}</td>
                    <td data-th="Price" class="text-center">${item.price/100} €</td>
                    <td data-th="Quantity" class="text-center">${item.quantity}</td>
                    <td data-th="Subtotal" class="text-center subtotal">${item.subtotal/100} €</td>
                    </tr>
                </tbody>`
        }
    }
}


// Si le panier est vide, supression du formulaire, du bouton pour vider le panier ainsi que d'un bout du tableau

let formDiv = document.querySelector("#form-container")
let tableFooter = document.querySelector("#table_footer")
let buttonDeleteCart = document.querySelector("#deleteCart")

function doesFormAndTableAndDeleteButtonAppear() {
    if (localStorage.getItem("cartStorage") === null) {
        formDiv.remove()
        tableFooter.remove()
        buttonDeleteCart.remove()
    }
}

buttonDeleteCart.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
    console.log(localStorage)
})

let totalPrice = 0;

function calculateTotalPrice(){
    for(let i = 0; i < cart.length; ++i) {
        let j = Object.values(cart[i])
        totalPrice += (j[7]/100);
    }
}

let totalPriceContainer = document.getElementById("totalPrice")
function displayTotalPrice() {
    totalPriceContainer.innerHTML += `${totalPrice} €`;
}


// Validation du formulaire

let submitBtn = document.getElementById("submitForm")
let firstNameInput = document.getElementById("inputFirstName")
let lastNameInput = document.getElementById("inputLastName")
let emailInput = document.getElementById("inputEmail")
let adressInput = document.getElementById("inputAddress")
let cityInput = document.getElementById("inputCity")


let products = []

function getCartIds() {
    
    for(let i = 0; i < cart.length; ++i) {
        let j = Object.values(cart[i])        
        products.push(j[0]);
    }
    return products;
}


submitBtn.addEventListener('click', submitVerificatons)

function submitVerificatons() {
    inputFirstNameVerif()
    console.log(inputFirstNameVerif())
    inputLastNameVerif()
    console.log(inputLastNameVerif())
    inputEmailVerif()
    console.log(inputEmailVerif())
    inputAdressVerif()
    console.log(inputAdressVerif())
    inputCityVerif()
    console.log(inputCityVerif())

    // Création de l'objet à envoyer

    let contact = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: adressInput.value,
        city: cityInput.value,
        email: emailInput.value
    }

    if (inputFirstNameVerif() === true && inputLastNameVerif() === true && inputEmailVerif() === true && inputAdressVerif() === true && inputCityVerif() === true) {
            
            getCartIds()
            let stringifySentInformations = JSON.stringify({contact, products});
            console.log(stringifySentInformations)

            // Envoyer l'objet en POST
            fetch("https://apiorinico.herokuapp.com/api/cameras", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: stringifySentInformations
            })

            // Traiter la réponse, et stocker l'orderId retourné dans le localStorage

            .then(response => response.json()) 
            .then(response => { localStorage.setItem("orderId",JSON.stringify(response.orderId))})
            localStorage.setItem("totalPrice", totalPrice)
            console.log(localStorage)
                            
            // Passer à la page suivante

            // window.location.href= "./confirmation.html"


    } else {
        alert('Veuillez vérifier la validité des informations saisies')
        console.log("Mauvaise saisie")
    }
}
 

// Regex Nom, Prénom et Ville permettant les accents, les apostrophes, les tirets.

function inputFirstNameVerif(inputFirstName) {
    let regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let ctrl = document.getElementById("inputFirstName")
    if (regex.test(ctrl.value) === true) {
        return true
    } else {
        return false
    }
}

function inputLastNameVerif(lastNameInput) {
    let regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let ctrl = document.getElementById("inputLastName")
    if (regex.test(ctrl.value) === true) {
        return true
    } else {
        return false
    }
}

// Regex email conforme à la norme RFC 5322

function inputEmailVerif(emailInput) {
    let regex = /(?:[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    let ctrl = document.getElementById("inputEmail")
    if (regex.test(ctrl.value) === true) {
        return true
    } else {
        return false
    }
}

function inputAdressVerif(adressInput) {
    let regex = /\w+(\s\w+){2,}/;
    let ctrl = document.getElementById("inputAddress")
    if (regex.test(ctrl.value) === true) {
        return true
    } else {
        return false
    }
}
function inputCityVerif(cityInput) {
    let regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let ctrl = document.getElementById("inputCity")
    if (regex.test(ctrl.value) === true) {
        return true
    } else {
        return false
    }   
}




fetch("https://apiorinico.herokuapp.com/api/cameras")
    .then(res => res.json)
    .then(doesFormAndTableAndDeleteButtonAppear())
    .then(checkEmptyCart())
    .then(calculateTotalPrice())
    .then(displayTotalPrice())
