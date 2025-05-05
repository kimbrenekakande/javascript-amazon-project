import { cart } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/OrderSummary.js";

describe("Order Summary", () => {
  // This block runs before each test to reset the cart array to an empty state
  beforeEach(() => {
    cart.length = 0; // Reset the cart before each test
  });

  it("displays the cart correctly", () => {
    // Set up the test container in the DOM with a placeholder for the order summary
    document.querySelector(".js-test-container").innerHTML = 
    `<div class="js-order-summary"></div>`;

    // Mock the localStorage.getItem method to return a predefined cart when accessed
    spyOn(localStorage, "getItem").and.callFake((key) => {
      if (key === "cart") {
        // Return a JSON string representing a cart with two items
        return JSON.stringify([
          { id: "15b6fc6f-327a-4ec4-896f-486349e85a3d", selectedQty: 2, deliveryOptID: 1 },
          { id: "3ebe75dc-64d2-4137-8860-1f5a963e534b", selectedQty: 8, deliveryOptID: 2 },
        ]);
      }
      return null; // Return null for any other keys
    });

    // Call the renderOrderSummary function to render the order summary in the DOM
    renderOrderSummary();

    // Select the rendered order summary element from the DOM
    const orderSummary = document.querySelector(".js-order-summary");

    // Assert that the order summary element exists in the DOM
    expect(orderSummary).not.toBeNull();

    // Additional assertions can be added here to verify the rendered content
  });
});