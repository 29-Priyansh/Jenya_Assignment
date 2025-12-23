import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import categoryReducer from './slices/categorySlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        category: categoryReducer,
        auth: authReducer,
    },
});
