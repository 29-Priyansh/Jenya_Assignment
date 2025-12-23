import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Array of cart items with product data and quantity
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);
            
            if (existingItem) {
                // If product already exists, increase quantity
                existingItem.quantity += 1;
            } else {
                // If product doesn't exist, add it with quantity 1
                state.items.push({
                    ...product,
                    quantity: 1
                });
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.id !== productId);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                if (quantity <= 0) {
                    // Remove item if quantity is 0 or less
                    state.items = state.items.filter(item => item.id !== id);
                } else {
                    item.quantity = quantity;
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};
export const selectCartTotal = (state) => {
    return state.cart.items.reduce((total, item) => {
        const price = item.discountPercentage 
            ? item.price - (item.price * item.discountPercentage / 100)
            : item.price;
        return total + (price * item.quantity);
    }, 0);
};

export default cartSlice.reducer;

