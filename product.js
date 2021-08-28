

// Récupération ID dans l'URL

const params = new URLSearchParams(document.location.search);
const urlId = params.get("id");
// console.log(urlId); // Ok le bon ID est récupéré

// Nouveau fetch pour récupérer les données et afficher le produit selectionné

fetch("http://localhost:3000/api/cameras/" + urlId)
    .then(res => res.json())
    .then(function(addProduct) {
        let item = new Product(addProduct)
        showProduct(item);

// Récupération de la liste des lentilles et affichage dans un menu déroulant (<select>)
    for (let lenses of item.lenses) {
            document.getElementById("lenses_choice").innerHTML += `<option value="${lenses}">${lenses}</option>`;
        };
    })

// Création de l'élément HTML à injecter, et paramètrage de l'EventListner pour l'ajout au Panier 

const showProduct = item => {
    document.getElementById("container-product")
        .innerHTML =   `<div class="card" style="width: 400px;">
                        <img src="${item.imageUrl}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title text-center">${item.name}</h5>
                            <p class="card-text fst-italic text-center">${item.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item mx-auto">Selectionnez la lentille</li>
                            <li class="list-group-item mx-auto">
                                <select id="lenses_choice">
                                    <option value ="">-- Selectionnez une lentille --</option>
                                </select>
                            </li>
                            <li class="list-group-item text-center">Prix unitaire : ${item.price/100} €</li>
                            <li class="list-group-item text-center">Selectionnez la quantité :
                               <input type="number" id="quantitySelector" min="1" max="99" value="1">
                            </li>
                        </ul>
                        <div class="card-body mx-auto">
                            <button class="btn btn-primary" id="buttonAdd"><i class="fas fa-shopping-cart"></i>&emsp;Ajouter au panier&emsp;</button>
                        </div>
                    </div>` 
                    

    var addToCartBtn = document.getElementById('buttonAdd')
    addToCartBtn.addEventListener('click', addToCart);

    var quantityInput = document.getElementById('quantitySelector')
    quantityInput.addEventListener('change', quantityChanged)

    var getVal = 0;


// Récupération de l'input Quantité pour l'ajout au panier, et empècher une valeur négative ou NaN

    function quantityChanged(e) {
        var input = e.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        return getVal = input.value
    }
}

function addToCart(){
    console.log('ok')
}