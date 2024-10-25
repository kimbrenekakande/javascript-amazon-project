import { products } from "../data/products.js";
import { cart } from "../data/cart.js";

let boughtProdsHTML;

cart.forEach((cartProd)=>{
    //Find bought product  (Added to  Cart) from products.js using their id
    let  boughtProd;
    products.forEach((stockProd) =>{
        if (stockProd.id === cartProd.id){
            boughtProd = stockProd;
            
        }
    })

    //Generate Bought products HTML
    boughtProdsHTML += `
        <div class="cart-item-container">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src=${boughtProd.image}>

                <div class="cart-item-details">
                <div class="product-name">
                    ${boughtProd.name}
                </div>
                <div class="product-price">
                    ${boughtProd.priceCents / 100}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartProd.qty}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-prod" data-delete-id = "${cartProd.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                <div class="delivery-option">
                    <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-1">
                    <div>
                    <div class="delivery-option-date">
                        Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                        FREE Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                    <div>
                    <div class="delivery-option-date">
                        Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                        $4.99 - Shipping
                    </div>
                    </div>
                </div>
                <div class="delivery-option">
                    <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-1">
                    <div>
                    <div class="delivery-option-date">
                        Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                        $9.99 - Shipping
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div> `
})
document.querySelector('.js-order-summary').innerHTML = boughtProdsHTML;
console.log(localStorage.getItem('cart'))

//get the id of the product
//search for matching id in the cart
//delete the product from the cart

document.querySelectorAll('.js-delete-prod').forEach((delBut)=>{
    delBut.addEventListener('click', ()=>{
        let deletedId = delBut.dataset.deleteId
        //let deletedProd;
        cart.forEach((cartProd) => {
            if (cartProd.id === deletedId){
                let ind = cart.indexOf(cartProd)
                console.log(ind)
            }
        })
    })
})