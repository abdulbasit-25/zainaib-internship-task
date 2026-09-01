/* ========================================
   PRICING CALCULATOR - JAVASCRIPT LOGIC
   ======================================== */

// ========================================
// DOM ELEMENTS
// ========================================

const form = document.getElementById("calculatorForm");
const productNameInput = document.getElementById("productName");
const unitPriceInput = document.getElementById("unitPrice");
const quantityInput = document.getElementById("quantity");
const taxRateInput = document.getElementById("taxRate");
const resetBtn = document.getElementById("resetBtn");

// Display Elements
const subtotalDisplay = document.getElementById("subtotalValue");
const discountDisplay = document.getElementById("discountValue");
const afterDiscountDisplay = document.getElementById("afterDiscountValue");
const taxDisplay = document.getElementById("taxValue");
const finalTotalDisplay = document.getElementById("finalTotalValue");
const discountTierDisplay = document.getElementById("discountTierValue");

// Error Message Elements
const productNameError = document.getElementById("productNameError");
const unitPriceError = document.getElementById("unitPriceError");
const quantityError = document.getElementById("quantityError");
const taxRateError = document.getElementById("taxRateError");

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format number as currency (USD)
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Round to 2 decimal places for monetary calculations
 * @param {number} value - The value to round
 * @returns {number} Rounded value
 */
function roundToTwoDecimals(value) {
  return Math.round(value * 100) / 100;
}

/**
 * Clear all error messages and styles
 */
function clearAllErrors() {
  const inputs = [
    productNameInput,
    unitPriceInput,
    quantityInput,
    taxRateInput,
  ];
  const errorMessages = [
    productNameError,
    unitPriceError,
    quantityError,
    taxRateError,
  ];

  inputs.forEach((input) => {
    input.classList.remove("error");
  });

  errorMessages.forEach((error) => {
    error.textContent = "";
    error.classList.remove("show");
  });
}

/**
 * Display validation error for a specific input
 * @param {HTMLElement} inputElement - The input element
 * @param {HTMLElement} errorElement - The error message element
 * @param {string} message - The error message to display
 */
function showError(inputElement, errorElement, message) {
  inputElement.classList.add("error");
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

// ========================================
// DISCOUNT CALCULATION FUNCTIONS
// ========================================

/**
 * Calculate discount rate based on quantity
 * Volume discount tiers:
 * - 1-4 items: 0%
 * - 5-9 items: 5%
 * - 10-19 items: 10%
 * - 20+ items: 15%
 *
 * @param {number} quantity - The quantity of items
 * @returns {number} Discount rate as decimal (e.g., 0.05 for 5%)
 */
function calculateDiscountRate(quantity) {
  if (quantity >= 20) {
    return 0.15;
  } else if (quantity >= 10) {
    return 0.1;
  } else if (quantity >= 5) {
    return 0.05;
  }
  return 0;
}

/**
 * Get discount tier description
 * @param {number} quantity - The quantity of items
 * @returns {string} Tier description
 */
function getDiscountTierDescription(quantity) {
  if (quantity >= 20) {
    return "20+ Items: 15%";
  } else if (quantity >= 10) {
    return "10-19 Items: 10%";
  } else if (quantity >= 5) {
    return "5-9 Items: 5%";
  }
  return "1-4 Items: 0%";
}

/**
 * Calculate discount amount
 * @param {number} subtotal - The subtotal before discount
 * @param {number} discountRate - The discount rate as decimal
 * @returns {number} Discount amount
 */
function calculateDiscount(subtotal, discountRate) {
  return roundToTwoDecimals(subtotal * discountRate);
}

// ========================================
// TAX CALCULATION FUNCTIONS
// ========================================

/**
 * Calculate tax amount
 * @param {number} amount - The amount after discount
 * @param {number} taxRate - The tax rate as percentage (e.g., 8 for 8%)
 * @returns {number} Tax amount
 */
function calculateTax(amount, taxRate) {
  const taxDecimal = taxRate / 100;
  return roundToTwoDecimals(amount * taxDecimal);
}

// ========================================
// VALIDATION FUNCTIONS
// ========================================

/**
 * Validate product name
 * @param {string} productName - The product name to validate
 * @returns {object} { isValid: boolean, error: string }
 */
function validateProductName(productName) {
  const trimmed = productName.trim();

  if (!trimmed) {
    return { isValid: false, error: "Product name is required" };
  }

  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: "Product name must be at least 2 characters",
    };
  }

  if (trimmed.length > 100) {
    return {
      isValid: false,
      error: "Product name cannot exceed 100 characters",
    };
  }

  return { isValid: true, error: "" };
}

/**
 * Validate unit price
 * @param {string} priceStr - The price as string
 * @returns {object} { isValid: boolean, error: string, value: number }
 */
function validateUnitPrice(priceStr) {
  const price = parseFloat(priceStr);

  if (isNaN(price)) {
    return { isValid: false, error: "Price must be a valid number" };
  }

  if (price < 0) {
    return { isValid: false, error: "Price cannot be negative" };
  }

  if (price === 0) {
    return { isValid: false, error: "Price must be greater than 0" };
  }

  if (price > 999999) {
    return { isValid: false, error: "Price is too large" };
  }

  return { isValid: true, error: "", value: price };
}

/**
 * Validate quantity
 * @param {string} quantityStr - The quantity as string
 * @returns {object} { isValid: boolean, error: string, value: number }
 */
function validateQuantity(quantityStr) {
  const quantity = parseInt(quantityStr, 10);

  if (isNaN(quantity)) {
    return { isValid: false, error: "Quantity must be a valid number" };
  }

  if (quantity < 1) {
    return { isValid: false, error: "Quantity must be at least 1" };
  }

  if (quantity > 999999) {
    return { isValid: false, error: "Quantity is too large" };
  }

  return { isValid: true, error: "", value: quantity };
}

