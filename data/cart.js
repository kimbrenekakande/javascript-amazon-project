
export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart = [
        {id: "15b6fc6f-327a-4ec4-896f-486349e85a3d", qty : 2},
        {id: "3ebe75dc-64d2-4137-8860-1f5a963e534b", qty : 8}
    ];
}


function save2storage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}


export function addTocart(productID){
    let prodMatch;
        
    //Check if product already exists in cart, if so increase quantity, else add new product to cart
    cart.forEach((cartProd)=>{
        if (productID === cartProd.id) {
            prodMatch = cartProd;
        }
        //Update cart icon Quantity
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
    save2storage();
}


//delete product from cart
export function delete4rmCart(productId){
    const newCart = [];
    cart.forEach((prod)=>{
        if (prod.id !== productId) {
            newCart.push(prod)
        }
    })
    cart = newCart;
    save2storage();
}