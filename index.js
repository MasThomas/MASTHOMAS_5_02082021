// Const pour afficher les produits dans l'HTML

const addProduct = item => {
    container = document.getElementById("container")
    .innerHTML +=   `<div class="col mb-3 mx-3 my-5 w-25">
                        <div class="card h-100">
                            <img class="card-img-top img-cover" src=${item.imageUrl} alt="..." />
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">${item.name}</h5>
                                    <span>${item.price/100} €</span>
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-primary" href="./product.html?id=${item.id}">Voir la fiche produit</a></div>
                            </div>
                        </div>
                    </div>`                                                    
};

// REQUETE API

fetch("http://localhost:3000/api/cameras")
    .then(res => res.json())
    .then(function (ProductsList) {
        for (let product of ProductsList) {
            let item = new Product(product)
            addProduct(item);  
        }
    })
    // console.error("Erreur de connexion à la base de donnée. Merci de réactualiser la page !")

    
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

