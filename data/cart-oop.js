
function Cart(localStorageKey) {

  const cart = {
    cartItems: typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem(localStorageKey)) : null,
  
    defaultCart() {
      if (!this.cartItems) {
        this.cartItems = [
          { id: "15b6fc6f-327a-4ec4-896f-486349e85a3d", selectedQty: 2, deliveryOptID: 1 },
          { id: "3ebe75dc-64d2-4137-8860-1f5a963e534b", selectedQty: 8, deliveryOptID: 2 },
        ];
      }
    },
  
    save2storage() {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
      }
    },
  
    addTocart(productID) {
      const qtyPickerElement = document.querySelector(`.js-QtyPicker-${productID}`);
      let selectedQty = qtyPickerElement ? Number(qtyPickerElement.value) : 1;
      let prodMatch;
  
      // Check if product already exists in cart, if so increase quantity, else add new product to cart
      this.cartItems.forEach((cartProd) => {
        if (productID === cartProd.id) {
          prodMatch = cartProd;
        }
      });
  
      if (prodMatch) {
        prodMatch.selectedQty += selectedQty;
      } else {
        this.cartItems.push({
          id: productID,
          selectedQty: selectedQty,
          deliveryOptID: 1,
        });
      }
  
      // Update local storage
      this.save2storage();
      this.updateCartSum();
    },
  
    // Delete product from cart
    delete4rmCart(productId) {
      let newCart = [];
      this.cartItems.forEach((prod) => {
        if (prod.id !== productId) {
          newCart.push(prod);
        }
      });
      this.cartItems = newCart;
      this.save2storage();
    },
  
    // FIXME Update cart sum
    updateCartSum() {
      let cartSum = 0;
      this.cartItems.forEach((prody) => {
        cartSum += Number(prody.selectedQty);
      });
  
      // Declare variables for DOM elements
      const cartQtyElement = document.querySelector('.js-cartQty');
      const checkoutHeaderTotalElement = document.querySelector('.js-checkout-header-total');
      const orderSumElement = document.querySelector('.js-order-sum');
  
      if (!cartSum) {
        // Check if elements exist before updating
        if (cartQtyElement) {
          cartQtyElement.innerHTML = '';
        }
        if (checkoutHeaderTotalElement) {
          checkoutHeaderTotalElement.innerHTML = '';
        }
        if (orderSumElement) {
          orderSumElement.innerHTML = 0;
        }
      } else {
        // Update elements if they exist
        if (cartQtyElement) {
          cartQtyElement.innerHTML = cartSum;
        }
        if (checkoutHeaderTotalElement) {
          checkoutHeaderTotalElement.innerHTML = `${cartSum} items`;
        }
        if (orderSumElement) {
          orderSumElement.innerHTML = cartSum;
        }
      }
    },
  
    updateProdQuantity (prodId, upDateBy){
      this.cartItems.forEach((prod)=>{
          if(prod.id === prodId){
              prod.selectedQty = upDateBy;
              
          }
      })
      this.save2storage();
      this.updateCartSum();
    },
  
    // Unsure if this function isnt already there 
  
    updateDeliveryOpt(prodId, deliveryOptID){
      this.cartItems.forEach((prod)=>{
          if(prod.id === prodId){
              prod.deliveryOptID = deliveryOptID;
          }
      });
      this.save2storage();
      this.updateCartSum();
    }
  
  };

  cart.defaultCart();
  return cart;
}


const newCart = Cart('cartClone1');
const bussinessCart = Cart('cartClone2');






