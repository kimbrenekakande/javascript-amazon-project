import { addTocart, cart} from "../../data/cart.js";

describe("ADD 2 CART", () => {
  it("adds existing products to the cart, ", () => {
    
    addTocart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");  
    expect(cart.length).toEqual(1);
  });

  it("adds new products to the cart", () => {
    // Arrange

  });
});