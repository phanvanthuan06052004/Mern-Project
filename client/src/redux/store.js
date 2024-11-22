import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlide"
import booksAPI from './features/cart/booksAPI'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [booksAPI.reducerPath]: booksAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksAPI.middleware)
}) 