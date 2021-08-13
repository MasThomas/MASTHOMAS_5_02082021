// Construtor 

class Product {
    constructor({lenses,_id,name,price,description,imageUrl,quantity,}) {
        this.lenses = lenses;
        this.id = _id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }
}

// Récupération ID dans l'URL

const params = new URLSearchParams(document.location.search);
const urlId = params.get("id");
// console.log(urlId); // Ok le bon ID est récupéré


// Nouveau fetch pour récupérer les données

fetch("http://localhost:3000/api/cameras/" + urlId)
    .then(res => res.json())
//    .then(data => console.log(data)) / OK
    .then(function(addProduct) {
        let item = new Product(addProduct)
        showProduct(item);
    })
// Suite à la récupération de l'ID, construction de la page produit dynamique
// Construction card 

const showProduct = item => {
    document.getElementById("container-product").innerHTML =   
                    `<div class="card" style="width: 400px;">
                        <img src="${item.imageUrl}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title text-center">${item.name}</h5>
                            <p class="card-text fst-italic text-center">${item.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item mx-auto">Selectionnez la lentille</li>
                            <li class="list-group-item" id="lenses_choice"></li>
                            <li class="list-group-item text-center">Prix unitaire : ${item.price/100} €</li>
                            <li class="list-group-item text-center">Selectionnez la quantité :
                               <input type="number" id="qty_selector" min="0" max="99">
                            </li>
                        </ul>
                        <div class="card-body mx-auto">
                            <div class="btn btn-primary"><i class="fas fa-shopping-cart"></i>&emsp;Ajouter au panier&emsp;</div>
                        </div>
                    </div>`                                                    
};









/*
    .then(function (ProductsList) {
        for (let product of ProductsList) {
            let item = new Product(product)
            addProduct(item);  
        }
    })
    */