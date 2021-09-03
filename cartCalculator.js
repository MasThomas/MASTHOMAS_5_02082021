// On récupère le panier dans le localStorage

let cartToCalculate = JSON.parse(localStorage.getItem("cartStorage"))

// On initialise la variable totalItemsInCart 
let totalItemsInCart = 0;

function calculateHowManyItemsInCart(){

    // Si le cartStorage retourne "null" (vide), alors on retourne "0"
    if (localStorage.getItem("cartStorage") === null) {
        return totalItemsInCart = 0;
    }

    // Sinon, on boucle sur le panier dans le localStorage pour récupérer la valeur "quantité" de chaque objet dans le panier
    else {
        for(let i = 0; i < cartToCalculate.length; ++i) {
        let j = Object.values(cartToCalculate[i])        
        totalItemsInCart += (j[5]);
        }
        return totalItemsInCart;
    }
}

calculateHowManyItemsInCart();
// console.log(totalItemsInCart)

// On vise le span "itemsInCart" présent dans le header pour afficher le résultat de totalItemsInCart
let itemsInCartSpan = document.getElementById("itemsInCart")

// Puis on actualise la valeur de celui-ci par le resultat de la fonction
itemsInCartSpan.innerText = totalItemsInCart;