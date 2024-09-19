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
        createWorkout: (state, action) => {
            state.value = [action.payload, ...state.value]
        },
        deleteWorkout: (state, action) => {
            state.value = state.value.filter((w) => w._id !== action.payload._id)
        },
        // add a function to clear all workouts later
    },
});

export const { setWorkouts, createWorkout, deleteWorkout } = workoutsSlice.actions;

export default workoutsSlice.reducer;