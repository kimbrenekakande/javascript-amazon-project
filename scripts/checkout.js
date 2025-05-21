import { loadProducts } from "../data/products.js";
import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/cart-oop.js";

// Load products first, then render summaries
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
