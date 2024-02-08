import { createSlice } from '@reduxjs/toolkit'
const currentDate = new Date();
const cd = currentDate.toISOString().slice('T')[0];

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        value: cd
    },
    reducers: {
        setDate: (state, action) => {
            state.value = action.payload
        },
    },
});
console.log(dateSlice.getInitialState())

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;