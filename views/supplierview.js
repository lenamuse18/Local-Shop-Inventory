//  const readline = require(`readline`);

//  class User_input{
//   constructor(){
//     this.rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout
//     });
//  }
 
//  userquestion(question){
//   return new Promise ((resolve) => {
//     this.rl.question(question + "", (answer) => {
//       resolve(answer.trim());
      
//     })
//   })
//  }

// }
 

 
//  class Delivery_personnel_data{
//     constructor(delivery_agent_name, company_name){
//              this.delivery_agent_name = delivery_agent_name;
//              this.company_name = company_name;
//     }
//     output(delivery_agent_name,company_name){
//         console.log(`The delivery man is ${delivery_agent_name} from ${company_name}`);
//     }
//  } 

// (async()=>{

//   const userinput = new User_input();
 

// const delivery_personnel_name = await  userinput.userquestion("What is your full name?")

// const delivery_personnel_company = await userinput.userquestion("Which company do you represent?");

// const display_information = new Delivery_personnel_data();
//           display_information.output(delivery_personnel_name,delivery_personnel_company);
// })();
// views/SupplierView.js


const SupplierController = require('../controllers/suppliercontrollers');

class SupplierView {
  static async show(ask) {
    console.clear();
    console.log('=================================');
    console.log('     SUPPLIER PORTAL');
    console.log('=================================');
    console.log('1. View Purchase Orders');
    console.log('2. View Pending Orders');
    console.log('3. Update Order Status');
    console.log('4. View Supplied Products');
    console.log('5. Back to Main Menu');
    console.log('=================================');

    const choice = await ask('Enter your choice (1-5): ');

    switch (choice) {
      case '1':
        await this.viewOrders(ask);
        break;
      case '2':
        await this.viewPendingOrders(ask);
        break;
      case '3':
        await this.updateOrderStatus(ask);
        break;
      case '4':
        await this.viewSuppliedProducts(ask);
        break;
      case '5':
        return;
      default:
        console.log('Invalid choice!');
    }

    await ask('Press Enter to continue...');
    await this.show(ask);
  }

  static async viewOrders(ask) {
    console.log('\n--- PURCHASE ORDERS ---');
    const orders = SupplierController.getPurchaseOrders();

    if (orders.length === 0) {
      console.log('No purchase orders available.');
    } else {
      orders.forEach((order, index) => {
        console.log(`\nOrder #${order.id}`);
        console.log(`  Product: ${order.product}`);
        console.log(`  Quantity: ${order.quantity}`);
        console.log(`  Status: ${order.status}`);
        console.log(`  Date: ${order.date}`);
      });
    }
  }

  static async viewPendingOrders(ask) {
    console.log('\n--- PENDING ORDERS ---');
    const orders = SupplierController.getPendingOrders();

    if (orders.length === 0) {
      console.log('No pending orders.');
    } else {
      orders.forEach((order) => {
        console.log(`Order #${order.id}: ${order.product} - Qty: ${order.quantity}`);
      });
    }
  }

  static async updateOrderStatus(ask) {
    console.log('\n--- UPDATE ORDER STATUS ---');
    const orderId = parseInt(await ask('Enter order ID: '));
    
    console.log('\nSelect new status:');
    console.log('1. Pending');
    console.log('2. Shipped');
    console.log('3. Delivered');
    const statusChoice = await ask('Enter choice (1-3): ');

    const statusMap = { 
      '1': 'Pending', 
      '2': 'Shipped', 
      '3': 'Delivered' 
    };
    
    const newStatus = statusMap[statusChoice];
    
    if (newStatus) {
      const result = SupplierController.updateOrderStatus(orderId, newStatus);
      console.log(result.message);
    } else {
      console.log('Invalid status choice!');
    }
  }

  static async viewSuppliedProducts(ask) {
    console.log('\n--- SUPPLIED PRODUCTS ---');
    const products = SupplierController.getSuppliedProducts();

    if (products.length === 0) {
      console.log('No products supplied yet.');
    } else {
      products.forEach((product, index) => {
        console.log(`${index + 1}. ${product.name} - ${product.price} (Stock: ${product.stock})`);
      });
    }
  }
}

module.exports = SupplierView;

