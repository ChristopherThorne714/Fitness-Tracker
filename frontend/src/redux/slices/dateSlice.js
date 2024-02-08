import { createSlice } from '@reduxjs/toolkit'
const currentDate = new Date();

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        value: currentDate.toISOString().slice('T')[0]
    },
    reducers: {
        setDate: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;