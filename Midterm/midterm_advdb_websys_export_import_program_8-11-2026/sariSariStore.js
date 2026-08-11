function calculatePrice(price, quantity) {
    return price * quantity;
}

function applyDiscount(total, discount) {
    return total - (total * discount / 100);
}

function makeReceipt(item, quantity, total) {
    return `Item: ${item} | Quantity: ${quantity} | Total: ₱${total}`;
}

module.exports = {
    calculatePrice,
    applyDiscount,
    makeReceipt
};