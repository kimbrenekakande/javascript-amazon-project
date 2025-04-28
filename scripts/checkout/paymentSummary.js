import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from '../utils/money.js';
import {getDeliveryOpt } from "../../data/deliveryOptions.js";


export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPricesCents = 0;

    cart.forEach(cartProd => {
      //Product price calculation
      const boughtProd = getProduct(cartProd.id);
      if (boughtProd) {
          productPriceCents += boughtProd.priceCents * cartProd.selectedQty; 
      }
      // delivery option cost calculation
      let deliveryOption = getDeliveryOpt(cartProd.deliveryOptID);
      shippingPricesCents += deliveryOption.priceCents;       
    });
    const totalBe4Tax = productPriceCents + shippingPricesCents;
    const taxCents = totalBe4Tax * 0.1;
    const totalCents = totalBe4Tax + taxCents;
    
    //Generate Payment HTML
    const paymentSummaryHTML = `
      <div class="payment-summary">
          <h2>Payment Summary</h2>
          <div class="summary-item">
              <span>Subtotal:</span>
              <span>${formatCurrency(totalBe4Tax)}</span>
          </div>

          <div class="summary-item">
              <span>Shipping:</span>
              <span>${formatCurrency(shippingPricesCents)}</span>
          </div>
          <div class="summary-item">
              <span>Tax:</span>
              <span>${formatCurrency(taxCents)}</span>
          </div>
          <div class="summary-total">
              <strong>Total:</strong>
              <strong>${formatCurrency(totalCents)}</strong>
          </div>
      </div>
  `
  document.querySelector('.js-payment-summary').textContent = paymentSummaryHTML

}
