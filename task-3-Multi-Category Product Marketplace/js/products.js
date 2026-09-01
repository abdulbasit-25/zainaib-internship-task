const ProductCatalog = (() => {
  const DATA_URL = "data/products.json";

  async function loadProducts() {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to load product catalog (status ${response.status})`,
      );
    }
    return response.json();
  }

  function getCategories(products) {
    return [...new Set(products.map((p) => p.category))].sort();
  }

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

  function filterProducts(
    products,
    { categories = [], minPrice = 0, maxPrice = Infinity } = {},
  ) {
    const categorySet = new Set(categories);

    return products.filter((p) => {
      const matchesCategory =
        categorySet.size === 0 || categorySet.has(p.category);
      const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
  }

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
