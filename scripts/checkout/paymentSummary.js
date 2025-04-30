import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from '../utils/money.js';
import {getDeliveryOpt } from "../../data/deliveryOptions.js";


export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPricesCents = 0;
    let totalProducts = 0;

    cart.forEach(cartProd => {
      //Product price calculation
      const boughtProd = getProduct(cartProd.id);
      if (boughtProd) {
          productPriceCents += boughtProd.priceCents * cartProd.selectedQty; 
      }
      // total products calculation
      totalProducts += Number(cartProd.selectedQty);

      // delivery option cost calculation
      let deliveryOption = getDeliveryOpt(cartProd.deliveryOptID);
      shippingPricesCents += deliveryOption.priceCents;
    });
    const totalBe4Tax = productPriceCents + shippingPricesCents;
    const taxCents = totalBe4Tax * 0.1;
    const totalCents = totalBe4Tax + taxCents;
    
    //Generate Payment HTML
    const paymentSummaryHTML = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (<span class="js-order-sum">${totalProducts}</span>):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money js-shipEnHandle">$${formatCurrency(shippingPricesCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money b4Tax">$${formatCurrency(totalBe4Tax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money js-est-tax">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money js-order-total">$${formatCurrency(totalCents)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button
    `
  document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML

}
