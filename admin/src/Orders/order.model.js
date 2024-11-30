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
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "CHỜ XỬ LÝ",
    }
}, {
    timestamps: true, //auto create createdAt and updatedAt fields
});

const Order = mongoose.model('Order', orderSchema);
export default Order;