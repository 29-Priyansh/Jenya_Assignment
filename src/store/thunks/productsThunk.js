import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ category = null, page = 1, itemsPerPage = 12 }, { rejectWithValue }) => {
        try {
            let url;
            if (category) {
                url = `https://dummyjson.com/products/category/${category}?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`;
            } else {
                url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`;
            }
            
            const response = await fetch(url);
            const data = await response.json();
            
            const totalPages = Math.ceil((data.total || 0) / itemsPerPage);
            
            return {
                products: data.products || [],
                total: data.total || 0,
                totalPages: totalPages
            };
        } catch (error) {
            console.error("Error fetching products:", error);
            return rejectWithValue(error.message);
        }
    }
);

