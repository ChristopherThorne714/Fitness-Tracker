import { createSlice } from '@reduxjs/toolkit'

var currentDate = new Date();
var startDate = null;

export const dateRangeSlice = createSlice({
    name: 'dateRange',
    initialState: {
        value: [startDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], currentDate.toISOString().split('T')[0]]
    },
    reducers: {
        setDateRange: (state, action) => {
            state.value = action.payload
        },
    },
});


export const { setDateRange } = dateRangeSlice.actions;

export default dateRangeSlice.reducer;