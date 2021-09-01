var cart = JSON.parse(localStorage.getItem("cartStorage"))


var totalItemsInCart = 0;

function calculateHowManyItemsInCart(){
    if (localStorage.getItem("cartStorage") === null) {
        return totalItemsInCart = 0;
    }
    else {
        for(let i = 0; i < cart.length; ++i) {
        let j = Object.values(cart[i])        
        totalItemsInCart += (j[4]);
        }
        return totalItemsInCart;
    }
}

calculateHowManyItemsInCart();
console.log(totalItemsInCart)

var itemsInCartSpan = document.getElementById("itemsInCart")

itemsInCartSpan.innerText = totalItemsInCart;