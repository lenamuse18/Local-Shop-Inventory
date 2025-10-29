const filemanager = require('../services/filemanager');
const InventoryController = require('./inventorycontroller');

class CustomerController{

  static  getPurchaseHistory(){
    const sales =  filemanager.readSales();

    return sales.slice(-5)
    }

    static  submitProductRequest(productName, reason = ''){
        const requests =  filemanager.readProductRequests();

        const newRequest = {
            id: requests.length + 1,
            productName: productName,
            reason: reason || 'no reason provided',
            status:'Pending',
            date: new Date().toISOString(),
        }
        requests.push(newRequest);
        filemanager.writeProductRequests(requests);

        return{
            success: true,
            message:'Thank you! Your product has been submitted successfully.'
        }
    }

    static  addCustomer (name,email,phoneNumber){
        const customers =  filemanager.readCustomers();

        const newCustomer = {
            id: customers.length + 1,
            name: name,
            email: email,
            phone: phoneNumber,
            registeredAt: new Date().toISOString,           
        }
        customers.push(newCustomer);
        filemanager.writeCustomers(customers);

        return{
            success: true,
             message: 'Customer registered successfully',
             customer: newCustomer
        };
    }

    static getAllCustomers(){
        return filemanager.readCustomers();
    }

      static  getCustomerById(customerId){
        const customers =  filemanager.readCustomers();
        return customers.find(c => c.id === customerId);
      }

        static  getAllProductRequests(){
            return filemanager.readProductRequests();
        }

    static browseProducts(){
        return InventoryController.getAllProducts();
    }        
      
}

module.exports = CustomerController;