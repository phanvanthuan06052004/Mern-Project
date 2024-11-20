import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlide"
export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
}) 