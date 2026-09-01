document.addEventListener("DOMContentLoaded", init);

const DISCOUNT_TIERS = [
  { min: 20, rate: 0.15, label: "20+ items" },
  { min: 10, rate: 0.1, label: "10\u201319 items" },
  { min: 5, rate: 0.05, label: "5\u20139 items" },
  { min: 0, rate: 0, label: "1\u20134 items" },
];

const els = {};

function cacheDom() {
  els.form = document.getElementById("calculatorForm");
  els.productName = document.getElementById("productName");
  els.unitPrice = document.getElementById("unitPrice");
  els.quantity = document.getElementById("quantity");
  els.taxRate = document.getElementById("taxRate");

  els.productNameError = document.getElementById("productNameError");
  els.unitPriceError = document.getElementById("unitPriceError");
  els.quantityError = document.getElementById("quantityError");
  els.taxRateError = document.getElementById("taxRateError");

  els.subtotalValue = document.getElementById("subtotalValue");
  els.discountValue = document.getElementById("discountValue");
  els.discountTierValue = document.getElementById("discountTierValue");
  els.afterDiscountValue = document.getElementById("afterDiscountValue");
  els.taxValue = document.getElementById("taxValue");
  els.taxRateLabel = document.getElementById("taxRateLabel");
  els.finalTotalValue = document.getElementById("finalTotalValue");
  els.discountRow = document.getElementById("discountRow");

  els.resetBtn = document.getElementById("resetBtn");
}

function init() {
  cacheDom();
  bindEvents();
  calculate();
}

function bindEvents() {
  els.form.addEventListener("input", calculate);
  els.resetBtn.addEventListener("click", handleReset);
}

function getTierForQuantity(quantity) {
  return DISCOUNT_TIERS.find((tier) => quantity >= tier.min);
}

function formatCurrency(amount) {
  const sign = amount < 0 ? "\u2212" : "";
  return `${sign}PKR ${Math.abs(amount).toFixed(2)}`;
}

function validate({ productName, unitPrice, quantity, taxRate }) {
  const errors = {};

  if (!productName.trim()) {
    errors.productName = "Enter a product or service name.";
  }
  if (Number.isNaN(unitPrice) || unitPrice < 0) {
    errors.unitPrice = "Enter a unit price of 0 or more.";
  }
  if (Number.isNaN(quantity) || quantity < 0) {
    errors.quantity = "Enter a quantity of 0 or more.";
  }
  if (Number.isNaN(taxRate) || taxRate < 0 || taxRate > 100) {
    errors.taxRate = "Enter a tax rate between 0 and 100.";
  }

  return errors;
}

function showFieldError(inputEl, errorEl, message) {
  if (message) {
    inputEl.classList.add("error");
    errorEl.textContent = message;
    errorEl.classList.add("show");
  } else {
    inputEl.classList.remove("error");
    errorEl.textContent = "";
    errorEl.classList.remove("show");
  }
}

function calculate() {
  const productName = els.productName.value;
  const unitPrice = parseFloat(els.unitPrice.value);
  const quantity = parseInt(els.quantity.value, 10);
  const taxRate = parseFloat(els.taxRate.value);

  const errors = validate({ productName, unitPrice, quantity, taxRate });

  showFieldError(els.productName, els.productNameError, errors.productName);
  showFieldError(els.unitPrice, els.unitPriceError, errors.unitPrice);
  showFieldError(els.quantity, els.quantityError, errors.quantity);
  showFieldError(els.taxRate, els.taxRateError, errors.taxRate);

  if (Object.keys(errors).length > 0) {
    return;
  }

  const subtotal = unitPrice * quantity;
  const tier = getTierForQuantity(quantity);
  const discountAmount = subtotal * tier.rate;
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = afterDiscount * (taxRate / 100);
  const finalTotal = afterDiscount + taxAmount;

  els.subtotalValue.textContent = formatCurrency(subtotal);

  els.discountRow.hidden = tier.rate === 0;
  els.discountValue.textContent = formatCurrency(-discountAmount);
  els.discountTierValue.textContent = `${tier.label} \u00b7 ${(tier.rate * 100).toFixed(0)}%`;

  els.afterDiscountValue.textContent = formatCurrency(afterDiscount);

  els.taxRateLabel.textContent = `${taxRate}%`;
  els.taxValue.textContent = `+PKR ${taxAmount.toFixed(2)}`;

  els.finalTotalValue.textContent = formatCurrency(finalTotal);
}

function handleReset() {
  window.requestAnimationFrame(() => {
    els.form.reset();
    ["productName", "unitPrice", "quantity", "taxRate"].forEach((key) => {
      showFieldError(els[key], els[`${key}Error`], "");
    });
    calculate();
  });
}
