import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://dummyjson.com/products/category-list');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return rejectWithValue(error.message);
        }
    }
);

