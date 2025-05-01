import { formatCurrency } from "../scripts/utils/money.js";


console.log('Test Suit : formatCurrency');

// Test case 1: it correctly formats integer amount
if ((formatCurrency(2095)) === '20.95') {
  console.log('Test passed: it correctly formats integer amount.');
} else {
  console.error('Test failed: it does not correctly format integer amount.');
}

// Test case 2: it correctly formats zero amount
if ((formatCurrency(0)) === '0.00') {
  console.log('Test passed: it correctly formats zero amount.');
} else {
  console.error('Test failed: it does not correctly format zero amount.');
}

// Test case 3: it correctly formats decimal amount
if ((formatCurrency(2000.5)) === '20.01') {
  console.log('Test passed: it correctly formats decimal amount.');
} else {
  console.error('Test failed: it does not correctly format decimal amount.');
}