/**
 * Validate tax rate
 * @param {string} rateStr - The tax rate as string
 * @returns {object} { isValid: boolean, error: string, value: number }
 */
function validateTaxRate(rateStr) {
  const rate = parseFloat(rateStr);

  if (isNaN(rate)) {
    return { isValid: false, error: "Tax rate must be a valid number" };
  }

  if (rate < 0) {
    return { isValid: false, error: "Tax rate cannot be negative" };
  }

  if (rate > 100) {
    return { isValid: false, error: "Tax rate cannot exceed 100%" };
  }

  return { isValid: true, error: "", value: rate };
}

/**
 * Validate all form inputs
 * @returns {object} { isValid: boolean, data: object }
 */
function validateForm() {
  clearAllErrors();

  // Validate product name
  const productValidation = validateProductName(productNameInput.value);
  if (!productValidation.isValid) {
    showError(productNameInput, productNameError, productValidation.error);
  }

  // Validate unit price
  const priceValidation = validateUnitPrice(unitPriceInput.value);
  if (!priceValidation.isValid) {
    showError(unitPriceInput, unitPriceError, priceValidation.error);
  }

  // Validate quantity
  const quantityValidation = validateQuantity(quantityInput.value);
  if (!quantityValidation.isValid) {
    showError(quantityInput, quantityError, quantityValidation.error);
  }

  // Validate tax rate
  const taxValidation = validateTaxRate(taxRateInput.value);
  if (!taxValidation.isValid) {
    showError(taxRateInput, taxRateError, taxValidation.error);
  }

  // Check if all validations passed
  const allValid =
    productValidation.isValid &&
    priceValidation.isValid &&
    quantityValidation.isValid &&
    taxValidation.isValid;

  if (allValid) {
    return {
      isValid: true,
      data: {
        productName: productNameInput.value.trim(),
        unitPrice: priceValidation.value,
        quantity: quantityValidation.value,
        taxRate: taxValidation.value,
      },
    };
  }

  return { isValid: false, data: null };
}

// ========================================
// MAIN CALCULATION FUNCTION
// ========================================

/**
 * Perform all calculations and update the display
 */
function performCalculations() {
  // Validate form inputs
  const validation = validateForm();

  if (!validation.isValid) {
    return;
  }

  const { unitPrice, quantity, taxRate } = validation.data;

  // Calculate subtotal
  const subtotal = roundToTwoDecimals(unitPrice * quantity);

  // Calculate discount rate and amount
  const discountRate = calculateDiscountRate(quantity);
  const discountAmount = calculateDiscount(subtotal, discountRate);

  // Calculate after-discount total
  const afterDiscount = roundToTwoDecimals(subtotal - discountAmount);

  // Calculate tax
  const taxAmount = calculateTax(afterDiscount, taxRate);

  // Calculate final total
  const finalTotal = roundToTwoDecimals(afterDiscount + taxAmount);

  // Get discount tier description
  const tierDescription = getDiscountTierDescription(quantity);

  // Update display elements
  updateDisplay(
    subtotal,
    discountRate,
    discountAmount,
    afterDiscount,
    taxRate,
    taxAmount,
    finalTotal,
    tierDescription,
  );
}

// ========================================
// UPDATE DISPLAY FUNCTIONS
// ========================================

/**
 * Update all display elements with calculated values
 */
function updateDisplay(
  subtotal,
  discountRate,
  discountAmount,
  afterDiscount,
  taxRate,
  taxAmount,
  finalTotal,
  tierDescription,
) {
  const discountPercent = Math.round(discountRate * 100);

  // Update subtotal
  subtotalDisplay.textContent = formatCurrency(subtotal);

  // Update discount display
  if (discountPercent > 0) {
    discountDisplay.textContent = `${discountPercent}% (${formatCurrency(discountAmount)})`;
  } else {
    discountDisplay.textContent = "No discount";
  }

  // Update after-discount total
  afterDiscountDisplay.textContent = formatCurrency(afterDiscount);

  // Update tax display
  taxDisplay.textContent = `${formatCurrency(taxAmount)}`;

  // Update final total
  finalTotalDisplay.textContent = formatCurrency(finalTotal);

  // Update discount tier
  discountTierDisplay.textContent = tierDescription;
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
  // Input change events - trigger calculation
  [unitPriceInput, quantityInput, taxRateInput].forEach((input) => {
    input.addEventListener("input", performCalculations);
    input.addEventListener("change", performCalculations);
  });

  // Product name change
  productNameInput.addEventListener("change", performCalculations);

  // Reset button
  resetBtn.addEventListener("click", resetCalculator);

  // Form submission (prevent default)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    performCalculations();
  });

  // Real-time validation feedback on blur
  [unitPriceInput, quantityInput, taxRateInput].forEach((input) => {
    input.addEventListener("blur", performCalculations);
  });
}

/**
 * Reset calculator to initial state
 */
function resetCalculator() {
  // Reset form inputs
  form.reset();

  // Clear all error messages
  clearAllErrors();

  // Reset display values
  updateDisplay(0, 0, 0, 0, 0, 0, 0, "1-4 Items: 0%");

  // Focus on first input
  productNameInput.focus();
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize the pricing calculator on page load
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize event listeners
  initializeEventListeners();

  // Perform initial calculation with default values
  performCalculations();
});

// ========================================
// KEYBOARD ACCESSIBILITY
// ========================================

// Allow Enter key to trigger calculation instead of form submission
form.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target !== resetBtn) {
    e.preventDefault();
    performCalculations();
  }
});
