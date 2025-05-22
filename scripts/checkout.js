import { loadProductsFetch } from "../data/products.js";
import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import "../data/cart-oop.js";


new Promise ((resolve) => {

  loadProductsFetch(() => {
    resolve()
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
// Load products first, then render summaries
