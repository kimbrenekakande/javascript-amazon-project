import { products, loadProducts, loadProductsFetch } from "../data/products.js";
import { cart, addTocart, updateCartSum} from "../data/cart.js";
import "/data/products.js"


loadProducts(renderProductGrid);
loadProductsFetch();

function renderProductGrid() {
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
                <img class="product-rating-stars" src= ${product.getStars()}>
                <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>
            
            <div class="product-price">${product.getPrice()}</div>
            
            <div class="product-quantity-container">
                <select class="js-QtyPicker-${product.id}">
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
            ${product.extraInfo()}
            <div class="product-spacer"></div>
            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-cart"; data-prod-id = "${product.id}" >
            Add to Cart
            </button>
        </div>`
})

document.querySelector('.js-products-grid').innerHTML = productsHTML;


document.querySelectorAll('.js-add-cart').forEach((button) => {
    let notetimer; //Declare timer variable outside the event listener

    button.addEventListener('click', () => {
        //Use data attribute to the buttons and access it through (dataset)
        let productID = button.dataset.prodId;
        addTocart(productID);

        document.querySelector(`.js-added-to-cart-${productID}`).classList.add('item-added');

        //Clear any existing timeout of this variable before setting a new one
        if (notetimer) {
            clearTimeout(notetimer)
        }
        //Set a new timeout 
        notetimer = setTimeout(()=>{
            document.querySelector(`.js-added-to-cart-${productID}`).classList.remove('item-added');
        }, 2000)
        
    });
    
});
updateCartSum();
    
}






