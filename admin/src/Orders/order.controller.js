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
        const orders = await Order.find({email: req.params.email}).sort({createdAt: -1}); //sort by createdAt descending
        if(!orders){
            return res.status(404).json({message: "Không tìm thấy đơn hàng!"});
        }
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
    }
}
export {createOrder, getOrderByEmail}