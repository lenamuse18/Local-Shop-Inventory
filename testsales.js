// test-sales.js
const SalesController = require('./controllers/salescontroller');
const InventoryController = require('./controllers/inventorycontroller');

console.log('=================================');
console.log('   TESTING SALES CONTROLLER');
console.log('=================================\n');

// Test 1: Process a successful sale
console.log('TEST 1: Process Sale (Success)');
console.log('-------------------------');
console.log('Selling 2 Mice...');
const sale1 = SalesController.processSale('Mouse', 2);
console.log('Success:', sale1.success);
console.log('Message:', sale1.message);
console.log('Total: $' + sale1.total);
console.log('Receipt:', sale1.receipt);
console.log('\n');

// Test 2: Process another sale
console.log('TEST 2: Process Another Sale');
console.log('-------------------------');
console.log('Selling 1 Laptop...');
const sale2 = SalesController.processSale('Laptop', 1);
console.log('Success:', sale2.success);
console.log('Total: $' + sale2.total);
console.log('\n');

// Test 3: Try to sell with insufficient stock
console.log('TEST 3: Insufficient Stock');
console.log('-------------------------');
console.log('Trying to sell 100 Keyboards (only 3 in stock)...');
const sale3 = SalesController.processSale('Keyboard', 100);
console.log('Success:', sale3.success);
console.log('Message:', sale3.message);
console.log('\n');

// Test 4: Try to sell non-existent product
console.log('TEST 4: Product Not Found');
console.log('-------------------------');
console.log('Trying to sell "iPhone" (doesn\'t exist)...');
const sale4 = SalesController.processSale('iPhone', 1);
console.log('Success:', sale4.success);
console.log('Message:', sale4.message);
console.log('\n');

// Test 5: Get Sales Report
console.log('TEST 5: Get Sales Report');
console.log('-------------------------');
const report = SalesController.getSalesReport();
console.log('Total Sales: $' + report.totalSales);
console.log('Total Transactions:', report.totalTransactions);
console.log('Sales Details:');
report.sales.forEach((sale, index) => {
    console.log(`  ${index + 1}. ${sale.product} x${sale.quantity} = $${sale.total}`);
});
console.log('\n');

// Test 6: Get Daily Sales
console.log('TEST 6: Get Daily Sales');
console.log('-------------------------');
const dailySales = SalesController.getDailySales();
console.log('Today\'s Sales:', dailySales.length);
dailySales.forEach((sale, index) => {
    console.log(`  ${index + 1}. ${sale.product} x${sale.quantity} = $${sale.total}`);
});
console.log('\n');

// Test 7: Get Sales By Product
console.log('TEST 7: Get Sales By Product');
console.log('-------------------------');
console.log('Searching for "Mouse" sales...');
const mouseSales = SalesController.getSalesByProduct('Mouse');
console.log('Mouse Sales Found:', mouseSales.length);
mouseSales.forEach((sale, index) => {
    console.log(`  ${index + 1}. Quantity: ${sale.quantity}, Total: $${sale.total}, Date: ${sale.date}`);
});
console.log('\n');

// Test 8: Process one more sale for testing
console.log('TEST 8: Process Final Sale');
console.log('-------------------------');
console.log('Selling 5 Mice...');
const sale5 = SalesController.processSale('Mouse', 5);
console.log('Success:', sale5.success);
console.log('Total: $' + sale5.total);
console.log('\n');

// Test 9: Final Sales Report
console.log('TEST 9: Final Sales Report');
console.log('-------------------------');
const finalReport = SalesController.getSalesReport();
console.log('Total Revenue: $' + finalReport.totalSales);
console.log('Total Transactions:', finalReport.totalTransactions);
console.log('\n');

// Test 10: Check Inventory After Sales
console.log('TEST 10: Check Updated Inventory');
console.log('-------------------------');
const products = InventoryController.getAllProducts();
products.forEach(product => {
    console.log(`${product.name}: ${product.stock} units remaining`);
});
console.log('\n');

console.log('=================================');
console.log('   ALL TESTS COMPLETED!');
console.log('=================================');