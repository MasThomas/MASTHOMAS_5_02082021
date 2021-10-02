let containerMessage = document.getElementById("container-orderOk")
let containerErrorMessage = document.getElementById("container-orderNotOk")


// On vérifie que "orderId" est présent dans le panier (et donc que l'étape précédente a été validée)

function verifyIfOrderHasBeenPassed() {
    if (localStorage.getItem("orderId") === null) {

        // Si orderId n'existe pas, on supprime le container du message de confirmation de commande et l'utilisateur a un message d'erreur affiché
        
        containerMessage.remove();
    
    } else {

        // Si orderId existe, on récupère puis parse orderId et totalPrice
        
    let orderId = JSON.parse(localStorage.getItem("orderId"))
    let totalPrice = JSON.parse(localStorage.getItem("totalPrice"))
        // On supprime le container du message d'erreur 
        containerErrorMessage.remove()
        // Puis on confirme la prise en compte de la commande, avec le montant total et la référence de la commande
        containerMessage.innerHTML =
            `Nous vous confirmons la prise en compte de votre commande d'un montant de ${totalPrice} €, enregistrée sous la référence ${orderId}.`
        // Enfin, on vide le localStorage
        localStorage.clear();
    }
}

verifyIfOrderHasBeenPassed();