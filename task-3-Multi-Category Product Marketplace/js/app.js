/**
 * app.js
 * ------------------------------------------------------
 * The application layer: owns UI state (current search
 * term, selected categories, price range, sort key),
 * renders the DOM, and wires up every event listener.
 *
 * ProductCatalog (products.js) and Cart (cart.js) hold
 * the actual data logic; this file coordinates them.
 * ------------------------------------------------------
 */

document.addEventListener("DOMContentLoaded", init);

// ---- Application state -------------------------------------------------

const state = {
  allProducts: [],
  visibleProducts: [],
  searchTerm: "",
  selectedCategories: new Set(),
  minPrice: 0,
  maxPrice: 500,
  priceCeiling: 500,
  sortKey: "default",
};

// ---- Cached DOM references ----------------------------------------------

const els = {};

function cacheDom() {
  els.searchInput = document.getElementById("search-input");
  els.searchForm = document.getElementById("search-form");
  els.categoryCheckboxes = document.getElementById("category-checkboxes");
  els.priceMin = document.getElementById("price-min");
  els.priceMax = document.getElementById("price-max");
  els.priceMinValue = document.getElementById("price-min-value");
  els.priceMaxValue = document.getElementById("price-max-value");
  els.priceRangeFill = document.getElementById("price-range-fill");
  els.resetFilters = document.getElementById("reset-filters");
  els.emptyReset = document.getElementById("empty-reset");
  els.sortSelect = document.getElementById("sort-select");
  els.productGrid = document.getElementById("product-grid");
  els.emptyState = document.getElementById("empty-state");
  els.resultsCount = document.getElementById("results-count");

  els.cartToggle = document.getElementById("cart-toggle");
  els.cartCount = document.getElementById("cart-count");
  els.cartDrawer = document.getElementById("cart-drawer");
  els.drawerOverlay = document.getElementById("drawer-overlay");
  els.cartClose = document.getElementById("cart-close");
  els.cartItems = document.getElementById("cart-items");
  els.cartEmpty = document.getElementById("cart-empty");
  els.cartFooter = document.getElementById("cart-footer");
  els.cartItemCount = document.getElementById("cart-item-count");
  els.cartSubtotal = document.getElementById("cart-subtotal");
  els.checkoutBtn = document.getElementById("checkout-btn");

  els.confirmOverlay = document.getElementById("confirm-overlay");
  els.confirmModal = document.getElementById("confirm-modal");
  els.confirmClose = document.getElementById("confirm-close");
  els.confirmOrderId = document.getElementById("confirm-order-id");
}

// ---- Initialization -------------------------------------------------

async function init() {
  cacheDom();
  Cart.loadCart();
  bindStaticEvents();
  renderCart();

  try {
    state.allProducts = await ProductCatalog.loadProducts();
  } catch (err) {
    console.error(err);
    els.productGrid.innerHTML = "";
    els.emptyState.hidden = false;
    els.emptyState.querySelector("h2").textContent = "Couldn't load the catalog";
    els.emptyState.querySelector("p").textContent =
      "The product data failed to load. If you opened this file directly, try running it through a local server instead.";
    return;
  }

  const prices = state.allProducts.map((p) => p.price);
  state.priceCeiling = Math.ceil(Math.max(...prices) / 10) * 10;
  state.maxPrice = state.priceCeiling;

  buildCategoryFilters(state.allProducts);
  configurePriceSlider();
  applyFiltersAndRender();
}

// ---- Category filter UI -------------------------------------------------

function buildCategoryFilters(products) {
  const categories = ProductCatalog.getCategories(products);
  const counts = categories.reduce((acc, cat) => {
    acc[cat] = products.filter((p) => p.category === cat).length;
    return acc;
  }, {});

  els.categoryCheckboxes.innerHTML = categories
    .map((cat) => {
      const id = `cat-${cat.toLowerCase().replace(/\s+/g, "-")}`;
      return `
        <label class="filter-checkbox" for="${id}">
          <input type="checkbox" id="${id}" value="${escapeHtml(cat)}" />
          <span>${escapeHtml(cat)}</span>
          <span class="filter-checkbox__count">${counts[cat]}</span>
        </label>
      `;
    })
    .join("");

  els.categoryCheckboxes.addEventListener("change", (e) => {
    if (e.target.type !== "checkbox") return;
    if (e.target.checked) {
      state.selectedCategories.add(e.target.value);
    } else {
      state.selectedCategories.delete(e.target.value);
    }
    applyFiltersAndRender();
  });
}

// ---- Price slider -------------------------------------------------

function configurePriceSlider() {
  els.priceMin.max = state.priceCeiling;
  els.priceMax.max = state.priceCeiling;
  els.priceMax.value = state.priceCeiling;
  els.priceMinValue.textContent = state.minPrice;
  els.priceMaxValue.textContent = state.priceCeiling;
  updatePriceRangeFill();
}

