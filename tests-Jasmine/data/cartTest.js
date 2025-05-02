import { addTocart, cart } from "../../data/cart.js";

describe("addTocart", () => {
  let input;

  beforeEach(() => {
    // Reset the cart before each test
    cart.length = 0;

    // Mock the DOM element using a detached DOM element
    input = document.createElement("input");
    input.className = "js-QtyPicker-e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    input.value = "1";
    document.body.appendChild(input);
  });

  afterEach(() => {
    // Clean up the DOM after each test
    document.body.removeChild(input);
  });

  it("adds a new product to cart", () => {
    addTocart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].selectedQty).toEqual(1);
  });

  it("updates the quantity of an existing product in the cart", () => {
    // Add the product to the cart for the first time
    addTocart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].selectedQty).toEqual(1);

    // Mock the DOM element with a new quantity for the same product
    input.value = "2";

    // Add the same product again
    addTocart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    // Verify that the cart still has one product but the quantity is updated
    expect(cart.length).toEqual(1);
    expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].selectedQty).toEqual(3); // 1 (initial) + 2 (new addition)
  });

});