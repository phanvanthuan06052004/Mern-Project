import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./features/cart/cartSlide"
import booksAPI from './features/Book/booksAPI'
import ordersAPI from './features/Oder/ordersAPI'
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [booksAPI.reducerPath]: booksAPI.reducer,
        [ordersAPI.reducerPath]: ordersAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksAPI.middleware, ordersAPI.middleware)
}) 