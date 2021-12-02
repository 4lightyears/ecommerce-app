const addItemToCart = (item, next) => {
  // Adds an item/product to cart

  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    var flag = false;
    for (let i of cart) {
      if (i.id === item.id) {
        i.count += 1;
        flag = true;
      }
    }
    if (flag === false) {
      item.count = 1;
      cart.push({
        ...item,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export default addItemToCart;

export const loadCart = () => {
  // Gets the cart with all it's content.

  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productId) => {
  // removes an item from the cart.

  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product.id === productId) {
        cart.splice(i, 1);
      }
      return "";
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const cartEmpty = (next) => {
  // empties the car. It clears all the contents of the cart.

  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const totalCost = () => {
  // get the total cost of all the items in the cart.
  let cart = loadCart();
  let totalAmount = 0;
  for (let item in cart) {
    totalAmount += parseFloat(cart[item].price * cart[item].count);
  }
  return totalAmount;
};

export const decreaseItemCount = (item, next) => {
  // decrement the count of item in the cart

  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    if (item.count > 1) {
      for (let i of cart) {
        if (i.id === item.id) {
          i.count -= 1;
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const totalItemsInCart = () => {
  // get the count of all the items in cart

  let cart = JSON.parse(localStorage.getItem("cart"));
  let totalItems = 0;
  for (let i of cart) {
    totalItems += i.count;
  }

  return totalItems;
};
