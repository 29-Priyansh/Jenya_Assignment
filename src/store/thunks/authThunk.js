import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return {
                    user: data,
                    token: data.token
                };
            } else {
                const errorMessage = data.message || 'Login failed';
                return rejectWithValue(errorMessage);
            }
        } catch (error) {
            const errorMessage = error.message || 'An error occurred during login';
            return rejectWithValue(errorMessage);
        }
    }
);

