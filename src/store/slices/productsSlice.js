import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../thunks/productsThunk';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 1,
        total: 0,
        itemsPerPage: 12,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        resetPage: (state) => {
            state.currentPage = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const { products, total, totalPages } = action.payload;
                state.items = products || [];
                state.total = total || 0;
                state.totalPages = totalPages || 1;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.items = [];
            });
    }
});

export const { setCurrentPage, resetPage } = productsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectProductsTotal = (state) => state.products.total;
export const selectItemsPerPage = (state) => state.products.itemsPerPage;

export default productsSlice.reducer;

