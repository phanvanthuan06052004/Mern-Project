import Order from './order.model.js';

const createOrder = async (req, res) => {
    try {
        const newOrder = await Order(req.body); 
        const order = await newOrder.save();
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'failed to save order', error: error });
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const orders = await Order.find({email})
            .populate({
                path: 'products.productId',  // Thêm populate cho products.productId
                model: 'Book',
                select: 'title coverImage price' // Chọn các trường cần lấy
            })
            .sort({ createdAt: -1 }); // Sắp xếp theo thời gian mới nhất
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllOrders = async (req, res) => {
    
    try {
        const orders = await Order.find({})
            .populate({
                path: 'products.productId',  // Thêm populate cho products.productId
                model: 'Book',
                select: 'title coverImage price' // Chọn các trường cần lấy
            })
            .sort({ createdAt: -1 }); // Sắp xếp theo thời gian mới nhất
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndDelete(id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export {createOrder, getOrderByEmail, getAllOrders, deleteOrder, getOrderById, updateOrder}