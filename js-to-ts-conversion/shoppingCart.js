
let cart = [];
let products = [
    { id: 1, name: "Laptop", price: 999.99, category: "electronics", inStock: true },
    { id: 2, name: "Book", price: 19.99, category: "education", inStock: true },
    { id: 3, name: "Headphones", price: 149.99, category: "electronics", inStock: false }
];

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.log("Product not found");
        return null;
    }
    
    if (!product.inStock) {
        console.log("Product out of stock");
        return null;
    }
    
    const existingItem = cart.find(item => item.product.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    
    return cart;
}

function removeFromCart(productId, quantity = 1) {
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    if (itemIndex === -1) {
        console.log("Item not in cart");
        return false;
    }
    
    const item = cart[itemIndex];
    if (item.quantity <= quantity) {
        cart.splice(itemIndex, 1);
    } else {
        item.quantity -= quantity;
    }
    
    return true;
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

function applyDiscount(discountPercent) {
    const total = calculateTotal();
    return total - (total * discountPercent / 100);
}

function getCartSummary() {
    console.log("Cart Summary:");
    cart.forEach(item => {
        console.log(`${item.product.name} x ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`);
    });
    console.log(`Total: $${calculateTotal().toFixed(2)}`);
}

function filterProducts(category, maxPrice) {
    return products.filter(product => {
        return (!category || product.category === category) && 
               (!maxPrice || product.price <= maxPrice);
    });
}

// Example usage
// addToCart(1, 2);
// addToCart(2, 1);
// getCartSummary();
// console.log("Discounted total:", applyDiscount(10));
// console.log("Filtered:", filterProducts("electronics", 500));