import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../thunks/categoryThunk';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        selectedCategory: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { 
    setSelectedCategory, 
    clearSelectedCategory 
} = categorySlice.actions;

// Selectors
export const selectCategories = (state) => state.category.categories;
export const selectSelectedCategory = (state) => state.category.selectedCategory;
export const selectCategoriesLoading = (state) => state.category.loading;
export const selectCategoriesError = (state) => state.category.error;

export default categorySlice.reducer;

