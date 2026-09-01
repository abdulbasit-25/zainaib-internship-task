# Professional Pricing Calculator

A fully responsive, single-page interactive pricing calculator built with **HTML5, CSS3, and Vanilla JavaScript**. No frameworks or external dependencies required.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow)

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Calculation Logic](#calculation-logic)
- [Installation & Usage](#installation--usage)
- [Testing Scenarios](#testing-scenarios)
- [Responsive Design](#responsive-design)
- [Browser Compatibility](#browser-compatibility)
- [Code Quality](#code-quality)
- [Future Enhancements](#future-enhancements)

---

## ✨ Features

### Core Functionality

- ✅ **Dynamic Input Handling**: Real-time calculations as users type
- ✅ **Automatic Volume Discounts**: 4-tier discount system based on quantity
- ✅ **Tax Calculation**: Configurable tax rates
- ✅ **Validation**: Comprehensive input validation with user-friendly error messages
- ✅ **Reset Functionality**: One-click reset to initial state
- ✅ **Professional Design**: Modern, polished UI with smooth animations

### Technical Highlights

- 🎨 **CSS Grid & Flexbox**: Fully responsive layout
- 📱 **Mobile-First**: Optimized for desktop, tablet, and mobile
- ⚡ **Performance**: Zero external dependencies, instant calculations
- ♿ **Accessibility**: Semantic HTML, focus states, ARIA-friendly
- 🔒 **Robust Validation**: Handles edge cases and invalid inputs gracefully
- 💾 **No Page Reload**: Single-page application with instant UI updates

---

## 📁 Project Structure

```
pricing-calculator/
├── index.html           # Semantic HTML5 structure
├── css/
│   └── style.css       # Professional styling with CSS variables
└── js/
    └── script.js       # Pure JavaScript calculation logic
```

### File Sizes

- **index.html**: ~8 KB
- **css/style.css**: ~15 KB
- **js/script.js**: ~12 KB
- **Total**: ~35 KB (Optimized)

---

## 🧮 How It Works

### Architecture Overview

```
User Input
    ↓
Form Validation
    ↓
Calculate Subtotal (Price × Quantity)
    ↓
Determine Discount Tier (Based on Quantity)
    ↓
Apply Discount
    ↓
Calculate Tax (On Discounted Amount)
    ↓
Calculate Final Total
    ↓
Update DOM Display
```

### Data Flow

1. **User enters data** → Product name, unit price, quantity, tax rate
2. **Validation layer** → Checks for empty fields, negative numbers, invalid input
3. **Calculation engine** → Performs all arithmetic operations
4. **Display update** → DOM elements update with formatted results
5. **No page reload** → Instantaneous user feedback

---

## 💰 Calculation Logic

### 1. Subtotal Calculation

```javascript
subtotal = unitPrice × quantity
```

**Example**: $100 × 5 units = $500

### 2. Volume Discount System

The calculator applies **automatic volume discounts** based on quantity:

| Quantity Range | Discount Rate | Notes                 |
| -------------- | ------------- | --------------------- |
| 1–4 items      | 0%            | No discount           |
| 5–9 items      | 5%            | Bulk incentive starts |
| 10–19 items    | 10%           | Better value          |
| 20+ items      | 15%           | Maximum discount      |

**Example Breakdown (5 units at $100/unit with 8% tax):**

```
Subtotal:           $500.00
Discount Tier:      5-9 items → 5%
Discount Amount:    -$25.00
After Discount:     $475.00
Tax (8%):           +$38.00
Final Total:        $513.00
```

### 3. Discount Amount

```javascript
discountAmount = subtotal × discountRate
```

**Example**: $500 × 0.05 = $25.00

### 4. After-Discount Total

```javascript
afterDiscountTotal = subtotal - discountAmount;
```

**Example**: $500 - $25 = $475.00

### 5. Tax Calculation

```javascript
taxAmount = afterDiscountTotal × (taxRate / 100)
```

**Example**: $475 × 0.08 = $38.00

### 6. Final Total

```javascript
finalTotal = afterDiscountTotal + taxAmount;
```

**Example**: $475 + $38 = $513.00

---

## 🔍 DOM Updates

The calculator updates the following DOM elements in real-time:

```javascript
// Display Elements
subtotalDisplay.textContent = formatCurrency(subtotal);
discountDisplay.textContent = `${discountPercent}% ($25.00)`;
afterDiscountDisplay.textContent = formatCurrency(afterDiscount);
taxDisplay.textContent = formatCurrency(taxAmount);
finalTotalDisplay.textContent = formatCurrency(finalTotal);
discountTierDisplay.textContent = tierDescription;
```

**Performance**: All DOM updates are batched and occur only when values change, ensuring optimal performance.

---

## ✔️ Validation System

### Input Validation Rules

| Input            | Rules                                 |
| ---------------- | ------------------------------------- |
| **Product Name** | Required, 2-100 characters            |
| **Unit Price**   | Required, positive, ≤ $999,999        |
| **Quantity**     | Required, positive integer, ≤ 999,999 |
| **Tax Rate**     | Required, 0-100%                      |

### Error Handling

```javascript
function validateUnitPrice(priceStr) {
  const price = parseFloat(priceStr);

  if (isNaN(price)) return { isValid: false, error: "Must be a valid number" };
  if (price < 0) return { isValid: false, error: "Cannot be negative" };
  if (price === 0) return { isValid: false, error: "Must be greater than 0" };
  if (price > 999999) return { isValid: false, error: "Price is too large" };

  return { isValid: true, value: price };
}
```

### User Feedback

- ✅ **Real-time validation** on blur and input events
- ✅ **Visual error indicators** (red border + error text)
- ✅ **Shake animation** on error for attention
- ✅ **Clear error messages** (not technical jargon)

---

## 🚀 Installation & Usage

### Method 1: Direct File Opening (Easiest)

1. **Navigate to project folder**:

   ```bash
   cd task-2-pricing-calculator
   ```

2. **Open in browser**:
   - **Windows**: Double-click `index.html`
   - **macOS**: Right-click → Open With → Choose Browser
   - **Linux**: `xdg-open index.html` or open with your browser

### Method 2: Using Live Server (VS Code)

1. **Install Live Server Extension** (if not installed)
2. **Right-click on `index.html`** → Select "Open with Live Server"
3. **Browser opens automatically** with hot-reload enabled

### Method 3: Using Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then visit: `http://localhost:8000`

### Method 4: Using Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Run in project directory
http-server

# Visit: http://localhost:8080
```

---

## 🧪 Testing Scenarios

### Test Case 1: Basic Calculation (No Discount)

```
Input: Price=$100, Quantity=2, Tax=8%
Expected:
  Subtotal: $200.00
  Discount: No discount (0%)
  After Discount: $200.00
  Tax: $16.00
  Final Total: $216.00
```

### Test Case 2: 5% Discount Tier

```
Input: Price=$100, Quantity=5, Tax=8%
Expected:
  Subtotal: $500.00
  Discount: 5% ($25.00)
  After Discount: $475.00
  Tax: $38.00
  Final Total: $513.00
```

### Test Case 3: 10% Discount Tier

```
Input: Price=$100, Quantity=15, Tax=8%
Expected:
  Subtotal: $1,500.00
  Discount: 10% ($150.00)
  After Discount: $1,350.00
  Tax: $108.00
  Final Total: $1,458.00
```

### Test Case 4: Maximum 15% Discount Tier

```
Input: Price=$100, Quantity=20, Tax=8%
Expected:
  Subtotal: $2,000.00
  Discount: 15% ($300.00)
  After Discount: $1,700.00
  Tax: $136.00
  Final Total: $1,836.00
```

### Test Case 5: Zero Tax Rate

```
Input: Price=$50, Quantity=10, Tax=0%
Expected:
  Subtotal: $500.00
  Discount: 10% ($50.00)
  After Discount: $450.00
  Tax: $0.00
  Final Total: $450.00
```

### Test Case 6: High Tax Rate

```
Input: Price=$100, Quantity=5, Tax=25%
Expected:
  Subtotal: $500.00
  Discount: 5% ($25.00)
  After Discount: $475.00
  Tax: $118.75
  Final Total: $593.75
```

### Test Case 7: Validation - Empty Fields

```
Input: Empty product name
Expected: Error message displayed, calculation prevented
```

### Test Case 8: Validation - Negative Number

```
Input: Price=-50
Expected: Error message, calculation prevented
```

### Test Case 9: Validation - Zero Quantity

```
Input: Quantity=0
Expected: Error message displayed
```

### Test Case 10: Reset Functionality

```
Steps:
  1. Enter: Price=$100, Quantity=5
  2. Click "Reset Calculator"
Expected:
  - All fields cleared
  - All errors removed
  - Display shows $0.00
  - Input focus returns to first field
```

---

## 📱 Responsive Design

### Breakpoints

| Device           | Width          | Layout                    |
| ---------------- | -------------- | ------------------------- |
| **Desktop**      | ≥ 1024px       | 2-3 columns, full spacing |
| **Tablet**       | 768px - 1023px | 2 columns, optimized      |
| **Mobile**       | < 768px        | 1 column, compact         |
| **Small Mobile** | < 480px        | Single column, minimal    |

### Mobile Features

- ✅ Touch-friendly buttons (44px minimum)
- ✅ Responsive grid layout
- ✅ Readable font sizes
- ✅ Proper spacing and padding
- ✅ No horizontal scroll
- ✅ Accessible form controls

---

## 🌐 Browser Compatibility

| Browser         | Support          | Notes                    |
| --------------- | ---------------- | ------------------------ |
| **Chrome/Edge** | ✅ Full          | Latest versions          |
| **Firefox**     | ✅ Full          | Latest versions          |
| **Safari**      | ✅ Full          | macOS & iOS              |
| **Opera**       | ✅ Full          | Latest version           |
| **IE 11**       | ❌ Not supported | Modern JS not compatible |

### Tested On:

- Windows 10/11
- macOS (M1/Intel)
- iOS Safari 15+
- Android Chrome

---

## 💻 Code Quality

### JavaScript Best Practices

✅ **Meaningful variable names**

```javascript
const discountAmount = calculateDiscount(subtotal, discountRate);
```

✅ **Reusable functions**

```javascript
function formatCurrency(value) {
  /* ... */
}
function calculateDiscount(subtotal, rate) {
  /* ... */
}
```

✅ **Modular logic** - Functions handle single responsibilities

✅ **Comments only where necessary** - Code is self-documenting

✅ **No inline JavaScript** - All JS in separate file

✅ **DRY principle** - No code duplication

✅ **Error handling** - Comprehensive validation

### CSS Best Practices

✅ **CSS Variables** - Centralized color and spacing system

```css
:root {
  --primary-color: #2563eb;
  --spacing-lg: 2rem;
}
```

✅ **Semantic selectors** - Clear naming conventions

✅ **Mobile-first approach** - Base styles mobile, enhance for larger screens

✅ **Accessibility** - Focus states, ARIA labels, color contrast

✅ **Performance** - Minimal repaints, optimized animations

### HTML Best Practices

✅ **Semantic tags** - `<header>`, `<main>`, `<section>`, `<footer>`

✅ **Proper form structure** - Labels linked to inputs

✅ **Accessibility** - ARIA attributes where needed

✅ **Valid HTML5** - Passes W3C validation

---

## 🔮 Future Enhancements

### Potential Features

- 💾 **Local Storage**: Save calculation history
- 🌙 **Dark Mode**: Toggle dark/light theme
- 📊 **Export PDF**: Generate invoice
- 📈 **Chart Display**: Visualize breakdown with charts
- 🌍 **Multi-Currency**: Support different currencies
- 💬 **Keyboard Shortcuts**: Ctrl+R for reset
- 🔔 **Copy to Clipboard**: One-click copy results
- 📝 **Calculation History**: View previous calculations
- ⚙️ **Custom Discount Tiers**: User-defined brackets
- 🌐 **Internationalization**: Multiple languages

---

## 📄 License

This project is provided as-is for educational and professional portfolio purposes.

---

## 👤 Author

**Zainab** - Frontend Web Development Intern Portfolio  
Created as a demonstration of professional frontend development skills.

---

## 📞 Support

For questions or issues, please review the code comments or test with the provided test cases.

---

## 🎓 Learning Outcomes

By studying this project, you'll learn:

- **HTML5**: Semantic structure and forms
- **CSS3**: Variables, Grid, Flexbox, Animations, Responsive Design
- **JavaScript**: Functions, Validation, DOM Manipulation, Event Handling
- **Best Practices**: Code organization, comments, error handling
- **UX/UI**: Form design, error messages, accessibility

---

**Last Updated**: 2026-09-01  
**Status**: ✅ Production Ready
