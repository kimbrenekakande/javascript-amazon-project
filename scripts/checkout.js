import { products } from "../data/products.js";
import { cart } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { delete4rmCart } from "../data/cart.js";

document.querySelector('.return-to-home-link').innerHTML = cart.length
document.querySelector('.js-order-sum').innerHTML=cart.length
let boughtProdsHTML;
let DecTotal = 0;

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
        <div class="cart-item-container js-item-contaner-${boughtProd.id}">
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
                    ${formatCurrency(boughtProd.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartProd.qty}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete" data-prod-id = ${boughtProd.id}>
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
                        name="delivery-option-${boughtProd.id}">
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
                        name="delivery-option-${boughtProd.id}">
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
                        name="delivery-option-${boughtProd.id}">
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
        </div> 
    `
    DecTotal +=boughtProd.priceCents/100;
})


//total cost of intems in the cart
let roundedTotal = DecTotal.toFixed(2)
document.querySelector('.payment-summary-money').innerHTML = roundedTotal

//total cost before tax with shipping and handling
let shippingHandling = 4.99
let costB4Tax = (((roundedTotal*100) + (shippingHandling*100))/100).toFixed(2)
document.querySelector('.b4Tax').innerHTML = costB4Tax

//Estimated Tax
const tax = 10/100
let estimatedTax = ((tax * (costB4Tax * 100))/100).toFixed(2)
document.querySelector('.js-est-tax').innerHTML = estimatedTax

//Order Total with tax, shipping & Handling
let totalCostWithTax = (((costB4Tax * 100) + (estimatedTax * 100))/100).toFixed(2)
document.querySelector('.js-order-total').innerHTML = totalCostWithTax;

document.querySelector('.js-order-summary').innerHTML = boughtProdsHTML;




//get the id of the product
//search for matching id in the cart
//delete the product from the cart

document.querySelectorAll('.js-delete').forEach((deletor)=>{
    deletor.addEventListener('click', ()=>{
        const prodId = deletor.dataset.prodId
        delete4rmCart(prodId)
        
        //Remove product Html from the DOM
        const container = document.querySelector(`.js-item-contaner-${prodId}`)
        container.remove()
    })
})

