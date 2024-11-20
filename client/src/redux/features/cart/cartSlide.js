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
            if (!checkItemsExiting) {
                state.cartItem.push(action.payload); //if no existing items then add to cart
                //inform success after add done
                toast.success('Add to cart success!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } else {
                //false add to cart
                toast.warn('Products is existing!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        },
        removeItems: (state, action) => {
            state.cartItem = state.cartItem.filter(item => item._id !== action.payload._id) //remove one item from cart
        },
        clearCart: (state) => {
            state.cartItem = []
        }
    }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;