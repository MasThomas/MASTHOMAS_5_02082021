var cartToCalculate = JSON.parse(localStorage.getItem("cartStorage"))


var totalItemsInCart = 0;

function calculateHowManyItemsInCart(){
    if (localStorage.getItem("cartStorage") === null) {
        return totalItemsInCart = 0;
    }
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

var itemsInCartSpan = document.getElementById("itemsInCart")

itemsInCartSpan.innerText = totalItemsInCart;