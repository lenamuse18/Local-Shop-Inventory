// views/ShopAttendantView.js
const InventoryController = require('../controllers/inventorycontroller');
const SalesController = require('../controllers/salescontroller');
const CustomerController = require('../controllers/customercontroller');

class ShopAttendantView {
  static async show(ask) {
    console.clear();
    console.log('=================================');
    console.log('   SHOP ATTENDANT PANEL');
    console.log('=================================');
    console.log('1. Process Sale');
    console.log('2. Search Product');
    console.log('3. Check Stock');
    console.log('4. Register Customer');
    console.log('5. View Today\'s Sales');
    console.log('6. Back to Main Menu');
    console.log('=================================');

    const choice = await ask('Enter your choice (1-6): ');

    switch (choice) {
      case '1':
        await this.processSale(ask);
        break;
      case '2':
        await this.searchProduct(ask);
        break;
      case '3':
        await this.checkStock(ask);
        break;
      case '4':
        await this.registerCustomer(ask);
        break;
      case '5':
        await this.viewTodaySales(ask);
        break;
      case '6':
        return;
      default:
        console.log('Invalid choice!');
    }

    await ask('Press Enter to continue...');
    await this.show(ask);
  }

  static async processSale(ask) {
    console.log('\n--- PROCESS SALE ---');
    const productName = await ask('Enter product name: ');
    const quantity = parseInt(await ask('Enter quantity: '));

    const result = SalesController.processSale(productName, quantity);
    console.log(result.message);
    
    if (result.success) {
      console.log('\n--- RECEIPT ---');
      console.log(`Product: ${result.receipt.product}`);
      console.log(`Quantity: ${result.receipt.quantity}`);
      console.log(`Price: $${result.receipt.price}`);
      console.log(`Total: $${result.total}`);
      console.log(`Date: ${result.receipt.date}`);
      console.log('---------------');
      console.log('Thank you for your purchase!');
    }
  }

  static async searchProduct(ask) {
    console.log('\n--- SEARCH PRODUCT ---');
    const searchTerm = await ask('Enter product name: ');
    const product = InventoryController.searchProduct(searchTerm);

    if (product) {
      console.log(`\nProduct Found:`);
      console.log(`Name: ${product.name}`);
      console.log(`Price: $${product.price}`);
      console.log(`Stock Available: ${product.stock}`);
    } else {
      console.log('Product not found!');
    }
  }

  static async checkStock(ask) {
    console.log('\n--- CURRENT STOCK ---');
    const products = InventoryController.getAllProducts();
    
    products.forEach(product => {
      const status = product.stock < 5 ? '⚠️ LOW' : '✓ OK';
      console.log(`${product.name}: ${product.stock} units ${status}`);
    });
  }

  static async registerCustomer(ask) {
    console.log('\n--- REGISTER CUSTOMER ---');
    const name = await ask('Customer name: ');
    const email = await ask('Customer email: ');
    const phone = await ask('Customer phone: ');

    const result = CustomerController.addCustomer(name, email, phone);
    console.log(result.message);
    console.log(`Customer ID: ${result.customer.id}`);
  }

  static async viewTodaySales(ask) {
    console.log('\n--- TODAY\'S SALES ---');
    const sales = SalesController.getDailySales();
    
    if (sales.length === 0) {
      console.log('No sales today yet.');
    } else {
      let total = 0;
      sales.forEach((sale, index) => {
        console.log(`${index + 1}. ${sale.product} x${sale.quantity} = $${sale.total}`);
        total += sale.total;
      });
      console.log(`\nTotal Today: $${total.toFixed(2)}`);
    }
  }
}

module.exports = ShopAttendantView;