export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart = [
        {id: "15b6fc6f-327a-4ec4-896f-486349e85a3d", selectedQty : 2, deliveryOptID : 1},
        {id: "3ebe75dc-64d2-4137-8860-1f5a963e534b", selectedQty : 8, deliveryOptID : 2},
    ];
}


export function save2storage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}


export function addTocart(productID){
    let selectedQty = Number(document.querySelector(`.js-QtyPicker-${productID}`).value)
    let prodMatch;
        
    //Check if product already exists in cart, if so increase quantity, else add new product to cart
    cart.forEach((cartProd)=>{
        if (productID === cartProd.id) {
            prodMatch = cartProd;
        }
        //Update cart icon Quantity
    })
    
    if(prodMatch){
        prodMatch.selectedQty += selectedQty;
    }else{
        cart.push({
            id : productID,
            selectedQty : selectedQty,
            deliveryOptID : 1
        })
    }
    //update local storage
    save2storage();
    updateCartSum();
}


//delete product from cart
export function delete4rmCart(productId){ 
    let newCart = [];
    cart.forEach((prod)=>{
        if (prod.id !== productId) {
            newCart.push(prod)
        }
    })
    cart = newCart;
    save2storage();
}

//Update cart sum
export function updateCartSum(){
    let cartSum = 0;
    cart.forEach((prody)=>{
        cartSum += Number(prody.selectedQty)
    })

    // Declare variables for DOM elements
    const cartQtyElement = document.querySelector('.js-cartQty');
    const checkoutHeaderTotalElement = document.querySelector('.js-checkout-header-total');
    const orderSumElement = document.querySelector('.js-order-sum');

    if(!cartSum){
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
    }else{
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

}

export function updateProdQuantity (prodId, upDateBy){
    cart.forEach((prod)=>{
        if(prod.id === prodId){
            prod.selectedQty = upDateBy;
            
        }
    })
    save2storage();
    updateCartSum();
}

// Unsure if this function isnt already there 

export function updateDeliveryOpt(prodId, deliveryOptID){
    cart.forEach((prod)=>{
        if(prod.id === prodId){
            prod.deliveryOptID = deliveryOptID;
        }
    })
    save2storage();
    updateCartSum();
}
