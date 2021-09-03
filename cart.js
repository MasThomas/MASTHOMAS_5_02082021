// Vérification si le panier est vide

let containerCart = document.getElementById("tbody")
let containerMessage = document.getElementById("container-alert-message")

let cart = JSON.parse(localStorage.getItem("cartStorage"))

// Si le panier est vide (=== null), Affichage d'un message invitant à retourner à la liste des articles

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

// Sinon, on créé une boucle sur le panier dans le localStorage pour afficher chaque élément de celui-ci

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


// Si le panier est vide, supression du formulaire, du bouton pour vider le panier ainsi que du footer du tableau du panier

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

// Création d'un Eventlistener sur un bouton pour pouvoir vider le panier

buttonDeleteCart.addEventListener('click', function(){
    localStorage.clear();
    location.reload();
    console.log(localStorage)
})

let totalPrice = 0;

// Création d'une fonction pour calculer le prix total du panier, puis pour l'afficher en innerHTML.

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


// Ciblage des input afin de valider le formulaire

let submitBtn = document.getElementById("submitForm")
let firstNameInput = document.getElementById("inputFirstName")
let lastNameInput = document.getElementById("inputLastName")
let emailInput = document.getElementById("inputEmail")
let adressInput = document.getElementById("inputAddress")
let cityInput = document.getElementById("inputCity")


// Création d'une boucle pour récupérer les Id du panier

let products = []

function getCartIds() {
    
    for(let i = 0; i < cart.length; ++i) {
        let j = Object.values(cart[i])        
        products.push(j[0]);
    }
    return products;
}


// EventListner au clic de validation du bouton

submitBtn.addEventListener('click', submitVerificatons)

// Suite au clic, fonction de vérification via regex

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

    // Création de l'objet contact à envoyer

    let contact = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        address: adressInput.value,
        city: cityInput.value,
        email: emailInput.value
    }

    // Si toutes les vérifications retournent "true" (les regex sont validées), alors :

    if (inputFirstNameVerif() === true && inputLastNameVerif() === true && inputEmailVerif() === true && inputAdressVerif() === true && inputCityVerif() === true) {
            
        // On récupère les Id du panier
            getCartIds()
        // Puis on stocke les informations à transmettre à l'API sous forme de string dans une variable
        
            let stringifySentInformations = JSON.stringify({contact, products});
            console.log(stringifySentInformations)

            async function sendPostInformations() {
                const response = await fetch("https://apiorinico.herokuapp.com/api/cameras/order", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: stringifySentInformations
                })
                let body = await response.json();
                console.log(response.status);
                console.log(response.statusText);
                
                // Si le serveur répond favorablement à la requète, on stocke l'ID de commande dans le localStorage ainsi que le coût total
                // de la commande. Puis on redirige vers la page de confirmation de commande

                if (response.status === 200 || response.status === 201) {
                    localStorage.setItem("orderId",JSON.stringify(body.orderId))
                    localStorage.setItem("totalPrice", totalPrice)
                    window.location.href = "./confirmation.html";
                }
            }

            sendPostInformations();

        // En revanche, si les informations saisies ne sont pas validées par les regex, on alerte l'utilisateur du problème

        } else {
        alert('Veuillez vérifier la validité des informations saisies')
        console.log("Mauvaise saisie")
    }
}
 

// Regex Nom, Prénom et Ville permettant les accents, les apostrophes, les tirets ainsi que les lettres étrangères.

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

function inputCityVerif(cityInput) {
    let regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    let ctrl = document.getElementById("inputCity")
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

// Regex adresse, assez permissif mais obligeant 2 espaces.

function inputAdressVerif(adressInput) {
    let regex = /\w+(\s\w+){2,}/;
    let ctrl = document.getElementById("inputAddress")
    if (regex.test(ctrl.value) === true) {
        return true
    } else {
        return false
    }
}

// Fetch afin de récupérer les informations de l'API, puis de verifier le panier, puis de calculer et afficher le prix total

fetch("https://apiorinico.herokuapp.com/api/cameras")
    .then(res => res.json)
    .then(doesFormAndTableAndDeleteButtonAppear())
    .then(checkEmptyCart())
    .then(calculateTotalPrice())
    .then(displayTotalPrice())