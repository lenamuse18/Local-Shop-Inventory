// controllers/SupplierController.js
const FileManager = require('../services/filemanager');
const InventoryController = require('./inventorycontroller');

class SupplierController {
  
  static getPurchaseOrders() {
    return FileManager.readPurchaseOrders();
  }

  static createPurchaseOrder(productName, quantity) {
    const orders = FileManager.readPurchaseOrders();
    
    const newOrder = {
      id: orders.length + 1,
      product: productName,
      quantity: quantity,
      status: 'Pending',
      date: new Date().toISOString()
    };

    orders.push(newOrder);
    FileManager.writePurchaseOrders(orders);

    return { 
      success: true, 
      message: 'Purchase order created successfully!', 
      order: newOrder 
    };
  }

  static updateOrderStatus(orderId, newStatus) {
    const orders = FileManager.readPurchaseOrders();
    const order = orders.find(o => o.id === orderId);

    if (!order) {
      return { success: false, message: 'Order not found!' };
    }

    order.status = newStatus;
    order.updatedAt = new Date().toISOString();
    
    FileManager.writePurchaseOrders(orders);

    return { success: true, message: 'Order status updated successfully!' };
  }

  static getOrderById(orderId) {
    const orders = FileManager.readPurchaseOrders();
    return orders.find(o => o.id === orderId);
  }

  static getPendingOrders() {
    const orders = FileManager.readPurchaseOrders();
    return orders.filter(o => o.status === 'Pending');
  }

  static getSuppliedProducts() {
    return InventoryController.getAllProducts();
  }
}

module.exports = SupplierController;