let containerMessage = document.getElementById("container-orderOk")
let containerErrorMessage = document.getElementById("container-orderNotOk")

function verifyIfOrderHasBeenPassed() {
    if (localStorage.getItem("orderId") === null) {
        containerMessage.remove();
} else {

    let orderId = JSON.parse(localStorage.getItem("orderId"))
    let totalPrice = JSON.parse(localStorage.getItem("totalPrice"))

        containerErrorMessage.remove()
        containerMessage.innerHTML =
            `Nous vous confirmons la prise en compte de votre commande d'un montant de ${totalPrice} €, enregistrée sous la référence ${orderId}.`
        localStorage.clear();
    }
}

verifyIfOrderHasBeenPassed();