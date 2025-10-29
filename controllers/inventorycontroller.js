const filemanager = require('../services/filemanager')

class InventoryController{
    static getAllProducts(){
        return filemanager.readProducts();
    }

    static addProduct(name,price,stock){
        const products = filemanager.readProducts();
        
        const newProduct = {
            id: products.length + 1,
            name: name,
            price: price,
            stock: stock,
            creationDate: new Date().toISOString 
        }
        products.push(newProduct);
        filemanager.writeProducts(products);

    return{success: true, message: 'Product added successfully!'}
}

  static searchProduct(name){
      const products = filemanager.readProducts();
     return products.find(p =>
      p.name.toLowerCase().includes(name.toLowerCase())
     )
}

static updateStock(name,quantity){
    const products = filemanager.readProducts();
    
    const product = products.find(p =>
        p.name.toLowerCase() === name.toLowerCase()
    );

    if (!product) {
       return{success: false, message:`${name} not found`} 
    }
    if (product.stock < quantity){
        return{success: false, message: `Insufficient quantity of ${name}`}
    }
    product.stock -= quantity
    filemanager.writeProducts(products);

     return  { success: true, message: 'Stock updated successfully', product

     }
}

static getLowStock(threshold = 5){
        const products = filemanager.readProducts();

        return products.filter(p => p.stock < threshold);
     }
    

}

module.exports = InventoryController;