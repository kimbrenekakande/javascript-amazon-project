import { products } from "../data/products.js";
import { cart,updateCartSum, updateProdQuantity } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { delete4rmCart } from "../data/cart.js";

//document.querySelector('.return-to-home-link').innerHTML = `${updateCartSum()} items`
updateCartSum();

//document.querySelector('.js-order-sum').innerHTML=cart.length
let boughtProdsHTML = ''
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
                        Quantity: <span class='quantity-label quantity-label-${boughtProd.id}'>${cartProd.selectedQty}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update" data-prod-id = ${boughtProd.id}>
                        Update
                        </span>
                        <input class="quantity-input quantity-input-${boughtProd.id} link-primary">
                        <span class="save-quantity-link save-quantity-link-${boughtProd.id} link-primary" data-update-prod-id = ${boughtProd.id}>Save</span>
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
    DecTotal += boughtProd.priceCents/100;
})

function OrderSumm(){
    //Estimated Costs

    let tax = 10/100;
    let shippingHandling = 4.99

    if(!DecTotal){
        tax = 0;
        shippingHandling = 0.00;
        document.querySelector('.js-shipEnHandle').innerHTML = '0.00';
    }
    //total cost of intems in the cart
    let roundedTotal = DecTotal.toFixed(2)
    document.querySelector('.payment-summary-money').innerHTML = roundedTotal
    
    //total cost before tax with shipping and handling
    let costB4Tax = (((roundedTotal*100) + (shippingHandling*100))/100).toFixed(2)
    document.querySelector('.b4Tax').innerHTML = costB4Tax
    let estimatedTax = ((tax * (costB4Tax * 100))/100).toFixed(2)
    document.querySelector('.js-est-tax').innerHTML = estimatedTax

    //Order Total with tax, shipping & Handling
    let totalCostWithTax = (((costB4Tax * 100) + (estimatedTax * 100))/100).toFixed(2)
    document.querySelector('.js-order-total').innerHTML = totalCostWithTax;
    document.querySelector('.js-order-summary').innerHTML = boughtProdsHTML;
}

OrderSumm();





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
        updateCartSum()
    })
})





//Updating The cart

document.querySelectorAll('.js-update').forEach(updator => {
    updator.addEventListener('click', ()=>{
        let updateID = updator.dataset.prodId;
        document.querySelector(`.js-item-contaner-${updateID}`).classList.add('is-editing-quantity') 
        document.querySelector(`.quantity-input-${updateID}`).classList.add('view-qty-editor')
        document.querySelector(`.save-quantity-link-${updateID}`).classList.add('view-qty-editor')
    })
});


document.querySelectorAll('.save-quantity-link').forEach( savUpdate => {
    savUpdate.addEventListener('click' , ()=>{
        let updateID = savUpdate.dataset.updateProdId;
        const upDateBy = savUpdate.closest('.cart-item-details').querySelector(`.quantity-input-${updateID}`).value
        savUpdate.closest('.cart-item-details').querySelector(`.quantity-label-${updateID}`).innerHTML = upDateBy;
        updateProdQuantity(updateID, upDateBy)
        //
        document.querySelector(`.js-item-contaner-${updateID}`).classList.remove('is-editing-quantity') 
        document.querySelector(`.quantity-input-${updateID}`).classList.remove('view-qty-editor')
        document.querySelector(`.save-quantity-link-${updateID}`).classList.remove('view-qty-editor')
    });
})