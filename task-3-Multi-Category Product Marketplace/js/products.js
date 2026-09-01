/**
 * products.js
 * ------------------------------------------------------
 * Owns everything about the product catalog itself:
 * loading it from JSON, and the pure functions that
 * search / filter / sort an array of products.
 *
 * Nothing in this file touches the DOM. app.js is
 * responsible for rendering; this file just hands back
 * plain arrays so the logic stays easy to test and reuse.
 * ------------------------------------------------------
 */

const ProductCatalog = (() => {
  const DATA_URL = "data/products.json";

  /**
   * Fetches the product catalog from the local JSON file.
   * Returns an array of product objects, or throws if the
   * fetch fails (the caller decides how to surface that).
   */
  async function loadProducts() {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to load product catalog (status ${response.status})`);
    }
    return response.json();
  }

  /**
   * Returns the sorted, de-duplicated list of category
   * names present in a product list.
   */
  function getCategories(products) {
    return [...new Set(products.map((p) => p.category))].sort();
  }

  /**
   * Case-insensitive search across name, description and category.
   * An empty/whitespace query returns the full list unchanged.
   */
  function searchProducts(products, query) {
    const term = query.trim().toLowerCase();
    if (!term) return products;

    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    });
  }

  /**
   * Filters by a set of allowed categories and an inclusive
   * price range. An empty `categories` set is treated as
   * "no category filter applied" (i.e. show all).
   */
  function filterProducts(products, { categories = [], minPrice = 0, maxPrice = Infinity } = {}) {
    const categorySet = new Set(categories);

    return products.filter((p) => {
      const matchesCategory = categorySet.size === 0 || categorySet.has(p.category);
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }

  /**
   * Returns a NEW sorted array (never mutates the input).
   */
  function sortProducts(products, sortKey) {
    const list = [...products];

    switch (sortKey) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case "rating-desc":
        return list.sort((a, b) => b.rating - a.rating);
      case "default":
      default:
        return list.sort((a, b) => a.id - b.id);
    }
  }

  return {
    loadProducts,
    getCategories,
    searchProducts,
    filterProducts,
    sortProducts,
  };
})();
