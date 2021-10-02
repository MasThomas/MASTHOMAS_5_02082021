// REQUETE API

fetch("http://localhost:3000/api/cameras") // http://localhost:3000/api/cameras || https://apiorinico.herokuapp.com/api/cameras
    .then(res => res.json())
    .then(function displayProductList (ProductsList) {
        for (let product of ProductsList) {
            let item = new Product(product)
            addProduct(item);  
        }
    })
    .catch(function(error) {
        console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
        alert('Un problème est survenu avec le serveur, veuillez réactualiser la page.')
      });
      
      
// Fonction pour afficher les produits dans l'HTML

function addProduct (item) {
    container = document.getElementById("container")
    .innerHTML +=   `<div class="mx-auto my-4"> 
                        <div class="card h-100">
                            <img class="card-img-top img-cover" src=${item.imageUrl} alt="photo de l'appareil ${item.name}" />
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