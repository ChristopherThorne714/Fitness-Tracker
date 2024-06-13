import { createSlice } from '@reduxjs/toolkit'

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        value: new Date().toISOString().split('T')[0]
    },
    reducers: {
        setDate: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;