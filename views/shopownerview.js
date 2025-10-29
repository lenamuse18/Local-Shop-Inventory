// views/ShopOwnerView.js
const InventoryController = require('../controllers/inventorycontroller');
const SalesController = require('../controllers/salescontroller');
const SupplierController = require('../controllers/suppliercontrollers');
const CustomerController = require('../controllers/customercontroller');

class ShopOwnerView {
  static async show(ask) {
    console.clear();
    console.log('=================================');
    console.log('   SHOP OWNER DASHBOARD');
    console.log('=================================');
    console.log('1. View All Products');
    console.log('2. Add New Product');
    console.log('3. View Sales Report');
    console.log('4. Check Low Stock');
    console.log('5. View Purchase Orders');
    console.log('6. Create Purchase Order');
    console.log('7. View All Customers');
    console.log('8. View Product Requests');
    console.log('9. Back to Main Menu');
    console.log('=================================');

    const choice = await ask('Enter your choice (1-9): ');

    switch (choice) {
      case '1':
        await this.viewProducts(ask);
        break;
      case '2':
        await this.addProduct(ask);
        break;
      case '3':
        await this.viewSalesReport(ask);
        break;
      case '4':
        await this.checkLowStock(ask);
        break;
      case '5':
        await this.viewPurchaseOrders(ask);
        break;
      case '6':
        await this.createPurchaseOrder(ask);
        break;
      case '7':
        await this.viewCustomers(ask);
        break;
      case '8':
        await this.viewProductRequests(ask);
        break;
      case '9':
        return; // Go back to main menu
      default:
        console.log('Invalid choice!');
    }

    await ask('Press Enter to continue...');
    await this.show(ask); // Show menu again
  }

  static async viewProducts(ask) {
    console.log('\n--- ALL PRODUCTS ---');
    const products = InventoryController.getAllProducts();
    
    if (products.length === 0) {
      console.log('No products in inventory.');
    } else {
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - ${product.price} (Stock: ${product.stock})`);
      });
    }
  }

  static async addProduct(ask) {
    console.log('\n--- ADD NEW PRODUCT ---');
    const name = await ask('Product name: ');
    const price = parseFloat(await ask('Product price: '));
    const stock = parseInt(await ask('Initial stock: '));

    const result = InventoryController.addProduct(name, price, stock);
    console.log(result.message);
  }

  static async viewSalesReport(ask) {
    console.log('\n--- SALES REPORT ---');
    const report = SalesController.getSalesReport();
    console.log(`Total Sales: $${report.totalSales}`);
    console.log(`Total Transactions: ${report.totalTransactions}`);
    console.log('\nRecent Sales:');
    report.sales.slice(-5).forEach((sale, index) => {
      console.log(`  ${index + 1}. ${sale.product} x${sale.quantity} = $${sale.total}`);
    });
  }

  static async checkLowStock(ask) {
    console.log('\n--- LOW STOCK ALERT ---');
    const lowStockProducts = InventoryController.getLowStock(5);
    
    if (lowStockProducts.length === 0) {
      console.log('All products have sufficient stock.');
    } else {
      lowStockProducts.forEach(product => {
        console.log(` ${product.name} - Only ${product.stock} left!`);
      });
    }
  }

static async viewPurchaseOrders(ask) {
    console.log('\n--- PURCHASE ORDERS ---');
    const orders = SupplierController.getPurchaseOrders();
    
  
    console.log('Type of orders:', typeof orders);
    console.log('Is array?', Array.isArray(orders));
    console.log('Orders:', orders);
    
    if (orders.length === 0) {
      console.log('No purchase orders yet.');
    } else {
      orders.forEach((order, index) => {
        console.log(`${index + 1}. ${order.product} - Qty: ${order.quantity} - Status: ${order.status}`);
      });
    }
}

  static async createPurchaseOrder(ask) {
    console.log('\n--- CREATE PURCHASE ORDER ---');
    const product = await ask('Product name: ');
    const quantity = parseInt(await ask('Quantity: '));

    const result = SupplierController.createPurchaseOrder(product, quantity);
    console.log(result.message);
  }

  static async viewCustomers(ask) {
    console.log('\n--- ALL CUSTOMERS ---');
    const customers = CustomerController.getAllCustomers();
    
    if (customers.length === 0) {
      console.log('No customers registered yet.');
    } else {
      customers.forEach((customer, index) => {
        console.log(`${index + 1}. ${customer.name} - ${customer.email} - ${customer.phone}`);
      });
    }
  }

  static async viewProductRequests(ask) {
    console.log('\n--- PRODUCT REQUESTS ---');
    const requests = CustomerController.getAllProductRequests();
    
    if (requests.length === 0) {
      console.log('No product requests yet.');
    } else {
      requests.forEach((request, index) => {
        console.log(`${index + 1}. ${request.productName} - ${request.reason} [${request.status}]`);
      });
    }
  }
}

module.exports = ShopOwnerView;