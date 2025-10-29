const SupplierController = require('./controllers/suppliercontrollers');
const filemanager = require('./services/filemanager');

// Mock the filemanager module
jest.mock('./services/filemanager');

describe('SupplierController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getPurchaseOrders', () => {
        it('should return all purchase orders successfully', async () => {
            const mockOrders = [
                { id: 1, product: 'Product A', quantity: 10, status: 'Pending', date: '2024-01-01' },
                { id: 2, product: 'Product B', quantity: 20, status: 'Completed', date: '2024-01-02' }
            ];
            filemanager.readPurchaseOrders.mockResolvedValue(mockOrders);

            const result = await SupplierController.getPurchaseOrders();

            expect(result).toEqual(mockOrders);
            expect(filemanager.readPurchaseOrders).toHaveBeenCalledTimes(1);
        });

        it('should return error message when reading fails', async () => {
            const error = new Error('File read error');
            filemanager.readPurchaseOrders.mockRejectedValue(error);

            const result = await SupplierController.getPurchaseOrders();

            expect(result).toEqual({
                success: false,
                message: 'Error reading purchase orders: File read error'
            });
        });
    });

    describe('createPurchaseOrder', () => {
        it('should create a new purchase order successfully', async () => {
            const mockOrders = [
                { id: 1, product: 'Product A', quantity: 10, status: 'Pending', date: '2024-01-01' }
            ];
            filemanager.readPurchaseOrders.mockResolvedValue(mockOrders);
            filemanager.writePurchaseOrders.mockResolvedValue();

            const result = await SupplierController.createPurchaseOrder('Product B', 15);

            expect(result.success).toBe(true);
            expect(result.message).toBe('order added successfully');
            expect(result.order).toMatchObject({
                id: 2,
                product: 'Product B',
                quantity: 15,
                status: 'Pending'
            });
            expect(result.order.date).toBeDefined();
            expect(filemanager.writePurchaseOrders).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({ id: 2, product: 'Product B' })
                ])
            );
        });

        it('should handle empty orders array', async () => {
            filemanager.readPurchaseOrders.mockResolvedValue([]);
            filemanager.writePurchaseOrders.mockResolvedValue();

            const result = await SupplierController.createPurchaseOrder('First Product', 5);

            expect(result.success).toBe(true);
            expect(result.order.id).toBe(1);
        });

        it('should return error message when creation fails', async () => {
            const error = new Error('Write error');
            filemanager.readPurchaseOrders.mockRejectedValue(error);

            const result = await SupplierController.createPurchaseOrder('Product C', 10);

            expect(result).toEqual({
                success: false,
                message: 'Error creating purchase order: Write error'
            });
        });
    });

    describe('updateOrderStatus', () => {
        it('should update order status successfully', async () => {
            const mockOrders = [
                { id: 1, product: 'Product A', quantity: 10, status: 'Pending', date: '2024-01-01' },
                { id: 2, product: 'Product B', quantity: 20, status: 'Pending', date: '2024-01-02' }
            ];
            filemanager.readPurchaseOrders.mockResolvedValue(mockOrders);
            filemanager.writePurchaseOrders.mockResolvedValue();

            const result = await SupplierController.updateOrderStatus(1, 'Completed');

            expect(result.success).toBe(true);
            expect(result.message).toBe('Order 1 status updated to Completed');
            expect(result.order.status).toBe('Completed');
            expect(result.order.updatedAt).toBeDefined();
            expect(filemanager.writePurchaseOrders).toHaveBeenCalled();
        });

        it('should return error when order not found', async () => {
            const mockOrders = [
                { id: 1, product: 'Product A', quantity: 10, status: 'Pending', date: '2024-01-01' }
            ];
            filemanager.readPurchaseOrders.mockResolvedValue(mockOrders);

            const result = await SupplierController.updateOrderStatus(999, 'Completed');

            expect(result).toEqual({
                success: false,
                message: 'Order not found'
            });
            expect(filemanager.writePurchaseOrders).not.toHaveBeenCalled();
        });

        it('should return error message when update fails', async () => {
            const error = new Error('Update error');
            filemanager.readPurchaseOrders.mockRejectedValue(error);

            const result = await SupplierController.updateOrderStatus(1, 'Completed');

            expect(result).toEqual({
                success: false,
                message: 'Error updating order status: Update error'
            });
        });
    });

    describe('getPendingOrders', () => {
        it('should return only pending orders', async () => {
            const mockOrders = [
                { id: 1, product: 'Product A', quantity: 10, status: 'Pending', date: '2024-01-01' },
                { id: 2, product: 'Product B', quantity: 20, status: 'Completed', date: '2024-01-02' },
                { id: 3, product: 'Product C', quantity: 15, status: 'Pending', date: '2024-01-03' }
            ];
            filemanager.readPurchaseOrders.mockResolvedValue(mockOrders);

            const result = await SupplierController.getPendingOrders();

            expect(result).toHaveLength(2);
            expect(result).toEqual([
                { id: 1, product: 'Product A', quantity: 10, status: 'Pending', date: '2024-01-01' },
                { id: 3, product: 'Product C', quantity: 15, status: 'Pending', date: '2024-01-03' }
            ]);
        });

        it('should return empty array when no pending orders', async () => {
            const mockOrders = [
                { id: 1, product: 'Product A', quantity: 10, status: 'Completed', date: '2024-01-01' }
            ];
            filemanager.readPurchaseOrders.mockResolvedValue(mockOrders);

            const result = await SupplierController.getPendingOrders();

            expect(result).toEqual([]);
        });

        it('should return error message when fetch fails', async () => {
            const error = new Error('Fetch error');
            filemanager.readPurchaseOrders.mockRejectedValue(error);

            const result = await SupplierController.getPendingOrders();

            expect(result).toEqual({
                success: false,
                message: 'Error fetch pending orders: Fetch error'
            });
        });
    });

    describe('getSuppliedProducts', () => {
        it('should return inventory successfully', async () => {
            const mockInventory = [
                { id: 1, name: 'Product A', stock: 100 },
                { id: 2, name: 'Product B', stock: 50 }
            ];
            filemanager.readInventory.mockResolvedValue(mockInventory);

            const result = await SupplierController.getSuppliedProducts();

            expect(result).toEqual(mockInventory);
            expect(filemanager.readInventory).toHaveBeenCalledTimes(1);
        });

        it('should return error message when fetch fails', async () => {
            const error = new Error('Inventory read error');
            filemanager.readInventory.mockRejectedValue(error);

            const result = await SupplierController.getSuppliedProducts();

            expect(result).toEqual({
                success: false,
                message: 'Error fetching supplied products: Inventory read error'
            });
        });
    });
});