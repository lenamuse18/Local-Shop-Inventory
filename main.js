// index.js - Main Entry Point
const readline = require('readline');
const ShopOwnerView = require('./views/shopownerview');
const ShopAttendantView = require('./views/shopattendantview');
const SupplierView = require('./views/supplierview');
const CustomerView = require('./views/customerview');

// Create readline interface for console input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Main menu
async function showMainMenu() {
  console.clear();
  console.log('=================================');
  console.log('   SHOP INVENTORY SYSTEM');
  console.log('=================================');
  console.log('1. Shop Owner');
  console.log('2. Shop Attendant');
  console.log('3. Supplier');
  console.log('4. Customer');
  console.log('5. Exit');
  console.log('=================================');

  const choice = await ask('Select your role (1-5): ');

  switch (choice) {
    case '1':
      await ShopOwnerView.show(ask);
      break;
    case '2':
      await ShopAttendantView.show(ask);
      break;
    case '3':
      await SupplierView.show(ask);
      break;
    case '4':
      await CustomerView.show(ask);
      break;
    case '5':
      console.log('\n=================================');
      console.log('Thank you for using our system!');
      console.log('=================================\n');
      rl.close();
      return;
    default:
      console.log('Invalid choice! Please select 1-5.');
      await ask('Press Enter to continue...');
  }

  // Return to main menu after user logs out
  await showMainMenu();
}

// Welcome message
console.log('\n=================================');
console.log('   WELCOME TO');
console.log('   LOCAL SHOP INVENTORY SYSTEM');
console.log('=================================\n');

// Start the application
showMainMenu()