function updatePriceRangeFill() {
  const ceiling = state.priceCeiling || 1;
  const minPct = (state.minPrice / ceiling) * 100;
  const maxPct = (state.maxPrice / ceiling) * 100;
  els.priceRangeFill.style.left = `${minPct}%`;
  els.priceRangeFill.style.right = `${100 - maxPct}%`;
}

function handlePriceInput() {
  let min = Number(els.priceMin.value);
  let max = Number(els.priceMax.value);

  // Keep the two handles from crossing over each other.
  if (min > max) {
    [min, max] = [max, min];
  }

  state.minPrice = min;
  state.maxPrice = max;
  els.priceMinValue.textContent = min;
  els.priceMaxValue.textContent = max;
  updatePriceRangeFill();
  applyFiltersAndRender();
}

// ---- Static event wiring -------------------------------------------------

function bindStaticEvents() {
  els.searchForm.addEventListener("submit", (e) => e.preventDefault());
  els.searchInput.addEventListener("input", (e) => {
    state.searchTerm = e.target.value;
    applyFiltersAndRender();
  });

  els.priceMin.addEventListener("input", handlePriceInput);
  els.priceMax.addEventListener("input", handlePriceInput);

  els.sortSelect.addEventListener("change", (e) => {
    state.sortKey = e.target.value;
    applyFiltersAndRender();
  });

  els.resetFilters.addEventListener("click", resetFilters);
  els.emptyReset.addEventListener("click", resetFilters);

  els.productGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".product-card__add");
    if (!btn) return;
    const productId = Number(btn.dataset.id);
    handleAddToCart(productId);
  });

  els.cartToggle.addEventListener("click", openCartDrawer);
  els.cartClose.addEventListener("click", closeCartDrawer);
  els.drawerOverlay.addEventListener("click", closeCartDrawer);

  els.cartItems.addEventListener("click", handleCartItemClick);

  els.checkoutBtn.addEventListener("click", handleCheckout);
  els.confirmClose.addEventListener("click", closeConfirmModal);
  els.confirmOverlay.addEventListener("click", closeConfirmModal);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!els.confirmModal.hidden) closeConfirmModal();
    else if (els.cartDrawer.classList.contains("is-open")) closeCartDrawer();
  });
}

function resetFilters() {
  state.searchTerm = "";
  state.selectedCategories.clear();
  state.minPrice = 0;
  state.maxPrice = state.priceCeiling;
  state.sortKey = "default";

  els.searchInput.value = "";
  els.sortSelect.value = "default";
  els.priceMin.value = 0;
  els.priceMax.value = state.priceCeiling;
  els.priceMinValue.textContent = 0;
  els.priceMaxValue.textContent = state.priceCeiling;
  updatePriceRangeFill();

  els.categoryCheckboxes
    .querySelectorAll("input[type=checkbox]")
    .forEach((cb) => (cb.checked = false));

  applyFiltersAndRender();
}

// ---- Product pipeline: search -> filter -> sort -> render ----------------

function applyFiltersAndRender() {
  let list = ProductCatalog.searchProducts(state.allProducts, state.searchTerm);
  list = ProductCatalog.filterProducts(list, {
    categories: [...state.selectedCategories],
    minPrice: state.minPrice,
    maxPrice: state.maxPrice,
  });
  list = ProductCatalog.sortProducts(list, state.sortKey);

  state.visibleProducts = list;
  renderProducts(list);
}

function renderProducts(products) {
  els.resultsCount.textContent = `Showing ${products.length} product${products.length === 1 ? "" : "s"}`;

  if (products.length === 0) {
    els.productGrid.innerHTML = "";
    els.emptyState.hidden = false;
    return;
  }

  els.emptyState.hidden = true;
  els.productGrid.innerHTML = products.map(renderProductCard).join("");
}

function formatPrice(value) {
  return `PKR ${Number(value).toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function renderProductCard(product) {
  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 5;

  let stockLineClass = "product-card__stock-line";
  let stockLineText = `${product.stock} in stock`;
  if (outOfStock) {
    stockLineClass += " product-card__stock-line--out";
    stockLineText = "Out of stock";
  } else if (lowStock) {
    stockLineClass += " product-card__stock-line--low";
    stockLineText = `Only ${product.stock} left`;
  }

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card__image-wrap">
        <span class="product-card__category">${escapeHtml(product.category)}</span>
        ${outOfStock ? '<span class="product-card__stock-flag">Sold out</span>' : ""}
        <img class="product-card__image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${escapeHtml(product.name)}</h3>
        <p class="product-card__desc">${escapeHtml(product.description)}</p>
        <div class="product-card__meta">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          <span class="product-card__rating">${starIcon()} ${product.rating.toFixed(1)}</span>
        </div>
        <span class="${stockLineClass}">${stockLineText}</span>
        <button
          type="button"
          class="product-card__add"
          data-id="${product.id}"
          ${outOfStock ? "disabled" : ""}
          aria-label="Add ${escapeHtml(product.name)} to cart"
        >
          ${outOfStock ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </article>
  `;
}

function starIcon() {
  return `<svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M10 1.5l2.6 5.5 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6L1.4 7.7l6-.7z"/></svg>`;
}

