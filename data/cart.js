export let cart = localStorage.getItem('cart');
!cart ?  cart = [] : cart = JSON.parse(cart);


export function addTocart(productID){
    let prodMatch;
        
    //Check if product already exists in cart, if so increase quantity, else add new product to cart
    cart.forEach((cartProd)=>{
        if (productID === cartProd.id) {
            prodMatch = cartProd;
        }
    })
    
    if(prodMatch){
        prodMatch.qty += 1;
    }else{
        cart.push({
            id : productID,
            qty : 1
        })
    }
    //update local storage
    
}