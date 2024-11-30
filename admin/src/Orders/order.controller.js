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
        const orders = await Order.find({ email })
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
export {createOrder, getOrderByEmail}