// ---- Cart interactions -------------------------------------------------

function handleAddToCart(productId) {
  const product = state.allProducts.find((p) => p.id === productId);
  if (!product) return;

  const added = Cart.addToCart(product, 1);
  renderCart();

  if (added) {
    flashCartToggle();
  }
}

function flashCartToggle() {
  els.cartToggle.style.transform = "scale(1.08)";
  setTimeout(() => {
    els.cartToggle.style.transform = "";
  }, 150);
}

function handleCartItemClick(e) {
  const increaseBtn = e.target.closest("[data-action='increase']");
  const decreaseBtn = e.target.closest("[data-action='decrease']");
  const removeBtn = e.target.closest("[data-action='remove']");

  if (increaseBtn) {
    Cart.increaseQuantity(Number(increaseBtn.dataset.id));
  } else if (decreaseBtn) {
    Cart.decreaseQuantity(Number(decreaseBtn.dataset.id));
  } else if (removeBtn) {
    Cart.removeFromCart(Number(removeBtn.dataset.id));
  } else {
    return;
  }

  renderCart();
  // Stock status (e.g. "Only 2 left") may need to update on the grid too.
  renderProducts(state.visibleProducts);
}

function renderCart() {
  const items = Cart.getItems();
  const itemCount = Cart.getItemCount();
  const subtotal = Cart.calculateCartTotal();

  els.cartCount.textContent = itemCount;

  if (items.length === 0) {
    els.cartItems.hidden = true;
    els.cartFooter.hidden = true;
    els.cartEmpty.hidden = false;
    els.cartItems.innerHTML = "";
    return;
  }

  els.cartItems.hidden = false;
  els.cartFooter.hidden = false;
  els.cartEmpty.hidden = true;

  els.cartItems.innerHTML = items.map(renderCartLine).join("");
  els.cartItemCount.textContent = itemCount;
  els.cartSubtotal.textContent = formatPrice(subtotal);
}

function renderCartLine(item) {
  const lineTotal = (item.price * item.quantity).toFixed(2);
  const atStockLimit = item.quantity >= item.stock;

  return `
    <div class="cart-line" data-id="${item.id}">
      <div class="cart-line__image">
        <img src="${escapeHtml(item.image)}" alt="" />
      </div>
      <div class="cart-line__info">
        <span class="cart-line__name">${escapeHtml(item.name)}</span>
        <span class="cart-line__unit-price">${formatPrice(item.price)} each</span>
        <div class="cart-line__qty">
          <button type="button" class="cart-line__qty-btn" data-action="decrease" data-id="${item.id}" aria-label="Decrease quantity of ${escapeHtml(item.name)}">−</button>
          <span class="cart-line__qty-value" aria-live="polite">${item.quantity}</span>
          <button type="button" class="cart-line__qty-btn" data-action="increase" data-id="${item.id}" aria-label="Increase quantity of ${escapeHtml(item.name)}" ${atStockLimit ? "disabled" : ""}>+</button>
        </div>
      </div>
      <div class="cart-line__end">
        <span class="cart-line__total">${formatPrice(lineTotal)}</span>
        <button type="button" class="cart-line__remove" data-action="remove" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `;
}

// ---- Cart drawer open/close -------------------------------------------------

function openCartDrawer() {
  els.cartDrawer.hidden = false;
  els.drawerOverlay.hidden = false;
  // Force layout before adding the transition classes.
  requestAnimationFrame(() => {
    els.cartDrawer.classList.add("is-open");
    els.drawerOverlay.classList.add("is-visible");
  });
  els.cartToggle.setAttribute("aria-expanded", "true");
  els.cartClose.focus();
}

function closeCartDrawer() {
  els.cartDrawer.classList.remove("is-open");
  els.drawerOverlay.classList.remove("is-visible");
  els.cartToggle.setAttribute("aria-expanded", "false");
  setTimeout(() => {
    els.cartDrawer.hidden = true;
    els.drawerOverlay.hidden = true;
  }, 240);
  els.cartToggle.focus();
}

// ---- Checkout -------------------------------------------------

function handleCheckout() {
  if (Cart.getItems().length === 0) return;

  const orderId = generateOrderId();
  Cart.clearCart();
  renderCart();
  renderProducts(state.visibleProducts);
  closeCartDrawer();
  openConfirmModal(orderId);
}

function generateOrderId() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  return `MH-${stamp}`;
}

function openConfirmModal(orderId) {
  els.confirmOrderId.textContent = orderId;
  els.confirmOverlay.hidden = false;
  els.confirmModal.hidden = false;
  requestAnimationFrame(() => {
    els.confirmOverlay.classList.add("is-visible");
    els.confirmModal.classList.add("is-open");
  });
  els.confirmClose.focus();
}

function closeConfirmModal() {
  els.confirmOverlay.classList.remove("is-visible");
  els.confirmModal.classList.remove("is-open");
  setTimeout(() => {
    els.confirmOverlay.hidden = true;
    els.confirmModal.hidden = true;
  }, 240);
}

// ---- Utilities -------------------------------------------------

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}
