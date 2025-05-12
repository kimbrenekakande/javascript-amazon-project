import { products, getProduct } from "../../data/products.js";
import { cart, updateCartSum, updateProdQuantity, updateDeliveryOpt } from "../../data/cart.js";
import { formatCurrency } from "../utils/money.js";
import { delete4rmCart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOpt } from "../../data/deliveryOptions.js";
import { futureDate } from "../../data/day.js";
import { renderPaymentSummary } from "./paymentSummary.js";

//document.querySelector('.return-to-home-link').innerHTML = `${updateCartSum()} items`
updateCartSum();

export function renderOrderSummary() {
    //document.querySelector('.js-order-sum').innerHTML=cart.length
    let boughtProdsHTML = '';
    let DecTotal = 0;

    cart.forEach((cartProd) => {
      
        // Find bought product (Added to Cart) from products.js using their id
        const boughtProd = getProduct(cartProd.id);

        const deliveryOption = getDeliveryOpt(cartProd.deliveryOptID);
    
        if (!deliveryOption) {
            console.error(`No delivery option found for ID: ${cartProd.deliveryOptID}`);
            console.log(cartProd);
            return; // Skip this iteration if no matching delivery option is found
        }
        const deliveryDate = futureDate(deliveryOption.deliveryDays);
        
        console.log(futureDate(3))

        // Generate Bought products HTML
        boughtProdsHTML += `
            <div class="cart-item-container js-item-contaner-${boughtProd.id}">
                <div class="delivery-date">
                    Delivery date: ${deliveryDate}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src=${boughtProd.image}>

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${boughtProd.name}
                        </div>
                        <div class="product-price">
                            ${boughtProd.getPrice()}
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

                    <div class="delivery-options .js-delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptsHtml(boughtProd, cartProd)}
                    </div>
                </div>
            </div> 
        `;
        DecTotal += boughtProd.priceCents / 100;
    });



    function deliveryOptsHtml(boughtProd, cartProd) {
        let deliveryOptionsHtml = '';
        deliveryOptions.forEach((opt) => {
            let deliveryPrice = opt.priceCents === 0 ? "FREE Shipping" : `${formatCurrency(opt.priceCents)}`;
            const deliveryDate = futureDate(opt.deliveryDays);

            const isChecked = Number(opt.id) === Number(cartProd.deliveryOptID);
            deliveryOptionsHtml += `
            <div class="delivery-option js-delivery-option"  data-prod-id = ${boughtProd.id} data-delivery-opt-id=${opt.id}> 
                <input type="radio" 
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input" name="delivery-option-${boughtProd.id}">
                <div>
                    <div class="delivery-option-date">${deliveryDate}</div>
                    <div class="delivery-option-price">$ ${deliveryPrice} - Shipping</div>
                </div>
            </div>
            `;
        });
        return deliveryOptionsHtml; 
    }

    document.querySelector('.js-order-summary').innerHTML = boughtProdsHTML;






    //function OrderSumm() was here
    

    // Get the id of the product
    // Search for matching id in the cart
    // Delete the product from the cart
    document.querySelectorAll('.js-delete').forEach((deletor) => {
        deletor.addEventListener('click', () => {
            const prodId = deletor.dataset.prodId;
            delete4rmCart(prodId);

            // Remove product Html from the DOM
            const container = document.querySelector(`.js-item-contaner-${prodId}`);
            container.remove();

            updateCartSum();
            renderPaymentSummary(); // Re-render payment summary
        });
    });

    // Updating The cart
    document.querySelectorAll('.js-update').forEach(updator => {
        updator.addEventListener('click', () => {
            let updateID = updator.dataset.prodId;
            document.querySelector(`.js-item-contaner-${updateID}`).classList.add('is-editing-quantity');
            document.querySelector(`.quantity-input-${updateID}`).classList.add('view-qty-editor');
            document.querySelector(`.save-quantity-link-${updateID}`).classList.add('view-qty-editor');
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.save-quantity-link').forEach(savUpdate => {
        savUpdate.addEventListener('click', () => {
            let updateID = savUpdate.dataset.updateProdId;
            const upDateBy = savUpdate.closest('.cart-item-details').querySelector(`.quantity-input-${updateID}`).value;
            savUpdate.closest('.cart-item-details').querySelector(`.quantity-label-${updateID}`).innerHTML = upDateBy;
            updateProdQuantity(updateID, upDateBy);
            console.log(updateID, upDateBy);
            console.log(cart);
            //
            document.querySelector(`.js-item-contaner-${updateID}`).classList.remove('is-editing-quantity');
            document.querySelector(`.quantity-input-${updateID}`).classList.remove('view-qty-editor');
            document.querySelector(`.save-quantity-link-${updateID}`).classList.remove('view-qty-editor');
            renderPaymentSummary();
        });
    });



    document.querySelectorAll('.js-delivery-option').forEach(deliveryOpt => {
        deliveryOpt.addEventListener('click', () => {
            const prodId = deliveryOpt.dataset.prodId;
            const deliveryOptId = deliveryOpt.dataset.deliveryOptId;

            // Update the delivery option in the cart
            updateDeliveryOpt(prodId, deliveryOptId);
            renderOrderSummary();
            renderPaymentSummary(); // Re-render payment summary
        });
    });
};