import mongoose from 'mongoose';
const { Schema } = mongoose;


const orderSchema = new Schema({
   name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        addressDetail: {
            type: String,
            required: true,
        },
        ward: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        }
    },
    phone: {
        type: String,
        required: true,
    },
    product: [  
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', //reference to book model
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, //auto create createdAt and updatedAt fields
});

const Order = mongoose.model('Order', orderSchema);
export default Order;