import { createSlice } from '@reduxjs/toolkit'

export const dateRangeSlice = createSlice({
    name: 'dateRange',
    initialState: {
        value: []
    },
    reducers: {
        setDateRange: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setDateRange } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;