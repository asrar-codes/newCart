let containerDOM = document.querySelector(".container");
let bagBtn = document.querySelector(".bag-btn");
let cartContainerDOM = document.querySelector(".cart-container");
let cartItemContainerDOM = document.querySelector(".cartItem-container");
let cartFooterDOM = document.querySelector(".cart-footer");
let noCartItemsDOM = document.querySelector(".no-cart-items");

let PRODUCTS = getLocalProducts();
// console.log(PRODUCTS == null);
if (PRODUCTS == null) {
  PRODUCTS = await import("./data.js");
  // console.log([...PRODUCTS.menu]);
  PRODUCTS = [...PRODUCTS.menu];
  localStorage.setItem("products", JSON.stringify(PRODUCTS));
  PRODUCTS = getLocalProducts();
}
let cart = localStorage.getItem("cart");
if (cart === null) {
  cart = [];
} else {
  cart = JSON.parse(localStorage.getItem("cart"));
}
displayCart(cart);
localStorage.setItem("cart", JSON.stringify(cart));

// let products = getLocalProducts();
// console.log(products);
// console.log(PRODUCTS);
displayMenu(PRODUCTS);
// window.addEventListener("DOMContentLoaded", () => {
// console.log(products);

// });

function displayMenu(menu) {
  let html = menu
    .map((item) => {
      // console.log(item);
      const { id, title, desc, img, price, disabled } = item;
      return `  <section class="item">
  
   <div class="img-container">
    <img src="${img}" alt="${title}">
   </div>
   <div class="details">
    <div>
  
     <h2>${title}</h2>
     <h2>${price}</h2>
    </div>
    <button ${disabled && "disabled"} data-id=${id} class="add-cart-btn ${
        disabled ? "disabled" : ""
      }"> ${disabled ? "in cart" : "add to cart"}</button>
   </div>
  </section>`;
    })
    .join("");

  containerDOM.innerHTML = html;
  let addToCartBtn = [...document.querySelectorAll(".add-cart-btn")];
  addToCartBtn.forEach((btn) => {
    // console.log(btn);
    btn.addEventListener("click", addToCart);
  });
}

function addToCart(e) {
  let id = parseFloat(e.target.dataset.id);
  cart = getLocalCart();
  console.log(cart);
  let tempProducts = getLocalProducts();

  let tempCart = tempProducts.filter((item) => item.id === id);
  // console.log(tempCart);
  tempCart = tempCart.map((item) => {
    // console.log({ ...item, disabled: true });
    return { ...item, disabled: true };
  });
  console.log(tempCart);
  let newCart = [...cart, ...tempCart];

  // console.log(newCart);

  setLocalCart(newCart);
  let dCart = getLocalCart();
  displayCart(dCart);

  // console.log(tempProducts);
  console.log(tempCart);
  let newProducts = tempProducts.map((product) => {
    let asrar;
    if (product.id === id) {
      asrar = { ...product, disabled: true };
      return asrar;
    }
    // console.log({ ...products });
    return { ...product, ...asrar };
  });
  // newProducts = [...tempCart, ...newProducts];
  // console.log(newProducts);
  setLocalProducts(newProducts);
  let products = getLocalProducts();
  displayMenu(products);
}

function displayCart(cart) {
  console.log(cart.length);
  if (cart.length === 0) {
    noCartItemsDOM.innerHTML = `No item to show `;
    cartFooterDOM.style.visibility = "hidden";
  }
  noCartItemsDOM.textContent = "";
  cartFooterDOM.visibility = "visible";
  let html = cart
    .map((cartItem) => {
      const { id, title, desc, img, price, amount } = cartItem;
      return `
          <section class="cart-item">
      <section class="left">

        <div class="cart-img-container">
          <img src="${img}" alt="${title}">
        </div>
        <div class="name">

          <p>${title}</p>
          <p>$${price}</p>
          <button data-id=${id} class="remove-btn">Remove</button>
        </div>
      </section>
      <section class="right">

        <div class="cart-btn-container">
          <button class="cart-btn up-btn"><i class="fa-solid fa-chevron-up"></i></button>
          <div class="amount">${amount}</div>
          <button class="cart-btn down-btn"><i class="fa-solid fa-chevron-up"></i></button>
        </div>
      </section>

    </section>

      
      `;
    })
    .join("");

  cartItemContainerDOM.innerHTML = html;

  let removeBtn = [...cartItemContainerDOM.querySelectorAll(".remove-btn")];
  removeBtn.forEach((btn) => {
    // console.log(btn);
    btn.addEventListener("click", remove);
  });
}
function remove(e) {
  // console.log(e.target.dataset.id);
  const id = parseFloat(e.target.dataset.id);
  let cart = getLocalCart();
  let removedElem = cart.filter((cartItem) => cartItem.id === id);
  removedElem = removedElem.map((item) => {
    return { ...item, disabled: false };
  });

  console.log(removedElem);
  let products = getLocalProducts();
  console.log(products);
  let updatedProducts = products.map((item) => {
    let asrar;
    if (item.id === id) {
      asrar = { ...item, disabled: false };
      return asrar;
    }
    // console.log(item);
    return { ...item, ...asrar };
  });
  console.log(updatedProducts);
  setLocalProducts(updatedProducts);
  cart = cart.filter((cartItem) => cartItem.id !== id);
  setLocalCart(cart);
  displayCart(cart);
  displayMenu(updatedProducts);
}
// <<=========<< Cart Toggle funcionality >>==========>>
let cartBtnShow = document.querySelector(".close-cart-btn");
// console.log(cartBtnShow);

cartBtnShow.addEventListener("click", (e) => {
  // console.log(e.target);
  cartContainerDOM.classList.toggle("hide-cart");
});
bagBtn.addEventListener("click", (e) => {
  // console.log(e.target);
  cartContainerDOM.classList.toggle("hide-cart");
});
// <<=========<< Local Storge >>==========>>
function getLocalCart() {
  let newCart = JSON.parse(localStorage.getItem("cart"));
  return newCart;
}
function setLocalCart(cart) {
  let newCart = localStorage.setItem("cart", JSON.stringify(cart));
  return newCart;
}
function getLocalProducts() {
  let newProducts = JSON.parse(localStorage.getItem("products"));
  return newProducts;
}
function setLocalProducts(products) {
  let newProducts = localStorage.setItem("products", JSON.stringify(products));
  return newProducts;
}

function showHide(cart) {}
