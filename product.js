// Récupération ID dans l'URL

const params = new URLSearchParams(document.location.search);
const urlId = params.get("id");


// Nouveau fetch pour récupérer les données et afficher le produit selectionné

fetch("http://localhost:3000/api/cameras/" + urlId)
    .then(res => res.json())
    .then(function displayOneProduct(displayProduct) {
        let item = new Product(displayProduct)
        ProductInformations(item);

// Récupération de la liste des lentilles et affichage dans un menu déroulant (<select>)
    for (let lenses of item.lenses) {
            document.getElementById("lenses_choice").innerHTML += `<option value="${lenses}">${lenses}</option>`;
        };
    })
    .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        alert("Erreur de connexion avec le serveur. Si le problème persiste, veuillez retourner à la page d'accueil")
      });

// Création de l'élément HTML à injecter suite à l'appel API 

function ProductInformations(item) {
    document.getElementById("container-product").innerHTML =
        `<div class="d-flex justify-content-center my-5" style="height: 300px">
        <div class="card d-flex flex-row mx-auto w-75">
        <img src="${item.imageUrl}" class="img-product img-thumbnail">
          <div class="card-body w-25 my-auto">
              <h5 class="card-title text-center">${item.name}</h5>
              <p class="card-text fst-italic text-center">${item.description}</p>
          </div>
          <ul class="list-group list-group-flush my-auto">
              <li class="list-group-item mx-auto">Selectionnez l'objectif :</li>
              <li class="list-group-item mx-auto">
                  <select id="lenses_choice">
                      <option value="Aucun objectif">Aucun objectif</option>
                  <option value="35mm 1.4">35mm 1.4</option><option value="50mm 1.6">50mm 1.6</option></select>
              </li>
              <li class="list-group-item text-center">Prix unitaire : ${item.price/100} €</li>
              <li class="list-group-item text-center">Selectionnez la quantité :
                  <input type="number" id="quantitySelector" min="1" max="99" value="1">
              </li>
          </ul>
          <div class="card-body d-flex flex-column justify-content-evenly w-25">
              <button class="btn btn-primary" id="buttonAdd"><i class="fas fa-shopping-cart" aria-hidden="true"></i> Ajouter au panier </button>
              <a href="./index.html" class="btn btn-primary"><i class="fa fa-angle-left"></i> Retourner aux articles</a>
              <a href="./cart.html" class="btn btn-primary" id="goToCart">Aller au panier <i class="fa fa-angle-right"></i></a>
          </div>
      </div>
    </div>`                 
    


// Selection de l'input quantité et ajout d'un EventListener (change)

    let quantityInput = document.getElementById('quantitySelector')
    quantityInput.addEventListener('change', quantityChanged)

// Initialisation de getVal en cas de non-modification de l'input puis récupération de l'input Quantité
// pour l'ajout au panier, en empèchant une valeur négative ou NaN

    let getVal = 1  ;

    function quantityChanged(event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        getVal = input.value
        console.log(getVal)
        return getVal;
    }
    
// Selection du select Lenses et ajout d'un EventListener (change)

    let lensesInput = document.getElementById('lenses_choice')
    lensesInput.addEventListener('change', lensesChoice)

// Initialisation de getLenses en cas de non-modification puis récupération du choix de lentilles 

    let getLenses = lensesInput.value;

    function lensesChoice(event) {
        var input = event.target
        getLenses = input.value
        console.log(getLenses)
        return getLenses;
    }


// Selection du bouton "Ajouter au Panier", initialisation de la variable array "cart", puis ajout d'un EventListener (click)

    var addToCartBtn = document.getElementById('buttonAdd')
    let cart = [];

    addToCartBtn.addEventListener('click', function(event) {
        event.preventDefault()
    
// Création de la variable product contenant un objet qui reprend les caractéristiques de l'objet à ajouter au panier 

        let product = {
            _id: urlId,
            image: item.imageUrl,
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: parseInt(getVal),
            lenses: getLenses,
            subtotal: parseInt(item.price * getVal),
        };

// Initialisation d'une variable de validation 

        let testProduct = true;

// Vérification si le panier est existant ou s'il faut le créer
// Puis ajout de product au tableau cart
// Stringify du tableau afin de le rendre compatible avec le localStorage
// Alerte afin de valider la prise en compte de sa demande à l'utilisateur

        if (localStorage.getItem("cartStorage") === null) {
            cart.push(product); 
            localStorage.setItem("cartStorage", JSON.stringify(cart));
            alert(`Vous avez ajouté ${product.quantity} "${product.name}" avec l'objectif "${product.lenses}" à votre panier`);
            console.log(localStorage)
            location.reload();
        }    
        
// Si le panier est existant
// On parcourt le tableau afin de vérifier 
        else {
            cart = JSON.parse(localStorage.getItem("cartStorage"));
            for (let item of cart) {
                if (item._id === product._id && item.lenses === product.lenses) {
                    item.quantity += product.quantity;
                    testProduct = false;
                }
            }
                if (testProduct) cart.push(product);
                    localStorage.setItem("cartStorage", JSON.stringify(cart));
                    alert(`Vous avez ajouté ${product.quantity} "${product.name}" avec l'objectif "${product.lenses}" à votre panier`);
                    console.log(localStorage);
                    location.reload();
        }
    });
}