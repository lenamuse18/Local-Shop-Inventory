// views/CustomerView.js
const InventoryController = require('../controllers/inventorycontroller');
const CustomerController = require('../controllers/customercontroller');

class CustomerView {
  static async show(ask) {
    console.clear();
    console.log('=================================');
    console.log('     CUSTOMER PORTAL');
    console.log('=================================');
    console.log('1. Browse Products');
    console.log('2. View Purchase History');
    console.log('3. Request Product');
    console.log('4. Back to Main Menu');
    console.log('=================================');

    const choice = await ask('Enter your choice (1-4): ');

    switch (choice) {
      case '1':
        await this.browseProducts(ask);
        break;
      case '2':
        await this.viewHistory(ask);
        break;
      case '3':
        await this.requestProduct(ask);
        break;
      case '4':
        return;
      default:
        console.log('Invalid choice!');
    }

    await ask('Press Enter to continue...');
    await this.show(ask);
  }

  static async browseProducts(ask) {
    console.log('\n--- AVAILABLE PRODUCTS ---');
    const products = CustomerController.browseProducts();

    if (products.length === 0) {
      console.log('No products available at the moment.');
    } else {
      products.forEach((product, index) => {
        const availability = product.stock > 0 ? 'In Stock' : ' Out of Stock';
        console.log(`${index + 1}. ${product.name} - ${product.price} [${availability}]`);
      });
    }
  }

  static async viewHistory(ask) {
    console.log('\n--- YOUR PURCHASE HISTORY ---');
    const customerId = await ask('Enter your customer ID: ');
    const history = CustomerController.getPurchaseHistory(parseInt(customerId));

    if (history.length === 0) {
      console.log('No purchase history found.');
    } else {
      history.forEach((purchase, index) => {
        console.log(`\n${index + 1}. ${purchase.product}`);
        console.log(`   Quantity: ${purchase.quantity}`);
        console.log(`   Total: $${purchase.total}`);
        console.log(`   Date: ${purchase.date}`);
      });
    }
  }

  static async requestProduct(ask) {
    console.log('\n--- REQUEST PRODUCT ---');
    const productName = await ask('Product name you would like us to stock: ');
    const reason = await ask('Why do you need this product? (optional): ');

    const result = CustomerController.submitProductRequest(productName, reason);
    console.log(result.message);
  }
}

module.exports = CustomerView;