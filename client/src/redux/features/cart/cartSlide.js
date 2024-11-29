import { createSlice } from '@reduxjs/toolkit'
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    cartItem: [] //intital cart empty array 
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const checkItemsExiting = state.cartItem.find(item => item._id === action.payload._id);
            if (checkItemsExiting) {
                checkItemsExiting.quantity += 1; // tăng số lượng sản phẩm nếu đã tồn tại
            } else {
                const newItem = { ...action.payload, quantity: 1 }; // thêm sản phẩm mới vào giỏ hàng
                state.cartItem.push(newItem);
            }
            toast.success('Product added to cart!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        },
        removeItems: (state, action) => {
            state.cartItem = state.cartItem.filter(item => item._id !== action.payload._id) //remove one item from cart
        },
        clearCart: (state) => {
            state.cartItem = []
        },
        increaseQuantity: (state, action) => {
            const itemIndex = state.cartItem.findIndex(
                item => item._id === action.payload._id
            );
            if (itemIndex >= 0) {
                state.cartItem[itemIndex].quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.cartItem.findIndex(
                item => item._id === action.payload._id
            );
            if (itemIndex >= 0 && state.cartItem[itemIndex].quantity > 1) {
                state.cartItem[itemIndex].quantity -= 1;
            }
        }
    }
})

export const { addToCart } = cartSlice.actions;
export const { removeItems } = cartSlice.actions;
export const { clearCart } = cartSlice.actions;
export const { increaseQuantity } = cartSlice.actions;
export const { decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;