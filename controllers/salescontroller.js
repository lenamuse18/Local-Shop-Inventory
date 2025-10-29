const filemanager = require(`../services/filemanager`)
const inventorycontroller = require(`./inventorycontroller`)

class SalesController{
    static processSale(product_name, quantity){
        
    const stockUpdate = inventorycontroller.updateStock(product_name,quantity)
    if (!stockUpdate.success) {
        return stockUpdate
    }
    const sales = filemanager.readSales();

      const newSale = {
        id: sales.length + 1,
        product: product_name,
        quantity: quantity,
        price:stockUpdate.product.price,
        total: stockUpdate.product.price * quantity,
        date: new Date().toISOString()

      }
      sales.push(newSale);
      filemanager.writeSales(sales);

      return{ success: true, 
        message:'Sale processed succesfully', 
        total: newSale.total,
        receipt: newSale,
      };
    }

    static getSalesReport(){
        const sales = filemanager.readSales();
        const totalrevenue = sales.reduce((sum, sale)=> sum + sale.total, 0);
    
    const totalTransactions = sales.length;

    return{
        totalSales: totalrevenue.toFixed(2),
        totalTransactions: sales.length,
        sales:sales
    }
    }

    static getDailySales(){
        const sales = filemanager.readSales()
        const today = new Date().toISOString().split('T')[0];

    const todaySales = sales.filter(sale => sale.date.startsWith(today));
    return todaySales;
    }

    static getSalesByProduct(productName){
        const sales = filemanager.readSales()

        const filteredSales = sales.filter(
            sale => sale.product.toLowerCase() === productName.toLowerCase()
        );

        return filteredSales;
    }
}

module.exports = SalesController;
