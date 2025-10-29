
const InventoryController = require('./controllers/inventorycontroller');

console.log('=================================');
console.log('   TESTING INVENTORY CONTROLLER');
console.log('=================================\n');

// Test 1: Get All Products
console.log('TEST 1: Get All Products');
console.log('-------------------------');
const allProducts = InventoryController.getAllProducts();
console.log('Products found:', allProducts.length);
allProducts.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - $${product.price} (Stock: ${product.stock})`);
});
console.log('\n');

// Test 2: Add New Product
console.log('TEST 2: Add New Product');
console.log('-------------------------');
console.log('Adding: Headphones - $149.99, Stock: 25');
const addResult = InventoryController.addProduct('Headphones', 149.99, 25);
console.log('Result:', addResult.message);
console.log('Success:', addResult.success);
console.log('\n');

// Test 3: Search Product (exists)
console.log('TEST 3: Search Product (exists)');
console.log('-------------------------');
console.log('Searching for: "mouse"');
const foundProduct = InventoryController.searchProduct('mouse');
if (foundProduct) {
    console.log('✓ Found:', foundProduct.name);
    console.log('  Price: $' + foundProduct.price);
    console.log('  Stock:', foundProduct.stock);
} else {
    console.log('✗ Product not found');
}
console.log('\n');

// Test 4: Search Product (doesn't exist)
console.log('TEST 4: Search Product (doesn\'t exist)');
console.log('-------------------------');
console.log('Searching for: "iPhone"');
const notFound = InventoryController.searchProduct('iPhone');
if (notFound) {
    console.log('✓ Found:', notFound.name);
} else {
    console.log('✗ Product not found (Expected result)');
}
console.log('\n');

// Test 5: Update Stock (successful)
console.log('TEST 5: Update Stock (successful)');
console.log('-------------------------');
console.log('Selling 2 Laptops...');
const updateResult = InventoryController.updateStock('Laptop', 2);
console.log('Success:', updateResult.success);
console.log('Message:', updateResult.message);
if (updateResult.product) {
    console.log('New stock level:', updateResult.product.stock);
}
console.log('\n');

// Test 6: Update Stock (insufficient stock)
console.log('TEST 6: Update Stock (insufficient stock)');
console.log('-------------------------');
console.log('Trying to sell 100 Keyboards (only 3 in stock)...');
const insufficientResult = InventoryController.updateStock('Keyboard', 100);
console.log('Success:', insufficientResult.success);
console.log('Message:', insufficientResult.message);
console.log('\n');

// Test 7: Update Stock (product not found)
console.log('TEST 7: Update Stock (product not found)');
console.log('-------------------------');
console.log('Trying to sell "iPad" (doesn\'t exist)...');
const notFoundResult = InventoryController.updateStock('iPad', 5);
console.log('Success:', notFoundResult.success);
console.log('Message:', notFoundResult.message);
console.log('\n');

// Test 8: Get Low Stock (default threshold = 5)
console.log('TEST 8: Get Low Stock (threshold = 5)');
console.log('-------------------------');
const lowStock = InventoryController.getLowStock();
if (lowStock.length > 0) {
    console.log(`⚠️  ${lowStock.length} product(s) with low stock:`);
    lowStock.forEach(product => {
        console.log(`   - ${product.name}: ${product.stock} units left`);
    });
} else {
    console.log('✓ All products have sufficient stock');
}
console.log('\n');

// Test 9: Get Low Stock (custom threshold = 10)
console.log('TEST 9: Get Low Stock (threshold = 10)');
console.log('-------------------------');
const lowStock10 = InventoryController.getLowStock(10);
if (lowStock10.length > 0) {
    console.log(`⚠️  ${lowStock10.length} product(s) with stock below 10:`);
    lowStock10.forEach(product => {
        console.log(`   - ${product.name}: ${product.stock} units left`);
    });
} else {
    console.log('✓ All products have stock above 10');
}
console.log('\n');

// Test 10: View Final Product List
console.log('TEST 10: Final Product List');
console.log('-------------------------');
const finalProducts = InventoryController.getAllProducts();
console.log('Total products:', finalProducts.length);
finalProducts.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - $${product.price} (Stock: ${product.stock})`);
});
console.log('\n');

console.log('=================================');
console.log('   ALL TESTS COMPLETED!');
console.log('=================================');