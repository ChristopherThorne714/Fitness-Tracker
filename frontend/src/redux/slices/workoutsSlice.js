import { createSlice } from '@reduxjs/toolkit'

export const workoutsSlice = createSlice({
    name: 'workouts',
    initialState: {
        value: null
    },
    reducers: {
        setWorkouts: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { setWorkouts } = workoutsSlice.actions;

export default workoutsSlice.reducer;