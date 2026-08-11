const {
    calculatePrice,
    applyDiscount,
    makeReceipt
} = require('./sariSariStore');

const item = "Lucky Me Pancit Canton";
const price = 30;
const quantity = 5;

const subtotal = calculatePrice(price, quantity);
const total = applyDiscount(subtotal, 10);

console.log(makeReceipt(item, quantity, total));