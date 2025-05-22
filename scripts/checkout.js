import { loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/cart-oop.js";

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load products and then render the components
    loadProductsFetch()
        .then(() => {
            renderOrderSummary();
            renderPaymentSummary();
        })
        .catch(error => {
            console.error('Error loading products:', error);
            // You might want to show an error message to the user here
        });
});
