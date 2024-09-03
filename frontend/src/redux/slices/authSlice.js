import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: null
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state, action) => {
            state.value = null
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;