/**
 * cart.js
 * ------------------------------------------------------
 * Owns the shopping cart's state and its persistence to
 * LocalStorage. The cart is stored as an array of line
 * items: { id, name, price, image, stock, quantity }.
 *
 * This module exposes a small, deliberate API so app.js
 * never has to reach into the array directly or duplicate
 * the total/quantity math in more than one place.
 * ------------------------------------------------------
 */

const Cart = (() => {
  const STORAGE_KEY = "ZAYNÉ_cart_v1";

  let items = [];

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      items = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(items)) items = [];
    } catch (err) {
      console.error("Cart: could not read saved cart, starting fresh.", err);
      items = [];
    }
    return getItems();
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error("Cart: could not save cart to LocalStorage.", err);
    }
  }

  function getItems() {
    return items.map((item) => ({ ...item }));
  }

  function findItem(productId) {
    return items.find((item) => item.id === productId);
  }

  /**
   * Adds a product to the cart, or increases its quantity
   * if it's already present. Never exceeds available stock.
   * Returns true if the item was added/incremented, false
   * if it was already at the stock limit.
   */
  function addToCart(product, quantity = 1) {
    const existing = findItem(product.id);
    const currentQty = existing ? existing.quantity : 0;
    const nextQty = Math.min(currentQty + quantity, product.stock);

    if (nextQty === currentQty) {
      return false; // already at (or above) stock limit
    }

    if (existing) {
      existing.quantity = nextQty;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        quantity: nextQty,
      });
    }

    saveCart();
    return true;
  }

  /** Removes a line item entirely, regardless of quantity. */
  function removeFromCart(productId) {
    items = items.filter((item) => item.id !== productId);
    saveCart();
  }

  /** Increases quantity by one, capped at the item's stock. */
  function increaseQuantity(productId) {
    const item = findItem(productId);
    if (!item) return;
    item.quantity = Math.min(item.quantity + 1, item.stock);
    saveCart();
  }

  /**
   * Decreases quantity by one. If quantity would drop to zero,
   * the line item is removed entirely instead.
   */
  function decreaseQuantity(productId) {
    const item = findItem(productId);
    if (!item) return;

    if (item.quantity <= 1) {
      removeFromCart(productId);
      return;
    }

    item.quantity -= 1;
    saveCart();
  }

  /** Empties the cart (used after a successful checkout). */
  function clearCart() {
    items = [];
    saveCart();
  }

  /** Total number of units across all line items (for the header badge). */
  function getItemCount() {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }

  function calculateCartTotal() {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    return Math.round(total * 100) / 100;
  }

  return {
    loadCart,
    saveCart,
    getItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getItemCount,
    calculateCartTotal,
  };
})();
