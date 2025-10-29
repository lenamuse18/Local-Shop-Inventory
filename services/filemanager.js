const fs = require('fs');
const path = require('path');

class FileManager {
  static dataDir = path.join(__dirname, '../data');


  static ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  
  static readFile(filename, defaultData = []) {
    this.ensureDataDir();
    const filePath = path.join(this.dataDir, filename);
    
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
      }
      return defaultData;
    } catch (error) {
      console.error(`Error reading ${filename}:`, error.message);
      return defaultData;
    }
  }

 
  static writeFile(filename, data) {
    this.ensureDataDir();
    const filePath = path.join(this.dataDir, filename);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error(`Error writing ${filename}:`, error.message);
      return false;
    }
  }

  // Specific read/write methods for each data type
  static readProducts() {
    return this.readFile('products.json', [
      { id: 1, name: 'Laptop', price: 999.99, stock: 10 },
      { id: 2, name: 'Mouse', price: 29.99, stock: 50 },
      { id: 3, name: 'Keyboard', price: 79.99, stock: 3 }
    ]);
  }

  static writeProducts(products) {
    return this.writeFile('products.json', products);
  }

  static readSales() {
    return this.readFile('sales.json', []);
  }

  static writeSales(sales) {
    return this.writeFile('sales.json', sales);
  }

  static readPurchaseOrders() {
    return this.readFile('purchase_orders.json', [
      { id: 1, product: 'Monitor', quantity: 20, status: 'Pending', date: new Date().toISOString() }
    ]);
  }

  static writePurchaseOrders(orders) {
    return this.writeFile('purchase_orders.json', orders);
  }

  static readCustomers() {
    return this.readFile('customers.json', []);
  }

  static writeCustomers(customers) {
    return this.writeFile('customers.json', customers);
  }

  static readProductRequests() {
    return this.readFile('product_requests.json', []);
  }

  static writeProductRequests(requests) {
    return this.writeFile('product_requests.json', requests);
  }
}

module.exports = FileManager;