// Vérification si le panier est vide

var containerCart = document.getElementById("tbody")

var cart = JSON.parse(localStorage.getItem("cartStorage"))

function checkEmptyCart() {
    if (localStorage.getItem("cartStorage") === null) {
        containerCart.innerHTML =
            `<div class="my-3">
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
                        </div>
                        </div>
                    </td>
                    <td data-th="Lentille choisie">${item.lenses}</td>
                    <td data-th="Price" class="text-center">${item.price/100} €</td>
                    <td data-th="Quantity" class="text-center">${item.quantity}</td>
                    <td data-th="Subtotal" class="text-center"></td>
                    </tr>
                </tbody>`
        }
    }
}


// Si le panier est vide, supression du formulaire, du bouton pour vider le panier ainsi que d'un bout du tableau

var formDiv = document.querySelector("#form-container")
var tableFooter = document.querySelector("#table_footer")
var buttonDeleteCart = document.querySelector("#deleteCart")

function doesFormTableAndDeleteButtonAppear() {
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

fetch("http://localhost:3000/api/cameras/")
    .then(res => res.json)
    .then(doesFormTableAndDeleteButtonAppear())
    .then(checkEmptyCart())