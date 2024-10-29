import { products } from "../data/products.js";
import { cart, addTocart } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";

console.log(cart)

let productsHTML = '';

products.forEach((product)=>{
    productsHTML +=`
    <div class="product-container"> 
            <div class="product-image-container">
                <img class="product-image" src = ${product.image}>
            </div>
            
            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>
            
            <div class="product-rating-container">
                <img class="product-rating-stars" src= ${product.rating.stars}>
                <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>
            
            <div class="product-price">${formatCurrency(product.priceCents)}</div>
            
            <div class="product-quantity-container" datd>
                <select class="js-QtyPicker">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="product-spacer"></div>
            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-cart"; data-prod-id = "${product.id}" >
            Add to Cart
            </button>
        </div>`
})

document.querySelector('.js-products-grid').innerHTML = productsHTML;



export function updateQuantity(){
    //Calculate total quantity and sum
    let cartSum = 0;
    cart.forEach((cartProd)=>{
        cartSum += cartProd.qty;
    })
    
    document.querySelector('.js-cartQty').innerHTML = cartSum
}

document.querySelectorAll('.js-add-cart').forEach((button) => {
    button.addEventListener('click', () => {
        //Use data attribute to the buttons and access it through (dataset)
        let productID = button.dataset.prodId;
        addTocart(productID);
        updateQuantity();
        console.log(typeof cart)
    });
});






